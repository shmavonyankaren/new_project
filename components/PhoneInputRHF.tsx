"use client";

import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { CounryCodeOptionsType } from '@/types';

type PhoneInputRHFProps = {
	control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
	name: string;
	selectedCountryCode: string;
	onCountryCodeChange: (code: string) => void;
	countryCodeOptions: CounryCodeOptionsType[];
	error?: FieldError;
};

const PhoneInputRHF = ({
	control,
	name,
	selectedCountryCode,
	onCountryCodeChange,
	countryCodeOptions,
	error,
}: PhoneInputRHFProps) => {
	const getCurrentCountry = () => {
		return countryCodeOptions.find((option) => option.code === selectedCountryCode);
	};

	const getCurrentFlag = () => {
		return getCurrentCountry()?.flag;
	};

	const getCurrentPlaceholder = () => {
		return getCurrentCountry()?.format || '99-99-99-99';
	};

	return (
		<div className="contact-form-group">
			<label htmlFor="phoneNumber" className="form-label">
				Contact Number <span className="required">*</span>
			</label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<>
						<div className={`phone-input-container ${error ? 'error' : ''}`}>
							<div className="country-code-display">
								<span className="country-flag">{getCurrentFlag()}</span>
								<span className="country-code-arrow">▼</span>
								<span className="country-code-text">{selectedCountryCode}</span>
								<select
									value={selectedCountryCode}
									onChange={(e) => onCountryCodeChange(e.target.value)}
									className="country-code-select-hidden"
									aria-label="Country code"
								>
									{countryCodeOptions.map((option) => (
										<option key={option.code} value={option.code}>
											{option.flag} {option.code} {option.label}
										</option>
									))}
								</select>
							</div>
							<input
								type="tel"
								id="phoneNumber"
								placeholder={getCurrentPlaceholder()}
								className="phone-number-input"
								aria-invalid={!!error}
								aria-describedby={error ? 'phoneNumber-error' : undefined}
								{...field}
							/>
						</div>
						{error && (
							<span id="phoneNumber-error" className="error-message" role="alert">
								{error.message}
							</span>
						)}
					</>
				)}
			/>
		</div>
	);
};

export default PhoneInputRHF;
