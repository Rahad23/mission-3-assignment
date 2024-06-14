import { model, Schema } from "mongoose";
import { TCar } from "./car.interface";
import { carConstance } from "./car.constant";

const CarSchema = new Schema<TCar>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    isElectric: {
      type: Boolean,
      required: true,
      default: true,
    },
    status: {
      type: String,
      enum: [...carConstance.carStatus],
      required: true,
      default: "available",
    },
    features: {
      type: [String],
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Car = model<TCar>("cars", CarSchema);
