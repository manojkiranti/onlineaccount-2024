import * as yup from 'yup';
import  { bankGuraneeVerificationSchema } from '../schema';

export type BankGuranteeVerificationFormType = yup.InferType<typeof bankGuraneeVerificationSchema>;