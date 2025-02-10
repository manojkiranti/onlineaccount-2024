import * as yup from 'yup';

import { purchaseDetailSchema } from '../schema/purchaseDetailSchema';
import { personalDetailSchema } from '../schema/personalDetailSchema';
import { propertyDetailSchema } from '../schema/propertyDetailSchema';
import { incomeDetailSchema } from '../schema/incomeDetailSchema';

export type PurchaseDetailFormType = yup.InferType<typeof purchaseDetailSchema>;
export type PersonalDetailFormType = yup.InferType<typeof personalDetailSchema>;
export type PropertyDetailFormType = yup.InferType<typeof propertyDetailSchema>;
export type IncomeDetailFormType = yup.InferType<typeof incomeDetailSchema>;

export type PurchaseResponse = {
  id: number;
  status: string;
  current_step: string;
  created_at: Date;
  updated_at: Date;
};
