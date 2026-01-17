import React, { FocusEvent, useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

type InputComponentProps = {
	id: string
	label: string
	type: "password" | "email" | "name";
	name: string
	value: string
	onChange: (e: FocusEvent<HTMLInputElement>) => void
	onBlur: (e: FocusEvent<HTMLInputElement>) => void
	error?: string
	showError: boolean
	placeholder: string
	isRequired?: boolean
	maxLength?: number
	ariaDescribedBy: string
}

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
	const [isTextVisible, setIsTextVisible] = useState(type !== "password");

	const inputType = isTextVisible ? "password" : "text"
	return (
		<div className="contact-form-group">
			<label htmlFor={id} className="form-label">
				{label} {isRequired && <span className="required">*</span>}
			</label>
			<input
				id={id}
				type={inputType}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}
				maxLength={maxLength}
				className={`form-input ${showError ? 'error' : ''}`}
				aria-invalid={showError}
				aria-describedby={showError ? ariaDescribedBy : undefined}
			/>
			{type === "password" && <button type="button" onClick={() => setIsTextVisible((prv) => !prv)} className="togglePassword">
				{isTextVisible ? <FaEyeSlash size={24} /> : <IoEyeSharp size={24} />}

			</button>}
			{showError && (
				<span id={ariaDescribedBy} className="error-message" role="alert">
					{error}
				</span>
			)}
		</div>
	);
};

export default InputComponent;
