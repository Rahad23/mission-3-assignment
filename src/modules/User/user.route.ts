import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchema } from "./user.validation";
import auth from "../../middlewares/auth";

const userRouter = express.Router();

userRouter.post(
  "/",
  validateRequest(userValidationSchema.UserValidationSchema),
  userController.CreateUser
);

export default userRouter;
