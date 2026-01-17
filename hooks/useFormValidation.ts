import { useState, ChangeEvent, FocusEvent, FormEvent } from "react";

// Define the return type explicitly for better type inference
interface UseFormValidationReturn<T extends Record<string, string>> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  errors: Partial<Record<keyof T, string>>;
  touched: Record<keyof T, boolean>;
  isSubmitted: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (onSubmit: (data: T) => void) => (e: FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
  shouldShowError: (fieldName: keyof T) => boolean;
  validateField: (name: keyof T, value: string) => string | undefined;
}

const useFormValidation = <T extends Record<string, string>>(
  initialValues: T,
  validationRules: Partial<Record<keyof T, (value: string) => string | undefined>>
): UseFormValidationReturn<T> => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  // More type-safe initialization of touched state
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(() => {
    const initialTouched = {} as Record<keyof T, boolean>;
    (Object.keys(initialValues) as Array<keyof T>).forEach((key) => {
      initialTouched[key] = false;
    });
    return initialTouched;
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: keyof T, value: string): string | undefined => {
    const rule = validationRules[name];
    if (rule) {
      return rule(value);
    }
    return undefined;
  };

  const validateForm = (): Partial<Record<keyof T, string>> => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    (Object.keys(formData) as Array<keyof T>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    const fieldName = name as keyof T;

    if (!(fieldName in formData)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    const fieldName = name as keyof T;

    if (!(fieldName in formData)) {
      return;
    }

    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    const error = validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const handleSubmit = (onSubmit: (data: T) => void) => (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsSubmitted(true);

    const allTouched = {} as Record<keyof T, boolean>;
    (Object.keys(formData) as Array<keyof T>).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const resetForm = (): void => {
    setFormData(initialValues);
    setErrors({});

    const resetTouched = {} as Record<keyof T, boolean>;
    (Object.keys(initialValues) as Array<keyof T>).forEach((key) => {
      resetTouched[key] = false;
    });
    setTouched(resetTouched);

    setIsSubmitted(false);
  };
  const shouldShowError = (fieldName: keyof T): boolean => {
    return (touched[fieldName] || isSubmitted) && !!errors[fieldName];
  };

  return {
    formData,
    setFormData,
    errors,
    touched,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    shouldShowError,
    validateField,
  };
};

export default useFormValidation;