import { object, optional, z } from "zod";

export const LoginSchema = object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Please enter a valide password ",
  }),
  optional: 
});
