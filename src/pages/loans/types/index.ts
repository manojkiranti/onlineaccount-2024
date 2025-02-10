import * as yup from 'yup';
import  { loanSchema } from '../schema';

export type LoanFormType = yup.InferType<typeof loanSchema>;