"use client"

import InputComponent from "./InputComponent";
import useFormValidation from "../hooks/useFormValidation"
import { createValidationRules } from '@/utils/validationRules';
import { useCallback } from "react";
import AuthFooter from "./AuthFooter";
import Link from "next/link";
import GenericButton from "./GenericButton";
import { HiArrowLongLeft } from "react-icons/hi2";

export default function ResetPasswordForm() {
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
			password: '',
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


	const checkButton = (shouldShowError: (name: "password") => boolean, data: typeof formData) => {
		if (!data.password.length) return true;

		return shouldShowError('password');

	}


	const isDisabled = checkButton(shouldShowError, formData);

	return (
		<div className="flex flex-col mt20 justify-center items-center mt-20 mr-30 ml-30  flex-1 h-full">
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
						id="password"
						type="password"
						label="Reapet New Password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.password}
						showError={shouldShowError('password')}
						placeholder="Re-enter your new Password"
						isRequired={true}
						ariaDescribedBy="name-error"
					/>
				</div>
				<div className="pb-20  flex justify-between w-full">
					<div className="">
						<Link href="/sing-in" className="back-to-sign-in flex items-center justify-center"><HiArrowLongLeft color="black" size={40} height={100} width={50} />
							Back to login</Link>
					</div>
					<GenericButton text="Change the Password" isDisabled={isDisabled} />
				</div>
			</form >
		</div >
	)
}