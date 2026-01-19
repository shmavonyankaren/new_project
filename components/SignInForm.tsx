"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponentRHF from "./InputComponentRHF";
import { signInSchema, SignInFormData } from '@/utils/validationSchemas';
import AuthFooter from "./AuthFooter";
import Link from "next/link";

export default function SignInForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isDirty },
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
		mode: "onChange",
		defaultValues: {
			email: '',
			password: '',
		},
	});

	// Handle form submission
	const onSubmit = (data: SignInFormData) => {
		console.log('Form submitted successfully:', data);
		alert('Form submitted successfully! Check console for data.');
		reset();
	};

	const isDisabled = !isValid || !isDirty;

	return (
		<div className="form-container-wrapper flex flex-col justify-center items-center mt-20 mr-30 ml-30  flex-1 h-full">
			<h2 className="form-header-title w-full">Sign In</h2>
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
					<InputComponentRHF
						id="password"
						type="password"
						label="Password"
						name="password"
						placeholder="Password"
						isRequired={true}
						error={errors.password}
						register={register}
					/>
					<div className="flex w-full justify-between items-center">
						<div className="flex gap-2 justify-center items-center">
							<input
								className="cursor-pointer form-footer-text"
								id="remember-me"
								type="checkbox"
								placeholder="Remember Me"
							/>
							<label htmlFor="remember-me" className="form-footer-text cursor-pointer">Remember Me</label>

						</div>

						<Link href="/forgot" className="form-footer-text">Forgot Password ?</Link>

					</div>
				</div>
				<AuthFooter buttonText={"Sign In"} link="/sign-up" linkDesc="Don't have an account ?" text="Sign Up" isDisabled={isDisabled} />

			</form>
		</div>
	)
}