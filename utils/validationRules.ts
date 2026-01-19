import { SignUpInputs } from "@/types";
import { z, ZodType } from "zod"; // Add new import

export const UserSchema: ZodType<SignUpInputs> = z
  .object({
    email: z.string().email(),
    yearsOfExperience: z
      .number({
        er: "required field",
        invalid_type_error: "Years of Experience is required",
      })
      .min(1)
      .max(10),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });