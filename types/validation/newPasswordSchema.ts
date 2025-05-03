import { object, z } from "zod";

export const NewPasswordSchema = object({
  password: z.string().min(6,{
    message: "Minimum of 6 characters required",
  }),
});