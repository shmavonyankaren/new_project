// import { useState } from "react";
// import { FocusEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


// type DatePickerTypes = {
// 	label: string,
// 	isRequired: boolean,
// 	id: string,
// 	selectedDate: Date | null,
// 	onChange: React.Dispatch<React.SetStateAction<Date | null>>,
// 	minDate?: Date,
// 	maxDate?: Date
// 	onBlur: (e: FocusEvent<HTMLInputElement>) => void;
// 	error?: boolean;
// 	helperText: string;
// 	ariaDescribedBy: string;
// 	name: string

// }

// const DatePickerComp = ({ name, label, isRequired, id, helperText selectedDate, onChange, minDate, maxDate, showError, onBlur, ariaDescribedBy, error }: DatePickerTypes) => {
// 	// const [selectedDate, setSelectedDate] = useState<Date | null>(null);

// 	return (<div className="contact-form-group">
// 		<label htmlFor={id} className="form-label">
// 			{label} {isRequired && <span className="required">*</span>}
// 		</label>
// 		<div id={id}>
// 			<DatePicker
// 				name={name}
// 				id={id}
// 				minDate={minDate}
// 				maxDate={maxDate}
// 				className="z-10000"
// 				selected={selectedDate}
// 				onChange={onChange}
// 				isClearable
// 				placeholderText={label}
// 				onBlur={onBlur}
// 				// aria-invalid={showError}
// 				aria-describedby={showError ? ariaDescribedBy : undefined}
// 			/>
// 		</div>
// 		{showError && (
// 			<span id={ariaDescribedBy} className="error-message" role="alert">
// 				{error}
// 			</span>
// 		)}
// 	</div>
// 	);
// };

// export default DatePickerComp


type DatePickerProps = {
	id: string,
	name: string,
	onChange: (date: Date | null) => void
	onBlur: (e: unknown) => void,
	error: boolean,
	errorText?: string,
	isRequired: boolean,
	label: string,
	ariaDescribedBy: string
	selected: Date
}

export default function DatePickerComp({ id, onChange, onBlur, name, error, errorText, isRequired, label, ariaDescribedBy, selected }: DatePickerProps) {
	return (
		<div className="contact-form-group">
			<label htmlFor={id} className="form-label">
				{label} {isRequired && <span className="required">*</span>}
			</label>
			<div id={id}>
				<DatePicker
					name={name}
					onBlur={onBlur}
					placeholderText={label}
					onChange={(onChange)}
					selected={selected}
				/>
			</div>
			{error && (
				<span id={ariaDescribedBy} className="error-message" role="alert">
					{errorText}
				</span>
			)}
		</div>
	)
}