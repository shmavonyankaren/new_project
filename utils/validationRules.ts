import {
  SignUpInputs,
  SignInInputs,
  ForgotPasswordInputs,
  ResetPasswordInputs,
} from "@/types";
import { z, ZodType } from "zod";

const phonePatterns: Record<string, { regex: RegExp; format: string }> = {
  "+374": { regex: /^\d{2}-\d{2}-\d{2}-\d{2}$/, format: "99-99-99-99" },
  "+995": { regex: /^\d{3}-\d{2}-\d{2}-\d{2}$/, format: "999-99-99-99" },
  "+1": { regex: /^\(\d{3}\) \d{3}-\d{4}$/, format: "(999) 999-9999" },
};

const validatePhoneNumber = (phoneNumber: string): boolean => {
  if (!phoneNumber || phoneNumber.trim() === "") return false;

  return Object.values(phonePatterns).some((pattern) =>
    pattern.regex.test(phoneNumber),
  );
};

export const UserSchema: ZodType<SignUpInputs> = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .toLowerCase(),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .refine(
        validatePhoneNumber,
        "Please enter a valid phone number in the correct format",
      ),
    startDate: z
      .date({ message: "Start date is required" })
      .refine(
        (date) => date <= new Date(),
        "Start date cannot be in the future",
      ),
    endDate: z
      .date({ message: "End date is required" })
      .refine((date) => date <= new Date(), "End date cannot be in the future"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be less than 128 characters")
      .refine(
        (val) => /[a-z]/.test(val),
        "Password must contain at least one lowercase letter",
      )
      .refine(
        (val) => /[A-Z]/.test(val),
        "Password must contain at least one uppercase letter",
      )
      .refine(
        (val) => /\d/.test(val),
        "Password must contain at least one number",
      )
      .refine(
        (val) => /[@$!%*?&]/.test(val),
        "Password must contain at least one special character (@$!%*?&)",
      ),
    repeatPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export const SignInSchema: ZodType<SignInInputs> = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export const ForgotPasswordSchema: ZodType<ForgotPasswordInputs> = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
});

export const ResetPasswordSchema: ZodType<ResetPasswordInputs> = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be less than 128 characters")
      .refine(
        (val) => /[a-z]/.test(val),
        "Password must contain at least one lowercase letter",
      )
      .refine(
        (val) => /[A-Z]/.test(val),
        "Password must contain at least one uppercase letter",
      )
      .refine(
        (val) => /\d/.test(val),
        "Password must contain at least one number",
      )
      .refine(
        (val) => /[@$!%*?&]/.test(val),
        "Password must contain at least one special character (@$!%*?&)",
      ),
    repeatPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });
