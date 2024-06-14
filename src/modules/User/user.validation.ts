import { z } from "zod";
import { userConstance } from "./user.constant";

const UserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "User name is required!" }),
    email: z
      .string({ required_error: "Email is required!" })
      .email({ message: "Invalid email address!" }),
    role: z.enum(userConstance.Role_ as [string, ...string[]]),
    password: z.string({ required_error: "Password is required!" }),
    phone: z.string({ required_error: "Phone number is required!" }),
    address: z.string({ required_error: "Address is required!" }),
  }),
});

const UpdateUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "User name is required!" }).optional(),
    email: z
      .string({ required_error: "Email is required!" })
      .email({ message: "Invalid email address!" })
      .optional(),
    role: z.enum(userConstance.Role_ as [string, ...string[]]).optional(),
    password: z.string({ required_error: "Password is required!" }).optional(),
    phone: z.string({ required_error: "Phone number is required!" }).optional(),
    address: z.string({ required_error: "Address is required!" }).optional(),
  }),
});

export const userValidationSchema = {
  UserValidationSchema,
  UpdateUserValidationSchema,
};
