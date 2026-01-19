"use client"

import InputComponent from "./InputComponent";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
// import useFormValidation from "../hooks/useFormValidation"
// import { createValidationRules } from '@/utils/validationRules';
import React, { useCallback, useState } from "react";
import AuthFooter from "./AuthFooter";
// import PhoneInput from "./PhoneInput";
import DatePickerComp from "./DatePicker";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SingUpInputs } from "@/types";

export default function SignUpForm() {

	const {
		register,
		handleSubmit,
		watch,
		control
		// x: { errors },
	} = useForm<SingUpInputs>({
		resolver: zodResolver(UserSchema)
	})


	const onSubmit: SubmitHandler<SingUpInputs> = (data) => console.log(data)

	// const [selectedCountryCode, setSelectedCountryCode] = useState('+374');
	// const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
	// const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

	// const passwordRef = React.useRef<string>("");

	// const inlineValidation = (selectedStartDate, selectedEndDate) {

	// }


	// const initialValidationRules = createValidationRules(selectedCountryCode);
	// const validationRules = React.useMemo(() => {
	// 	const rules = createValidationRules(undefined);

	// 	return {
	// 		...initialValidationRules,
	// 		password: (value: string): string | undefined => {
	// 			passwordRef.current = value; // Update ref whenever password is validated
	// 			return rules.password(value);
	// 		},
	// 		repeatPassword: (value: string): string | undefined => {
	// 			if (!value.trim()) {
	// 				return "Please confirm your password";
	// 			}
	// 			// Use the ref to get the current password value
	// 			if (value !== passwordRef.current) {
	// 				return "Passwords do not match";
	// 			}
	// 			return undefined;
	// 		},
	// 		startDate: (value: Date): string | undefined => {

	// 		}
	// 	} as Record<string, (value: string) => string | undefined>;
	// }, [initialValidationRules]);


	// const handleCountryCodeChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
	// 	const newCode = e.target.value;
	// 	setSelectedCountryCode(newCode);
	// }, [setSelectedCountryCode]);


	// const {
	// 	formData,
	// 	errors,
	// 	handleChange,
	// 	handleBlur,
	// 	handleSubmit,
	// 	resetForm,
	// 	shouldShowError,
	// } = useFormValidation(
	// 	{
	// 		name: "",
	// 		email: '',
	// 		password: '',
	// 		// phoneNumber: "",
	// 		startDate: "",
	// 		endDate: "",
	// 		repeatPassword: ""
	// 	},
	// 	validationRules
	// );

	// Handle form submission
	// const onSubmit = useCallback((data: typeof formData) => {
	// 	const submissionData = {
	// 		...data,
	// 	};
	// 	console.log('Form submitted successfully:', submissionData);
	// 	alert('Form submitted successfully! Check console for data.');
	// 	resetForm();
	// }, [resetForm]);


	// const checkButton = (shouldShowError: (name: "password" | "email") => boolean, data: typeof formData) => {
	// 	if (!data.email.length || !data.password.length) return true;

	// 	return shouldShowError('password') || shouldShowError('email');

	// }


	// const isDisabled = checkButton(shouldShowError, formData);

	return (
		<div className="form-container-wrapper flex flex-col mt20 justify-center items-center mt-10 mr-30 ml-30  flex-1 h-full">
			<h2 className="form-header-title w-full">Sign Up</h2>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col w-full mt-5 justify-between  flex-1 h-full">
				<div>
					{/* <InputComponent
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
					/> */}
					{/* <PhoneInput
						selectedCountryCode={selectedCountryCode}
						onCountryCodeChange={handleCountryCodeChange}
						value={formData.phoneNumber}
						onChange={handleChange}
						onBlur={handleBlur}
						showError={shouldShowError("phoneNumber")}
						error={errors.phoneNumber}
						countryCodeOptions={countryCodeOptions}
						ariaDescribedBy="phoneNumber-error"
					/> */}
					<div className="flex justify-between">
						<section>
							<Controller
								control={control}
								name="startDate"
								render={({ field, fieldState }) => (
									<DatePickerComp
										onBlur={field.onBlur}
										onChange={field.onChange}
										name={field.name}
										id="start date"
										label={"Education Start Date"}
										isRequired={true}
										error={fieldState.invalid}
										errorText={fieldState.error?.message}
										ariaDescribedBy='date error'
										selected={field.value}
									/>
								)}
							/>
						</section>
						<section>
							<Controller
								control={control}
								name="endDate"
								render={({ field, fieldState }) => (
									<DatePickerComp
										onBlur={field.onBlur}
										onChange={field.onChange}
										name={field.name}
										id="end date"
										label={"Education End Date"}
										isRequired={true}
										error={fieldState.invalid}
										errorText={fieldState.error?.message}
										ariaDescribedBy='date error'
										selected={field.value}
									/>
								)}
							/>
						</section>
						{/* <DatePickerComp id="eduction end" label="Education End Date" isRequired={true} selectedDate={selectedEndDate} setSelectedDate={setSelectedEndDate} /> */}
					</div>
					{/* <InputComponent
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
						ariaDescribedBy="name-error" /> */}

					{/* <InputComponent
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
					/> */}

				</div>
				<AuthFooter buttonText={"Sign Up"} link="/sign-in" linkDesc="Already have an account ?" text="Sign In" isDisabled={false} />

			</form>
		</div>
	)
}