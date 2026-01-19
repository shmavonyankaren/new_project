"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
  id: string;
  name: string;
  onChange: (date: Date | null) => void;
  onBlur: () => void;
  error?: boolean;
  errorText?: string;
  isRequired?: boolean;
  label: string;
  selected: Date | null;
  minDate?: Date;
  maxDate?: Date;
  placeholderText?: string;
};

export default function DatePickerComp({
  id,
  onChange,
  onBlur,
  name,
  error,
  errorText,
  isRequired = false,
  label,
  selected,
  minDate,
  maxDate,
  placeholderText,
}: DatePickerProps) {
  return (
    <div className="contact-form-group">
      <label htmlFor={id} className="form-label">
        {label} {isRequired && <span className="required">*</span>}
      </label>
      <div className="date-picker-wrapper">
        <DatePicker
          id={id}
          name={name}
          selected={selected}
          onChange={(date: Date | null) => onChange(date)}
          onBlur={onBlur}
          placeholderText={placeholderText || label}
          minDate={minDate}
          maxDate={maxDate || new Date()}
          isClearable
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={50}
          dateFormat="dd/MM/yyyy"
          className={`form-input ${error ? "error" : ""}`}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete="off"
        />
      </div>
      {error && errorText && (
        <span id={`${id}-error`} className="error-message" role="alert">
          {errorText}
        </span>
      )}
    </div>
  );
}
