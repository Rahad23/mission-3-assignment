import express from "express";
import { authController } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/", authController.authLogin);

export default authRouter;
