import { Router } from "express";
import userRouter from "../modules/User/user.route";
import carRouter from "../modules/Car/car.route";
import authRouter from "../modules/Auth/auth.route";
import bookingRouter from "../modules/Booking/booking.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth/signup",
    route: userRouter,
  },
  {
    path: "/cars",
    route: carRouter,
  },
  {
    path: "/auth/signin",
    route: authRouter,
  },
  {
    path: "/bookings",
    route: bookingRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
