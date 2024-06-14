import express from "express";
import { carController } from "./car.controller";
import validateRequest from "../../middlewares/validateRequest";
import { carValidation } from "./car.validation";
import auth from "../../middlewares/auth";

const carRouter = express.Router();

carRouter.post(
  "/",
  validateRequest(carValidation.carValidationSchema),
  auth("admin"),
  carController.createCar
);

carRouter.get("/", auth("admin", "user"), carController.getAllCars);

carRouter.put("/:id", auth("admin"), carController.carDataUpdate);

carRouter.get("/:id", auth("admin", "user"), carController.getSingleCar);

carRouter.delete("/:id", auth("admin"), carController.deleteCar);

export default carRouter;
