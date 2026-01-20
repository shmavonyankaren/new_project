"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/utils/validationRules";
import { ResetPasswordInputs } from "@/types";
import InputComponent from "../InputComponent";
import GenericButton from "../GenericButton";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordForm() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<ResetPasswordInputs>({
    // @ts-expect-error - Zod 4.x compatibility with react-hook-form resolver
    // eslint-disable-next-line
    resolver: zodResolver(ResetPasswordSchema) as any,
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordInputs) => {
    console.log("Form submitted successfully:", data);
    alert("Form submitted successfully! Check console for data.");
    router.push("/sign-in");
  };

  return (
    <div className="form-container-wrapper flex flex-col justify-center items-center mt-20 mr-30 ml-30  flex-1 h-full">
      <h2 className="form-header-title w-full">Reset Password</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col w-full mt-5 justify-between  flex-1 h-full"
      >
        <div>
          <InputComponent
            control={control}
            name="password"
            id="password"
            label="New Password"
            type="password"
            placeholder="New Password"
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
        </div>
        <div className="flex w-full justify-between items-center pb-5">
          <Link
            href="/sign-in"
            className="flex gap-2 items-center form-footer-text"
          >
            <HiArrowLongLeft size={24} />
            Back to Sign In
          </Link>
          <GenericButton
            text="Reset Password"
            isDisabled={!isValid || isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
