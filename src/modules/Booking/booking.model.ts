import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const carBookingSchema = new Schema<TBooking>(
  {
    carId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "cars",
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      default: null,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    isBooked: {
      type: String,
      default: "unconfirmed",
    },
  },
  {
    timestamps: true,
  }
);

carBookingSchema.pre("save", async function (next) {
  const car = this;
  car.isBooked = "confirmed";
  next();
});

// carBookingSchema.virtual("car").get(function () {
//   return this.carId;
// });

export const Booking = model<TBooking>("booking", carBookingSchema);
