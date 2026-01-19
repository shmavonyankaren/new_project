export type LanguageOptionType = {
  id: number;
  name: string;
};

export type FrameListItemType = {
  id: number;
  logoPath: string;
  name: string;
  description: string;
};

export type CounryCodeOptionsType = {
  code: string;
  label: string;
  flag: string;
  length: number;
  format: string;
};

export type SignUpInputs = {
  name: string;
  email: string;
  phoneNumber: string;
  startDate: Date;
  endDate: Date;
  password: string;
  repeatPassword: string;
};

export type SignInInputs = {
  email: string;
  password: string;
};

export type ForgotPasswordInputs = {
  email: string;
};

export type ResetPasswordInputs = {
  password: string;
  repeatPassword: string;
};
