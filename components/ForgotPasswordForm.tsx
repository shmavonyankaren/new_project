"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponentRHF from "./InputComponentRHF";
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/utils/validationSchemas';
import AuthFooter from "./AuthFooter";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function ForgotPasswordForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isDirty },
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		mode: "onChange",
		defaultValues: {
			email: '',
		},
	});

	// Handle form submission
	const onSubmit = (data: ForgotPasswordFormData) => {
		console.log('Form submitted successfully:', data);
		alert('Form submitted successfully! Check console for data.');
		reset();
		redirect("/reset")
	};

	const isDisabled = !isValid || !isDirty;

	return (
		<div className="form-container-wrapper flex flex-col mt20 justify-center items-center mt-20 mr-30 ml-30  flex-1 h-full">
			<h2 className="form-header-title w-full">Forgot Password</h2>
			<p className="forgot-password-desc">Enter your email address to receive a password reset link.</p>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col w-full mt-5 justify-between  flex-1 h-full">
				<div>
					<InputComponentRHF
						id="email"
						type="email"
						label="Email Address"
						name="email"
						placeholder="Email Address"
						isRequired={true}
						error={errors.email}
						register={register}
					/>
					<div className="flex w-full justify-end items-center">

						<Link href="/sign-up" className="form-footer-text text-orange-400">Create an account ?</Link>

					</div>
				</div>
				<AuthFooter buttonText={"Send me a reset link"} link="/sign-up" linkDesc="Don't have an account ?" text="Sign Up" isDisabled={isDisabled} />

			</form>
		</div>
	)
}