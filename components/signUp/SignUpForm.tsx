"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/utils/validationRules";
import AuthFooter from "../AuthFooter";
import DatePickerComp from "./DatePicker";
import "react-datepicker/dist/react-datepicker.css";
// import { SignUpInputs } from "@/types";
import InputComponent from "../InputComponent";
import Link from "next/link";
import registerUser from "@/utils/registerUser";
import { useRouter } from "next/navigation";
import z from "zod";
import { SignUpInputs } from "@/types";

// import PhoneInput from "./PhoneInput";
// import { countryCodeOptions } from "@/data";

export default function SignUpForm() {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(UserSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      // phoneNumber: "",
      startDate: undefined,
      endDate: undefined,
      password: "",
      repeatPassword: "",
      terms: false
    },
  });
  const onSubmit = async (data: SignUpInputs) => {
    const res = await registerUser(data);

    if (res?.status) {
      router.push("/")
    }
  };

  return (
    <div className="form-container-wrapper flex flex-col mt20 justify-center items-center mt-10 mr-30 ml-30  flex-1 h-full">
      <h2 className="form-header-title w-full">Sign Up</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col w-full mt-5 justify-between  flex-1 h-full"
      >
        <div>
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

          <InputComponent
            control={control}
            name="email"
            id="email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            isRequired
          />
          {/* <PhoneInput
            control={control}
            name="phoneNumber"
            id="phoneNumber"
            label="Phone Number"
            isRequired
            countryCodeOptions={countryCodeOptions}
          /> */}
          <div className="flex justify-between items-center">
            <section>
              <Controller
                control={control}
                name="startDate"
                render={({ field, fieldState }) => (
                  <DatePickerComp
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    name={field.name}
                    id="start date"
                    label={"Education Start Date"}
                    isRequired={true}
                    error={fieldState.invalid}
                    errorText={fieldState.error?.message}
                    selected={field.value}
                    maxDate={new Date()}
                  />
                )}
              />
            </section>
            <section>
              <Controller
                control={control}
                name="endDate"
                render={({ field, fieldState }) => (
                  <DatePickerComp
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    name={field.name}
                    id="end date"
                    label={"Education End Date"}
                    isRequired={true}
                    error={fieldState.invalid}
                    errorText={fieldState.error?.message}
                    selected={field.value}
                    maxDate={new Date()}
                  />
                )}
              />
            </section>
          </div>
          <section>
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
          </section>
          <Controller
            control={control}
            name="terms"
            render={({ field, fieldState }) => (
              <div>
                <div className="flex justify-start items-center gap-2">
                  <input
                    id="checkbox-terms"
                    type="checkbox"
                    name={field.name}
                    checked={field.value as boolean}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    placeholder="Terms"
                    className={`${fieldState.error ? "error" : ""} cursor-pointer`}
                    aria-invalid={!!fieldState.error}
                    aria-describedby={fieldState.error ? `checkbox-error` : undefined}
                  />
                  <label htmlFor='checkbox-terms' className="form-label mb-0!">
                    Agree to {" "}<Link href="#" className="text-orange-500">terms and conditions</Link>
                  </label>

                </div>
                {fieldState.error && (
                  <span id={`checkbox-error`} className="error-message" role="alert">
                    {fieldState.error.message}
                  </span>
                )}
              </div>

            )}
          />
        </div>
        <AuthFooter
          buttonText={"Sign Up"}
          link="/sign-in"
          linkDesc="Already have an account ?"
          text="Sign In"
          isDisabled={!isValid || isSubmitting}
        />
      </form >
    </div >
  );
}
