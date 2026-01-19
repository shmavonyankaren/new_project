import { useState, ChangeEvent, FocusEvent, FormEvent } from "react";

type FormValues = Record<string, string>;
type ValidationRules = Record<string, (value: string) => string | undefined>;
type FormErrors = Record<string, string>;
type TouchedFields = Record<string, boolean>;

const useFormValidation = <T extends FormValues>(
  initialValues: T,
  validationRules: Partial<ValidationRules>,
) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<FormErrors>>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    const rule = validationRules[name];
    return rule ? rule(value) : undefined;
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit =
    (onSubmit: (data: T) => void) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitted(true);

      const allTouched: TouchedFields = {};
      Object.keys(formData).forEach((key) => {
        allTouched[key] = true;
      });
      setTouched(allTouched);

      const newErrors = validateForm();
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        onSubmit(formData);
      }
    };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  };

  const shouldShowError = (fieldName: string) => {
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