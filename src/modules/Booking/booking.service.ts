import httpStatus from "http-status";
import AppError from "../../errors/app.error";
import { User } from "../User/user.model";
import { TBooking, TCarReturn } from "./booking.interface";
import { Booking } from "./booking.model";
import mongoose from "mongoose";
import { Car } from "../Car/car.model";
import { calculateTotalCost, cartStatus } from "./booking.constant";

const bookingCarSaveDataIntoDB = async (payload: TBooking, email: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const carData = await Car.findById(payload?.carId).session(session);

  if (carData?.status === cartStatus.unavailable) {
    throw new AppError(httpStatus.BAD_REQUEST, "This car booked !");
  }

  try {
    const userData = await User.findOne({ email: email }).session(session);

    if (!userData) {
      throw new AppError(httpStatus.BAD_REQUEST, "User not exist !");
    }

    payload.user = userData?._id;

    const updateCarStatus = await Car.findByIdAndUpdate(
      { _id: payload?.carId },
      {
        status: cartStatus.unavailable,
      },
      {
        new: true,
        runValidators: true,
        session,
      }
    );
    if (!updateCarStatus) {
      throw new AppError(httpStatus.BAD_REQUEST, "Car status updated failed!");
    }

    const bookingResult = await Booking.create([payload], { session });

    if (!bookingResult || bookingResult.length === 0) {
      throw new AppError(httpStatus.BAD_REQUEST, "Booking creation failed!");
    }
    const bookingId = bookingResult[0]._id;

    const populatedBooking = await Booking.findById(bookingId)
      .populate({
        path: "user",
        select: "_id name email role",
      })
      .populate({
        path: "carId",
      })
      .session(session);

    await session.commitTransaction();
    await session.endSession();

    return populatedBooking;
  } catch (e) {
    console.log(e);
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Order created failed");
  }
};

const getAllBookingIntoDB = async (query: Record<string, unknown>) => {
  const { carId, date, isBooked } = query;
  const searchCriteria: any = {};

  if (carId) {
    searchCriteria.carId = carId;
  }

  if (date) {
    searchCriteria.date = date;
  }

  if (isBooked) {
    searchCriteria.isBooked = isBooked;
  }

  const result = await Booking.find(searchCriteria)
    .populate("carId")
    .select("-user -date -totalCost -endTime -startTime -__v");
  return result;
};

const getUserBookingIntoDB = async (user: Record<string, unknown>) => {
  const { email } = user;

  if (email) {
    const userData = await User.findOne({ email: email });

    if (!userData) {
      throw new AppError(httpStatus.NOT_FOUND, "You are not registered user !");
    }

    const result = await Booking.find({ user: userData._id })
      .populate({
        path: "user",
        select: "_id name email role",
      })
      .populate({
        path: "carId",
        select: "-__v",
      })
      .select("-__v");

    return result;
  }
};

const carReturnIntoDB = async (payload: TCarReturn) => {
  const { bookingId, endTime } = payload;

  const findBooking = await Booking.findById(bookingId);

  if (findBooking?.totalCost) {
    throw new AppError(httpStatus.NOT_FOUND, "Car Already returned!");
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!findBooking) {
      throw new AppError(httpStatus.NOT_FOUND, "Booking not found!");
    }

    if (findBooking?.totalCost) {
      throw new AppError(httpStatus.NOT_FOUND, "Car Already returned!");
    }

    const findCar = await Car.findById(findBooking.carId).session(session);

    if (!findCar) {
      throw new AppError(httpStatus.NOT_FOUND, "Car not found!");
    }

    const { startTime } = findBooking;
    const { pricePerHour } = findCar;

    //calculate total cost car return time
    const totalCost = calculateTotalCost({
      startTime,
      endTime,
      pricePerHour,
    });

    const returnUpdatedData = {
      endTime,
      totalCost,
    };

    await Car.findByIdAndUpdate(
      findBooking?.carId,
      {
        status: cartStatus.available,
      },
      {
        new: true,
        session,
      }
    );

    const result = await Booking.findByIdAndUpdate(
      bookingId,
      { ...returnUpdatedData },
      {
        new: true,
        session,
      }
    )
      .populate({
        path: "user",
        select: "_id name email role",
      })
      .populate({
        path: "carId",
        select: "-__v",
      })
      .select("-__v");

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "Return car updated failed!");
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (e) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Return car updated failed!");
  }
};

export const bookingService = {
  bookingCarSaveDataIntoDB,
  getAllBookingIntoDB,
  getUserBookingIntoDB,
  carReturnIntoDB,
};
