"use client"

import InputComponent from "./InputComponent";
import useFormValidation from "../hooks/useFormValidation"
import { countryCodeOptions, createValidationRules } from '@/utils/validationRules';
import { useCallback, useState } from "react";
import AuthFooter from "./AuthFooter";
import Link from "next/link";

export default function SignInForm() {
	const [selectedCountryCode, setSelectedCountryCode] = useState('+374');

	const validationRules = createValidationRules(selectedCountryCode);

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


	const checkButton = (shouldShowError: (name: "password" | "email") => boolean, data: typeof formData) => {
		if (!data.email.length || !data.password.length) return true;

		return shouldShowError('password') || shouldShowError('email');

	}


	const isDisabled = checkButton(shouldShowError, formData);

	return (
		<div className="flex flex-col mt20 justify-center items-center mt-20 mr-30 ml-30  flex-1 h-full">
			<h2 className="form-header-title w-full">Sing In</h2>
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
					<InputComponent
						id="password"
						type="password"
						label="Password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.password}
						showError={shouldShowError('password')}
						placeholder="Password"
						isRequired={true}
						ariaDescribedBy="name-error" />
					<div className="flex w-full justify-between">
						<div className="flex gap-2">
							<input
								className="cursor-pointer form-footer-text"
								id="remember-me"
								type="checkbox"
								placeholder="Remember Me"
							/>
							<label htmlFor="remember-me" className="cursor-pointer">Remember Me</label>

						</div>

						<Link href="/forgot" className="form-footer-text">Forgot Password ?</Link>

					</div>
				</div>
				<AuthFooter buttonText={"Sing In"} link="/sing-up" linkDesc="Don't have an account ?" text="Sing Up" isDisabled={isDisabled} />

			</form>
		</div>
	)
}