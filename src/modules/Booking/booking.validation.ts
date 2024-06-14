import { z } from "zod";

const carBookingValidation = z.object({
  body: z.object({
    carId: z.string({ required_error: "carId is required" }),
    date: z.string({ required_error: "Date is required" }),
    startTime: z.string({ required_error: "Start time is required" }),
  }),
});

const carBookingUpdateValidation = z.object({
  body: z.object({
    carId: z.string({ required_error: "carId is required" }).optional(),
    date: z.string({ required_error: "Date is required" }).optional(),
    startTime: z
      .string({ required_error: "Start time is required" })
      .optional(),
  }),
});

const carReturnValidation = z.object({
  body: z.object({
    bookingId: z.string({ required_error: "Booking id required!" }),
    endTime: z.string({ required_error: "End time required !" }),
  }),
});

export const bookingValidation = {
  carBookingValidation,
  carBookingUpdateValidation,
  carReturnValidation,
};
