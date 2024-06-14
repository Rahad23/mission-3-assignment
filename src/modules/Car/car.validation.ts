import { z } from "zod";
import { carConstance } from "./car.constant";

const carValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Car name is required!" }),
    description: z.string({ required_error: "Car description is required!" }),
    color: z.string({ required_error: "Car color is required!" }),
    isElectric: z.boolean({ required_error: "Car type is required!" }),
    features: z.array(z.string()),
    pricePerHour: z.number({
      required_error: "Car price per hour is required!",
    }),
  }),
});

const carUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Car name is required!" }).optional(),
    description: z
      .string({ required_error: "Car description is required!" })
      .optional(),
    color: z.string({ required_error: "Car color is required!" }).optional(),
    isElectric: z
      .boolean({ required_error: "Car type is required!" })
      .optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z
      .number({
        required_error: "Car price per hour is required!",
      })
      .optional(),
  }),
});

export const carValidation = {
  carUpdateValidationSchema,
  carValidationSchema,
};
