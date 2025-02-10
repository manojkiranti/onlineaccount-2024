import * as yup from 'yup';
import { cashDepositSchema, chequeDepositSchema } from '../schema';

export type CashDepositType = yup.InferType<typeof cashDepositSchema>;
export type ChequeDepositType = yup.InferType<typeof chequeDepositSchema>;