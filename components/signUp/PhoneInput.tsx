"use client";

import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { CounryCodeOptionsType, SignUpInputs } from "@/types";
import { countryCodeOptions } from "@/data";

type PhoneInputProps = {
  control: Control<SignUpInputs>;
  name: keyof SignUpInputs;
  id?: string;
  label?: string;
  isRequired?: boolean;
  countryCodeOptions?: CounryCodeOptionsType[];
};

const PhoneInput = ({
  control,
  name,
  id = "phoneNumber",
  label = "Contact Number",
  isRequired = true,
  countryCodeOptions: customCountryCodeOptions,
}: PhoneInputProps) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+374");
  const options = customCountryCodeOptions || countryCodeOptions;

  const getCurrentCountry = () => {
    return options.find((option) => option.code === selectedCountryCode);
  };

  const getCurrentFlag = () => {
    return getCurrentCountry()?.flag || "🌍";
  };

  const getCurrentPlaceholder = () => {
    return getCurrentCountry()?.format || "99-99-99-99";
  };

  const formatPhoneNumber = (value: string, format: string): string => {
    const digits = value.replace(/\D/g, "");
    let formatted = "";
    let digitIndex = 0;

    for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
      if (format[i] === "9") {
        formatted += digits[digitIndex++];
      } else {
        formatted += format[i];
      }
    }

    return formatted;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="contact-form-group">
          <label htmlFor={id} className="form-label">
            {label} {isRequired && <span className="required">*</span>}
          </label>
          <div
            className={`phone-input-container ${fieldState.error ? "error" : ""}`}
          >
            <div className="country-code-display">
              <span className="country-flag">{getCurrentFlag()}</span>
              <span className="country-code-arrow">▼</span>
              <span className="country-code-text">{selectedCountryCode}</span>
              <select
                value={selectedCountryCode}
                onChange={(e) => {
                  setSelectedCountryCode(e.target.value);

                  field.onChange("");
                }}
                className="country-code-select-hidden"
                aria-label="Country code"
              >
                {options.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.flag} {option.code} {option.label}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="tel"
              id={id}
              name={field.name}
              value={field.value as string}
              onBlur={field.onBlur}
              ref={field.ref}
              placeholder={getCurrentPlaceholder()}
              className="phone-number-input"
              aria-invalid={!!fieldState.error}
              aria-describedby={fieldState.error ? `${id}-error` : undefined}
              onChange={(e) => {
                const formatted = formatPhoneNumber(
                  e.target.value,
                  getCurrentPlaceholder(),
                );
                field.onChange(formatted);
              }}
              maxLength={getCurrentPlaceholder().length}
            />
          </div>
          {fieldState.error && (
            <span id={`${id}-error`} className="error-message" role="alert">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default PhoneInput;
