"use client";

import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { FieldError, UseFormRegister } from "react-hook-form";

type InputComponentRHFProps = {
	id: string;
	label: string;
	type: "password" | "email" | "text" | "name" | "repeatPassword";
	name: string;
	placeholder: string;
	isRequired?: boolean;
	maxLength?: number;
	error?: FieldError;
	register: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

const InputComponentRHF = ({
	id,
	label,
	type,
	name,
	placeholder,
	isRequired = false,
	maxLength,
	error,
	register,
}: InputComponentRHFProps) => {
	const [isTextVisible, setIsTextVisible] = useState(
		type === "password" || type === "repeatPassword",
	);

	// Determine if this is a password-type field that should have toggle visibility
	const isPasswordField = type === "password" || type === "repeatPassword";

	// Set the actual input type
	const inputType = isPasswordField && isTextVisible ? "password" : type === "name" ? "text" : type;

	return (
		<div className="contact-form-group">
			<label htmlFor={id} className="form-label">
				{label} {isRequired && <span className="required">*</span>}
			</label>
			<div className="input-wrapper">
				<input
					id={id}
					type={inputType}
					placeholder={placeholder}
					maxLength={maxLength}
					className={`form-input ${error ? "error" : ""}`}
					aria-invalid={!!error}
					aria-describedby={error ? `${id}-error` : undefined}
					{...register(name)}
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
			{error && (
				<span id={`${id}-error`} className="error-message" role="alert">
					{error.message}
				</span>
			)}
		</div>
	);
};

export default InputComponentRHF;
