"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponentRHF from "./InputComponentRHF";
import { SignUpFormData, countryCodeOptions, createSignUpSchema } from '@/utils/validationSchemas';
import { useState, useMemo } from "react";
import AuthFooter from "./AuthFooter";
import PhoneInputRHF from "./PhoneInputRHF";

export default function SignUpForm() {
	const [selectedCountryCode, setSelectedCountryCode] = useState('+374');

	// Create dynamic schema with phone validation based on country code
	const dynamicSchema = useMemo(() => {
		return createSignUpSchema(selectedCountryCode);
	}, [selectedCountryCode]);

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isValid, isDirty },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(dynamicSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			email: '',
			password: '',
			phoneNumber: "",
			repeatPassword: ""
		},
	});

	// Handle form submission
	const onSubmit = (data: SignUpFormData) => {
		console.log('Form submitted successfully:', data);
		alert('Form submitted successfully! Check console for data.');
		reset();
	};

	const isDisabled = !isValid || !isDirty;

	return (
		<div className="form-container-wrapper flex flex-col mt20 justify-center items-center mt-10 mr-30 ml-30  flex-1 h-full">
			<h2 className="form-header-title w-full">Sign Up</h2>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col w-full mt-5 justify-between  flex-1 h-full">
				<div>
					<InputComponentRHF
						id="name"
						type="name"
						label="Full Name"
						name="name"
						placeholder="Full Name"
						isRequired={true}
						error={errors.name}
						register={register}
					/>

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
					<PhoneInputRHF
						control={control}
						name="phoneNumber"
						selectedCountryCode={selectedCountryCode}
						onCountryCodeChange={setSelectedCountryCode}
						countryCodeOptions={countryCodeOptions}
						error={errors.phoneNumber}
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
				<AuthFooter buttonText={"Sign Up"} link="/sign-in" linkDesc="Already have an account ?" text="Sign In" isDisabled={isDisabled} />

			</form>
		</div>
	)
}