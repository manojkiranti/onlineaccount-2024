import {
  IncomeDetailFormType,
  PersonalDetailFormType,
  PropertyDetailFormType,
  PurchaseDetailFormType,
} from '../routes/Purchase/types';

export type PurchaseSteps =
  | 'purchase_detail'
  | 'personal_detail'
  | 'property_detail'
  | 'income_detail';

export type StepFormPayload<T, D> = {
  step: T;
  application_id?: string;
  data: D;
};

export type PurchaseRequestPayload = StepFormPayload<
  PurchaseSteps,
  PurchaseDetailFormType
>;
export type PersonalDetailPayload = StepFormPayload<
  PurchaseSteps,
  PersonalDetailFormType
>;
export type PropertyDetailPayload = StepFormPayload<
  PurchaseSteps,
  PropertyDetailFormType
>;
export type IncomeDetailPayload = StepFormPayload<
  PurchaseSteps,
  IncomeDetailFormType
>;

export type StepFormResponse = {
  created_at: string;
  step: PurchaseSteps;
  updated_at: string;
  data:
    | PurchaseDetailFormType
    | PersonalDetailFormType
    | PropertyDetailFormType
    | IncomeDetailFormType;
};

export type StepFromResponse = {
  id: number;
  status: string;
  current_step: string;
  created_at: Date;
  updated_at: Date;
};
