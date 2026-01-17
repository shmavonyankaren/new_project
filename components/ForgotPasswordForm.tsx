"use client"

import InputComponent from "./InputComponent";
import useFormValidation from "../hooks/useFormValidation"
import { countryCodeOptions, createValidationRules } from '@/utils/validationRules';
import { useCallback } from "react";
import AuthFooter from "./AuthFooter";
import Link from "next/link";

export default function ForgotPasswordForm() {
	const validationRules = createValidationRules(undefined);

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
			email: '',
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
	}, [resetForm]);


	const checkButton = (shouldShowError: (name: "email") => boolean, data: typeof formData) => {
		if (!data.email.length) return true;

		return shouldShowError('email');

	}


	const isDisabled = checkButton(shouldShowError, formData);

	return (
		<div className="flex flex-col mt20 justify-center items-center mt-20 mr-30 ml-30  flex-1 h-full">
			<h2 className="form-header-title w-full">Forgot Password</h2>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col w-full mt-5 justify-between  flex-1 h-full">
				<div>
					<InputComponent
						id="email"
						type="email"
						label="Email Address"
						name="email"
						value={formData.email}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.email}
						showError={shouldShowError('email')}
						placeholder="Email Address"
						isRequired={true}
						ariaDescribedBy="name-error"
					/>
					<div className="flex w-full justify-end items-center">

						<Link href="/sing-up" className="form-footer-text text-orange-400">Create an account ?</Link>

					</div>
				</div>
				<AuthFooter buttonText={"Send me a reset link"} link="/sing-up" linkDesc="Don't have an account ?" text="Sing Up" isDisabled={isDisabled} />

			</form>
		</div>
	)
}