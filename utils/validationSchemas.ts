import { z } from 'zod';
import { CounryCodeOptionsType } from '@/types';

// Country code options with validation rules
export const countryCodeOptions: CounryCodeOptionsType[] = [
  {
    code: "+374",
    label: "Armenia",
    flag: "🇦🇲",
    length: 8,
    format: "99-99-99-99",
  },
  {
    code: "+995",
    label: "Georgia",
    flag: "🇬🇪",
    length: 9,
    format: "999-99-99-99",
  },
  {
    code: "+1",
    label: "USA",
    flag: "🇺🇸",
    length: 10,
    format: "(999) 999-9999",
  },
];

// Base field validations
export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .min(2, "Name must be at least 2 characters")
  .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes");

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .min(3, "Email must be at least 3 characters")
  .max(254, "Email must be less than 254 characters")
  .email("Please enter a valid email address")
  .regex(
    /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Email contains invalid characters"
  )
  .refine((email) => !/\.\./.test(email), "Email cannot contain consecutive dots")
  .refine((email) => {
    const [localPart] = email.split("@");
    return !localPart.startsWith(".") && !localPart.endsWith(".");
  }, "Email cannot start or end with a dot");

export const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be less than 128 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/? ~`]/,
    "Password must contain at least one special character (! @#$%^&* etc.)"
  );

// Phone number validation with country code
export const createPhoneSchema = (countryCode: string) => {
  const country = countryCodeOptions.find((opt) => opt.code === countryCode);
  
  if (!country) {
    return z.string().min(1, "Phone number is required");
  }

  return z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-()]+$/, "Please enter a valid phone number")
    .refine((value) => {
      const digitsOnly = value.replace(/\D/g, "");
      return digitsOnly.length === country.length;
    }, `Phone number must be exactly ${country.length} digits for ${country.label}`);
};

// Date validation
export const dateSchema = z
  .string()
  .min(1, "Date is required")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
  .refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  }, "Invalid date")
  .refine((date) => {
    const parsed = new Date(date);
    const now = new Date();
    return parsed <= now;
  }, "Date cannot be in the future");

// Form schemas
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const signUpSchemaBase = z.object({
  name: nameSchema,
  email: emailSchema,
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: passwordSchema,
  repeatPassword: z.string().min(1, "Please confirm your password"),
});

export const signUpSchema = signUpSchemaBase.refine((data) => data.password === data.repeatPassword, {
  message: "Passwords do not match",
  path: ["repeatPassword"],
});

// Function to create dynamic sign-up schema with phone validation
export const createSignUpSchema = (countryCode: string) => {
  return z.object({
    name: nameSchema,
    email: emailSchema,
    phoneNumber: createPhoneSchema(countryCode),
    password: passwordSchema,
    repeatPassword: z.string().min(1, "Please confirm your password"),
  }).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });
};

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  repeatPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords do not match",
  path: ["repeatPassword"],
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// Type exports for TypeScript
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchemaBase>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
