"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/utils/validationRules";
import { SignInInputs } from "@/types";
import InputComponent from "./InputComponent";
import AuthFooter from "./AuthFooter";
import Link from "next/link";

export default function SignInForm() {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<SignInInputs>({
    // @ts-expect-error - Zod 4.x compatibility with react-hook-form resolver
    // eslint-disable-next-line
    resolver: zodResolver(SignInSchema) as any,
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInInputs) => {
    console.log("Form submitted successfully:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  return (
    <div className="form-container-wrapper flex flex-col justify-center items-center mt-20 mr-30 ml-30  flex-1 h-full">
      <h2 className="form-header-title w-full">Sign In</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col w-full mt-5 justify-between  flex-1 h-full"
      >
        <div>
          <InputComponent
            control={control}
            name="email"
            id="email"
            label="Email Address"
            type="email"
            placeholder="Email Address"
            isRequired
          />
          <InputComponent
            control={control}
            name="password"
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            isRequired
            isPasswordField
          />
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-2 justify-center items-center">
              <input
                className="cursor-pointer form-footer-text"
                id="remember-me"
                type="checkbox"
                placeholder="Remember Me"
              />
              <label
                htmlFor="remember-me"
                className="form-footer-text cursor-pointer"
              >
                Remember Me
              </label>
            </div>
            <Link href="/forgot" className="form-footer-text">
              Forgot Password ?
            </Link>
          </div>
        </div>
        <AuthFooter
          buttonText={"Sign In"}
          link="/sign-up"
          linkDesc="Don't have an account ?"
          text="Sign Up"
          isDisabled={!isValid || isSubmitting}
        />
      </form>
    </div>
  );
}
