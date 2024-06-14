import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse_ } from "../../utils/sendResponse";

import { userConstance } from "../User/user.constant";
import { carService } from "./car.service";

const createCar = catchAsync(async (req, res) => {
  const result = await carService.carMakeIntoDB(req.body);

  sendResponse_.sendResponse(res, {
    success: true,
    statusCode: userConstance.successCode,
    message: "Car created successfully",
    data: result,
  });
});

const getAllCars = catchAsync(async (req, res) => {
  const result = await carService.getAllCarsIntoDB();

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
    message: "Cars retrieved successfully",
    data: result,
  });
});

const getSingleCar = catchAsync(async (req, res) => {
  const id = req.params?.id;

  const result = await carService.getSingleCarIntoDB(id);
  if (!result) {
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
    message: "A Car retrieved successfully",
    data: result,
  });
});

const carDataUpdate = catchAsync(async (req, res) => {
  const id = req.params?.id;

  const result = await carService.carDataUpdateIntoDB(id, req.body);

  sendResponse_.sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car updated successfully",
    data: result,
  });
});

const deleteCar = catchAsync(async (req, res) => {
  const id = req.params?.id;

  const result = await carService.deleteCarIntoDB(id);

  sendResponse_.sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car Deleted successfully",
    data: result,
  });
});

export const carController = {
  createCar,
  getAllCars,
  getSingleCar,
  deleteCar,
  carDataUpdate,
};
