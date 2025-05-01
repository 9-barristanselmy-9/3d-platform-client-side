import { object, z } from "zod";

export const ResetSchema = object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});
