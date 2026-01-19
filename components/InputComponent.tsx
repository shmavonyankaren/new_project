"use client";

import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

type InputComponentProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  isRequired?: boolean;
  maxLength?: number;
  isPasswordField?: boolean;
};

const InputComponent = <T extends FieldValues>({
  control,
  name,
  id,
  label,
  type = "text",
  placeholder,
  isRequired = false,
  maxLength,
  isPasswordField = false,
}: InputComponentProps<T>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = isPasswordField
    ? isPasswordVisible
      ? "text"
      : "password"
    : type;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="contact-form-group">
          <label htmlFor={id} className="form-label">
            {label} {isRequired && <span className="required">*</span>}
          </label>
          <div className="input-wrapper">
            <input
              id={id}
              type={inputType}
              name={field.name}
              value={field.value as string}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
              placeholder={placeholder || label}
              maxLength={maxLength}
              className={`form-input ${fieldState.error ? "error" : ""}`}
              aria-invalid={!!fieldState.error}
              aria-describedby={fieldState.error ? `${id}-error` : undefined}
            />
            {isPasswordField && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className="togglePassword"
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
              >
                {isPasswordVisible ? (
                  <IoEyeSharp size={24} />
                ) : (
                  <FaEyeSlash size={24} />
                )}
              </button>
            )}
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

export default InputComponent;
