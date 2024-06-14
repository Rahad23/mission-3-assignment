import httpStatus from "http-status";
import AppError from "../../errors/app.error";
import { TCar } from "./car.interface";
import { Car } from "./car.model";

const carMakeIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);

  return result;
};

const getAllCarsIntoDB = async () => {
  const result = await Car.find();
  return result;
};

const getSingleCarIntoDB = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};

const carDataUpdateIntoDB = async (id: string, payload: Partial<TCar>) => {
  const existingCar = await Car.findById(id);
  const { features, ...AllData } = payload;

  if (!existingCar) {
    throw new Error(`Car not exist !`);
  }

  if (features && features.length > 0) {
    await Car.updateOne(
      { _id: id },
      {
        $addToSet: {
          features: { $each: features },
        },
      }
    );
  }

  const result = await Car.findByIdAndUpdate(id, AllData, {
    new: true,
  });

  return result;
};

const deleteCarIntoDB = async (id: string) => {
  const carData_ = await Car.findById(id);

  if (!carData_) {
    throw new AppError(httpStatus.BAD_REQUEST, "Car data not found!");
  }

  if (carData_?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "Car already deleted !");
  }

  const result = await Car.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  return result;
};

export const carService = {
  carMakeIntoDB,
  getAllCarsIntoDB,
  getSingleCarIntoDB,
  deleteCarIntoDB,
  carDataUpdateIntoDB,
};
