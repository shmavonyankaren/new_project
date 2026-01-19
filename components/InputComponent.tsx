"use client";

import React, { FocusEvent, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

type InputComponentProps = {
	id: string;
	label: string;
	type: "password" | "email" | "name" | "repeatPassword";
	name: string;
	value: string;
	onChange: (e: FocusEvent<HTMLInputElement>) => void;
	onBlur: (e: FocusEvent<HTMLInputElement>) => void;
	error?: string;
	showError: boolean;
	placeholder: string;
	isRequired?: boolean;
	maxLength?: number;
	ariaDescribedBy: string;
};

const InputComponent = ({
	id,
	label,
	type,
	name,
	value,
	onChange,
	onBlur,
	error,
	showError,
	placeholder,
	isRequired = false,
	maxLength = undefined,
	ariaDescribedBy,
}: InputComponentProps) => {
	const [isTextVisible, setIsTextVisible] = useState(
		type === "password" || type === "repeatPassword",
	);

	// Determine if this is a password-type field that should have toggle visibility
	const isPasswordField = type === "password" || type === "repeatPassword";

	// Set the actual input type
	const inputType = isPasswordField && isTextVisible ? "password" : "text";

	return (
		<div className="contact-form-group">
			<label htmlFor={id} className="form-label">
				{label} {isRequired && <span className="required">*</span>}
			</label>
			<div className="input-wrapper">
				<input
					id={id}
					type={inputType}
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					placeholder={placeholder}
					maxLength={maxLength}
					className={`form-input ${showError ? "error" : ""}`}
					aria-invalid={showError}
					aria-describedby={showError ? ariaDescribedBy : undefined}
				/>
				{isPasswordField && (
					<button
						type="button"
						onMouseDown={(e) => e.preventDefault()}
						onClick={() => setIsTextVisible((prev) => !prev)}
						className="togglePassword"
						aria-label={isTextVisible ? "Show password" : "Hide password"}
					>
						{isTextVisible ? (
							<FaEyeSlash size={24} />
						) : (
							<IoEyeSharp size={24} />
						)}
					</button>
				)}
			</div>
			{showError && (
				<span id={ariaDescribedBy} className="error-message" role="alert">
					{error}
				</span>
			)}
		</div>
	);
};

export default InputComponent;