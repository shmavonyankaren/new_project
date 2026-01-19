"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponentRHF from "./InputComponentRHF";
import { resetPasswordSchema, ResetPasswordFormData } from '@/utils/validationSchemas';
import Link from "next/link";
import GenericButton from "./GenericButton";
import { HiArrowLongLeft } from "react-icons/hi2";
import { redirect } from "next/navigation";

export default function ResetPasswordForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isDirty },
	} = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		mode: "onChange",
		defaultValues: {
			password: '',
			repeatPassword: ""
		},
	});

	// Handle form submission
	const onSubmit = (data: ResetPasswordFormData) => {
		console.log('Form submitted successfully:', data);
		alert('Form submitted successfully! Check console for data.');
		reset();
		redirect("/sign-in");
	};

	const isDisabled = !isValid || !isDirty;

	return (
		<div className="form-container-wrapper flex flex-col justify-center items-center mt-20 mr-30 ml-30  flex-1 h-full">
			<h2 className="form-header-title w-full">Reset Password</h2>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col w-full mt-5 justify-between  flex-1 h-full">
				<div>
					<InputComponentRHF
						id="password"
						type="password"
						label="New Password"
						name="password"
						placeholder="New Password"
						isRequired={true}
						error={errors.password}
						register={register}
					/>
					<InputComponentRHF
						id="repeatPassword"
						label="Confirm Password"
						type="repeatPassword"
						name="repeatPassword"
						placeholder="Re-enter your password"
						isRequired={true}
						maxLength={128}
						error={errors.repeatPassword}
						register={register}
					/>
				</div>
				<div className="reset-footer pb-5 md:pb-20 flex justify-between w-full ">
					<div className="flex justify-start items-center">
						<Link href="/sign-in" className="back-to-sign-in text-center flex items-center justify-center"><HiArrowLongLeft color="black" size={40} height={100} width={50} />
							Back to login</Link>
					</div>
					<GenericButton text="Change the Password" isDisabled={isDisabled} />
				</div>
			</form >
		</div >
	)
}