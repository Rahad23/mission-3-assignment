import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse_ } from "../../utils/sendResponse";
import { bookingService } from "./booking.service";

const bookingCar = catchAsync(async (req, res) => {
  const email = req.user?.email;

  if (email) {
    const result = await bookingService.bookingCarSaveDataIntoDB(
      req.body,
      email
    );

    sendResponse_.sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Car booked successfully",
      data: result,
    });
  }
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await bookingService.getAllBookingIntoDB(req.query);

  if (result?.length === 0) {
    sendResponse_.sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  }
  sendResponse_.sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getAllBookingUser = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await bookingService.getUserBookingIntoDB(user);

  if (result?.length === 0) {
    sendResponse_.sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse_.sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My Bookings retrieved successfully",
    data: result,
  });
});

const carReturn = catchAsync(async (req, res) => {
  const result = await bookingService.carReturnIntoDB(req.body);

  sendResponse_.sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car booked successfully",
    data: result,
  });
});

export const carBooking = {
  bookingCar,
  getAllBooking,
  getAllBookingUser,
  carReturn,
};
