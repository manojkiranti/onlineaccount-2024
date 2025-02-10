import {
  IncomeDetailFormType,
  PersonalDetailFormType,
  PropertyDetailFormType,
} from '../routes/Refinance/types';

export type RefinanceSteps =
  | 'personal_detail'
  | 'property_detail'
  | 'income_detail';

export type StepFormPayload<T, D> = {
  step: T;
  application_id?: string;
  data: D;
};

// * Refinance Form Steps
export type PropertyDetailPayload = StepFormPayload<
  RefinanceSteps,
  PropertyDetailFormType
>;
export type PersonalDetailPayload = StepFormPayload<
  RefinanceSteps,
  PersonalDetailFormType
>;
export type IncomeDetailPayload = StepFormPayload<
  RefinanceSteps,
  IncomeDetailFormType
>;

export type StepFormResponse = {
  created_at: string;
  step: RefinanceSteps;
  updated_at: string;
  data: PersonalDetailFormType | PropertyDetailFormType | IncomeDetailFormType;
};

export type StepFromResponse = {
  id: number;
  status: string;
  current_step: string;
  created_at: Date;
  updated_at: Date;
};
