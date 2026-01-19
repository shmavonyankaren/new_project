"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/utils/validationRules";
import { SignUpInputs } from "@/types";
import InputComponent from "./InputComponent";
import DatePickerComp from "./DatePicker";
import PhoneInput from "./PhoneInput";
import { countryCodeOptions } from "@/data";

/**
 * Complete SignUp Form Example
 *
 * This demonstrates the modern approach to form handling using:
 * - react-hook-form for form state management
 * - Zod for schema validation
 * - Custom controlled components
 */
export default function SignUpFormExample() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
    watch,
  } = useForm<SignUpInputs>({
    // @ts-expect-error - Zod 4.x compatibility with react-hook-form resolver
    // eslint-disable-next-line
    resolver: zodResolver(UserSchema) as any,
    mode: "onChange", // Real-time validation for immediate feedback
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      startDate: undefined,
      endDate: undefined,
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    console.log("✅ Form submitted successfully:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Sign up successful! Check the console for form data.");
    reset(); // Reset form after successful submission
  };

  // Watch fields if you need to react to changes
  const password = watch("password") || "";
  const startDate = watch("startDate");

  return (
    <div className="form-container-wrapper flex flex-col mt20 justify-center items-center mt-10 mr-30 ml-30 flex-1 h-full">
      <h2 className="form-header-title w-full">Sign Up</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate // Disable browser validation
        className="flex flex-col w-full mt-5 justify-between flex-1 h-full"
      >
        <div>
          {/* Name Input */}
          <InputComponent
            control={control}
            name="name"
            id="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            isRequired
            maxLength={50}
          />

          {/* Email Input */}
          <InputComponent
            control={control}
            name="email"
            id="email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            isRequired
          />

          {/* Phone Input with Country Code */}
          <PhoneInput
            control={control}
            name="phoneNumber"
            id="phoneNumber"
            label="Contact Number"
            isRequired
            countryCodeOptions={countryCodeOptions}
          />

          {/* Date Range - Start and End Date */}
          <div className="flex justify-between gap-4">
            <section className="flex-1">
              <Controller
                control={control}
                name="startDate"
                render={({ field, fieldState }) => (
                  <DatePickerComp
                    id="startDate"
                    name={field.name}
                    label="Education Start Date"
                    selected={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={!!fieldState.error}
                    errorText={fieldState.error?.message}
                    isRequired
                    maxDate={new Date()}
                  />
                )}
              />
            </section>

            <section className="flex-1">
              <Controller
                control={control}
                name="endDate"
                render={({ field, fieldState }) => (
                  <DatePickerComp
                    id="endDate"
                    name={field.name}
                    label="Education End Date"
                    selected={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={!!fieldState.error}
                    errorText={fieldState.error?.message}
                    isRequired
                    maxDate={new Date()}
                    minDate={startDate} // End date cannot be before start date
                  />
                )}
              />
            </section>
          </div>

          {/* Password Input */}
          <InputComponent
            control={control}
            name="password"
            id="password"
            label="Password"
            type="password"
            placeholder="Enter a strong password"
            isRequired
            isPasswordField
            maxLength={128}
          />

          {/* Confirm Password Input */}
          <InputComponent
            control={control}
            name="repeatPassword"
            id="repeatPassword"
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            isRequired
            isPasswordField
            maxLength={128}
          />

          {/* Display validation info */}
          {password && password.length > 0 && (
            <div
              className="password-requirements"
              style={{
                fontSize: "0.875rem",
                marginTop: "0.5rem",
                color: "#666",
              }}
            >
              Password must contain:
              <ul style={{ paddingLeft: "1.5rem", marginTop: "0.25rem" }}>
                <li style={{ color: password.length >= 8 ? "green" : "red" }}>
                  At least 8 characters
                </li>
                <li style={{ color: /[A-Z]/.test(password) ? "green" : "red" }}>
                  One uppercase letter
                </li>
                <li style={{ color: /[a-z]/.test(password) ? "green" : "red" }}>
                  One lowercase letter
                </li>
                <li style={{ color: /[0-9]/.test(password) ? "green" : "red" }}>
                  One number
                </li>
                <li
                  style={{
                    color: /[@$!%*?&]/.test(password) ? "green" : "red",
                  }}
                >
                  One special character (@$!%*?&)
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: isSubmitting ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              marginTop: "1rem",
            }}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>

          {/* Debug Info (remove in production) */}
          {process.env.NODE_ENV === "development" && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                backgroundColor: "#f5f5f5",
                borderRadius: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              <strong>Form State (Dev Mode):</strong>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>Is Valid: {isValid ? "✅" : "❌"}</li>
                <li>Is Dirty: {isDirty ? "✅" : "❌"}</li>
                <li>Is Submitting: {isSubmitting ? "✅" : "❌"}</li>
                <li>Errors: {Object.keys(errors).length}</li>
              </ul>
            </div>
          )}
        </div>

        {/* Auth Footer (if you have one) */}
        {/* <AuthFooter 
          buttonText="Sign Up" 
          link="/sign-in" 
          linkDesc="Already have an account?" 
          text="Sign In" 
          isDisabled={isSubmitting}
        /> */}
      </form>
    </div>
  );
}
