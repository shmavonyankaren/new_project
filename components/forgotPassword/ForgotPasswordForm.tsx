"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/utils/validationRules";
import { ForgotPasswordInputs } from "@/types";
import InputComponent from "../InputComponent";
import AuthFooter from "../AuthFooter";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<ForgotPasswordInputs>({
    // @ts-expect-error - Zod 4.x compatibility with react-hook-form resolver
    // eslint-disable-next-line
    resolver: zodResolver(ForgotPasswordSchema) as any,
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordInputs) => {
    console.log("Form submitted successfully:", data);
    alert("Form submitted successfully! Check console for data.");
    router.push("/reset");
  };

  return (
    <div className="form-container-wrapper flex flex-col mt20 justify-center items-center mt-20 mr-30 ml-30  flex-1 h-full">
      <h2 className="form-header-title w-full">Forgot Password</h2>
      <p className="forgot-password-desc">
        Enter your email address to receive a password reset link.
      </p>
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
          <div className="flex w-full justify-end items-center">
            <Link href="/sign-up" className="form-footer-text text-orange-400">
              Create an account ?
            </Link>
          </div>
        </div>
        <AuthFooter
          buttonText={"Send me a reset link"}
          link="/sign-up"
          linkDesc="Don't have an account ?"
          text="Sign Up"
          isDisabled={!isValid || isSubmitting}
        />
      </form>
    </div>
  );
}
