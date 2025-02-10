import * as yup from 'yup';

import { personalDetailSchema } from '../schema/personalDetailSchema';
import { incomeDetailSchema } from '../schema/incomeDetailSchema';
import { propertyDetailSchema } from '../schema/propertyDetailSchema';

export type PersonalDetailFormType = yup.InferType<typeof personalDetailSchema>;
export type IncomeDetailFormType = yup.InferType<typeof incomeDetailSchema>;
export type PropertyDetailFormType = yup.InferType<typeof propertyDetailSchema>;
