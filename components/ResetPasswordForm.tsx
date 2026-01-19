"use client"

import InputComponent from "./InputComponent";
import useFormValidation from "../hooks/useFormValidation"
import { createValidationRules } from '@/utils/validationRules';
import React, { useCallback } from "react";
import Link from "next/link";
import GenericButton from "./GenericButton";
import { HiArrowLongLeft } from "react-icons/hi2";
import { redirect } from "next/navigation";

export default function ResetPasswordForm() {
	const passwordRef = React.useRef<string>("");


	const initialValidationRules = createValidationRules(undefined);
	const validationRules = React.useMemo(() => {
		const rules = createValidationRules(undefined);

		return {
			...initialValidationRules,
			password: (value: string): string | undefined => {
				passwordRef.current = value; // Update ref whenever password is validated
				return rules.password(value);
			},
			repeatPassword: (value: string): string | undefined => {
				if (!value.trim()) {
					return "Please confirm your password";
				}
				// Use the ref to get the current password value
				if (value !== passwordRef.current) {
					return "Passwords do not match";
				}
				return undefined;
			},
		} as Record<string, (value: string) => string | undefined>;
	}, [initialValidationRules]);
	const {
		formData,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
		resetForm,
		shouldShowError,
	} = useFormValidation(
		{
			password: '',
			repeatPassword: ""
		},
		validationRules
	);

	// Handle form submission
	const onSubmit = useCallback((data: typeof formData) => {
		const submissionData = {
			...data,
		};
		console.log('Form submitted successfully:', submissionData);
		alert('Form submitted successfully! Check console for data.');
		resetForm();

		redirect("/sign-in");
	}, [resetForm]);


	const checkButton = (shouldShowError: (name: "password") => boolean, data: typeof formData) => {
		if (!data.password.length) return true;

		return shouldShowError('password');

	}


	const isDisabled = checkButton(shouldShowError, formData);

	return (
		<div className="form-container-wrapper flex flex-col justify-center items-center mt-20 mr-30 ml-30  flex-1 h-full">
			<h2 className="form-header-title w-full">Reset Password</h2>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col w-full mt-5 justify-between  flex-1 h-full">
				<div>
					<InputComponent
						id="password"
						type="password"
						label="New Password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.password}
						showError={shouldShowError('password')}
						placeholder="New  Password"
						isRequired={true}
						ariaDescribedBy="name-error"
					/>
					<InputComponent
						id="repeatPassword"
						label="Confirm Password"
						type="repeatPassword"
						name="repeatPassword"
						value={formData.repeatPassword}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.repeatPassword}
						showError={shouldShowError("repeatPassword")}
						placeholder="Re-enter your password"
						isRequired={true}
						maxLength={128}
						ariaDescribedBy="repeatPassword-error"
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