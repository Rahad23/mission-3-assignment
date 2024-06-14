import { Types } from "mongoose";

export type TBooking = {
  carId: Types.ObjectId;
  date: string;
  startTime: string;
  endTime?: string;
  isBooked: "unconfirmed" | "confirmed";
  user: Types.ObjectId;
  totalCost: number;
};

export type TPayloadSchemaBooking = {
  carId: string;
  date: string;
  startTime: string;
};

export type TCarReturn = {
  bookingId: Types.ObjectId;
  endTime: string;
};

export interface Query {
  carId?: string;
  date?: string;
  isBooked?: string;
}
