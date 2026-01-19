"use client";

import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

type DatePickerRHFProps = {
	control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
	name: string;
	id: string;
	label: string;
	isRequired?: boolean;
	minDate?: string; // YYYY-MM-DD format
	maxDate?: string; // YYYY-MM-DD format
	error?: FieldError;
};

const DatePickerRHF = ({
	control,
	name,
	id,
	label,
	isRequired = false,
	minDate,
	maxDate,
	error,
}: DatePickerRHFProps) => {
	return (
		<div className="contact-form-group">
			<label htmlFor={id} className="form-label">
				{label} {isRequired && <span className="required">*</span>}
			</label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<>
						<input
							id={id}
							type="date"
							className={`form-input ${error ? "error" : ""}`}
							aria-invalid={!!error}
							aria-describedby={error ? `${id}-error` : undefined}
							min={minDate}
							max={maxDate}
							{...field}
						/>
						{error && (
							<span id={`${id}-error`} className="error-message" role="alert">
								{error.message}
							</span>
						)}
					</>
				)}
			/>
		</div>
	);
};

export default DatePickerRHF;
