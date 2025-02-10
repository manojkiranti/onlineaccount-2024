import { RefObject } from 'react';
import { StepOneFormType } from '../components/Steps/StepOne';
import { StepTwoFormType } from '../components/Steps/StepTwo';
import { StepThreeFormType } from '../components/Steps/StepThree';
import { StepFourFormType } from '../components/Steps/StepFour';
import { StepFiveFormType } from '../components/Steps/StepFive';
import { StepFormPayload } from '@/pages/mortgage/types/Purchase';

export interface OnboardingFormProps<T> {
  handleFormSubmit: (data: T) => void;
  submitRef: RefObject<HTMLButtonElement>;
  savedData: T | null;
}

export interface OnboardingFormMethods<T> {
  triggerValidation: () => Promise<{ isValid: boolean; data?: T }>;
}
export type OnboardingFormType =
  | StepOneFormType
  | StepTwoFormType
  | StepThreeFormType
  | StepFourFormType
  | StepFiveFormType;
export type OnboardingFormData = StepOneFormType &
  StepTwoFormType &
  StepThreeFormType &
  StepFourFormType &
  StepFiveFormType;

export type VerifyEmailResponse = {
  message: string;
  password_reset_token: string;
  uid: string;
};

export type RegisterEmail = {
  email: string;
  mortgage_type: string;
  employment: string;
  citizenship: string;
};
export type OnboardingSteps = 'step_one' | 'step_six';

export type OnboardingPayload = StepFormPayload<
  OnboardingSteps,
  StepOneFormType
>;
export type RegisterEmailPayload = StepFormPayload<
  OnboardingSteps,
  RegisterEmail
>;

export type OnboardStepResponse = {
  step: OnboardingSteps;
  application_id: string;
};
