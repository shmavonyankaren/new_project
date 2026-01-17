import { CounryCodeOptionsType } from '@/types';
import React, { ChangeEvent, FocusEvent } from 'react';

type PhoneInputProps = {
	selectedCountryCode: string
	onCountryCodeChange: (e: ChangeEvent<HTMLSelectElement>) => void
	value: string
	onChange: (e: React.FocusEvent<HTMLInputElement, Element>) => void
	onBlur: (e: FocusEvent<HTMLInputElement>) => void
	error?: string
	showError: boolean
	countryCodeOptions: CounryCodeOptionsType[]
	ariaDescribedBy: string
}

const PhoneInput = ({
	selectedCountryCode,
	onCountryCodeChange,
	value,
	onChange,
	onBlur,
	error,
	showError,
	countryCodeOptions,
	ariaDescribedBy,
}: PhoneInputProps) => {
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
			<div className={`phone-input-container ${showError ? 'error' : ''}`}>
				<div className="country-code-display">
					<span className="country-flag">{getCurrentFlag()}</span>
					<span className="country-code-arrow">▼</span>
					<span className="country-code-text">{selectedCountryCode}</span>
					<select
						value={selectedCountryCode}
						onChange={onCountryCodeChange}
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
					name="phoneNumber"
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					placeholder={getCurrentPlaceholder()}
					className="phone-number-input"
					aria-invalid={showError}
					aria-describedby={showError ? ariaDescribedBy : undefined}
				/>
			</div>
			{showError && (
				<span id={ariaDescribedBy} className="error-message" role="alert">
					{error}
				</span>
			)}
		</div>
	);
};

export default PhoneInput;
