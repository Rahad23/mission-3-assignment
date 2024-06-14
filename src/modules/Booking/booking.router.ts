import express from "express";
import { carBooking } from "./booking.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidation } from "./booking.validation";

const bookingRouter = express.Router();

bookingRouter.post(
  "/",
  auth("user"),
  validateRequest(bookingValidation.carBookingValidation),
  carBooking.bookingCar
);

bookingRouter.get("/", auth("admin"), carBooking.getAllBooking);

bookingRouter.get("/my-bookings", auth("user"), carBooking.getAllBookingUser);

bookingRouter.put(
  "/return",
  auth("admin"),
  validateRequest(bookingValidation.carReturnValidation),
  carBooking.carReturn
);

export default bookingRouter;
