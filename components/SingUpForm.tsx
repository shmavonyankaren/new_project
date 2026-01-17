"use client"

import InputComponent from "./InputComponent";
import useFormValidation from "../hooks/useFormValidation"
import { countryCodeOptions, createValidationRules } from '@/utils/validationRules';
import { ChangeEvent, useCallback, useState } from "react";
import AuthFooter from "./AuthFooter";
import Link from "next/link";
import PhoneInput from "./PhoneInput";

export default function SingUpForm() {
	const [selectedCountryCode, setSelectedCountryCode] = useState('+374');

	const validationRules = createValidationRules(selectedCountryCode);
	const handleCountryCodeChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
		const newCode = e.target.value;
		setSelectedCountryCode(newCode);
	}, []);
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
			name: "",
			email: '',
			password: '',
			phoneNumber: ""
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
			<h2 className="form-header-title w-full">Sing Up</h2>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col w-full mt-5 justify-between  flex-1 h-full">
				<div><InputComponent
					id="name"
					type="name"
					label="Full Name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					onBlur={handleBlur}
					error={errors.name}
					showError={shouldShowError('name')}
					placeholder="Full Name"
					isRequired={true}
					ariaDescribedBy="name-error"
				/>

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
					<PhoneInput
						selectedCountryCode={selectedCountryCode}
						onCountryCodeChange={handleCountryCodeChange}
						value={formData.phoneNumber}
						onChange={handleChange}
						onBlur={handleBlur}
						showError={shouldShowError("phoneNumber")}
						error={errors.phoneNumber}
						countryCodeOptions={countryCodeOptions}
						ariaDescribedBy="phoneNumber-error"
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

				</div>
				<AuthFooter buttonText={"Sing Up"} link="/sing-in" linkDesc="Already have an account ?" text="Sing In" isDisabled={isDisabled} />

			</form>
		</div>
	)
}