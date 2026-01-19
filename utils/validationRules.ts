const countryCodeOptions = [
  {
    code: "+374",
    label: "Armenia",
    flag: "🇦🇲",
    length: 8,
    format: "99-99-99-99",
  },
  {
    code: "+995",
    label: "Georgia",
    flag: "🇬🇪",
    length: 9,
    format: "999-99-99-99",
  },
  {
    code: "+1",
    label: "USA",
    flag: "🇺🇸",
    length: 10,
    format: "(999) 999-9999",
  },
];

const validatePhoneNumber = (
  value: string,
  selectedCountryCode: string,
): string | undefined => {
  if (!value.trim()) {
    return "Phone number is required";
  }

  const digitsOnly = value.replace(/\D/g, "");
  const country = countryCodeOptions.find(
    (opt) => opt.code === selectedCountryCode,
  );

  if (!country) {
    return "Invalid country code";
  }

  if (!/^[\d\s\-()]+$/.test(value)) {
    return "Please enter a valid phone number";
  }

  if (digitsOnly.length !== country.length) {
    return `Phone number must be exactly ${country.length} digits for ${country.label}`;
  }

  return undefined;
};

const createValidationRules = (
  selectedCountryCode: string | undefined,
  passwordValue?: string,
) => {
  const rules: {
    name: (value: string) => string | undefined;
    password: (value: string) => string | undefined;
    email: (value: string) => string | undefined;
    phoneNumber?: (value: string) => string | undefined;
    repeatPassword?: (value: string) => string | undefined;
  } = {
    name: (value: string): string | undefined => {
      if (!value.trim()) {
        return "Name is required";
      }
      if (value.trim().length < 2) {
        return "Name must be at least 2 characters";
      }
      if (!/^[a-zA-Z\s'-]+$/.test(value)) {
        return "Name can only contain letters, spaces, hyphens, and apostrophes";
      }
      return undefined;
    },

    password: (value: string): string | undefined => {
      if (!value.trim()) {
        return "Password is required";
      }

      const trimmedValue = value.trim();

      if (trimmedValue.length < 8) {
        return "Password must be at least 8 characters";
      }

      if (trimmedValue.length > 128) {
        return "Password must be less than 128 characters";
      }

      // Check for at least one uppercase letter
      if (!/[A-Z]/.test(trimmedValue)) {
        return "Password must contain at least one uppercase letter";
      }

      // Check for at least one lowercase letter
      if (!/[a-z]/.test(trimmedValue)) {
        return "Password must contain at least one lowercase letter";
      }

      // Check for at least one number
      if (!/\d/.test(trimmedValue)) {
        return "Password must contain at least one number";
      }

      // Check for at least one special character
      if (!/[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/? ~`]/.test(trimmedValue)) {
        return "Password must contain at least one special character (! @#$%^&* etc.)";
      }

      return undefined;
    },

    email: (value: string): string | undefined => {
      if (!value.trim()) {
        return "Email is required";
      }

      const trimmedValue = value.trim();

      if (trimmedValue.length < 3) {
        return "Email must be at least 3 characters";
      }

      if (trimmedValue.length > 254) {
        return "Email must be less than 254 characters";
      }

      // RFC 5322 Official Standard email regex (simplified version)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(trimmedValue)) {
        return "Please enter a valid email address";
      }

      // Additional validation:  check for valid characters
      const strictEmailRegex =
        /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!strictEmailRegex.test(trimmedValue)) {
        return "Email contains invalid characters";
      }

      // Check for consecutive dots
      if (/\.\. /.test(trimmedValue)) {
        return "Email cannot contain consecutive dots";
      }

      // Check if email starts or ends with dot
      const [localPart] = trimmedValue.split("@");
      if (localPart.startsWith(".") || localPart.endsWith(".")) {
        return "Email cannot start or end with a dot";
      }

      return undefined;
    },
  };

  if (selectedCountryCode) {
    rules.phoneNumber = (value: string): string | undefined => {
      return validatePhoneNumber(value, selectedCountryCode);
    };
  }

  // Add repeat password validation if password value is provided
  if (passwordValue !== undefined) {
    rules.repeatPassword = (value: string): string | undefined => {
      if (!value.trim()) {
        return "Please confirm your password";
      }

      if (value !== passwordValue) {
        return "Passwords do not match";
      }

      return undefined;
    };
  }

  return rules;
};

export { countryCodeOptions, createValidationRules, validatePhoneNumber };