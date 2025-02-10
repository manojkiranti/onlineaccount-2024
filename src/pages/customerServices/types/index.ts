import * as yup from 'yup';
import { balanceCertificateSchema, blockAccountSchema, chequeRequestSchema, chequeStopPaymentSchema, disputeClaimSchema, fixedDepositSchema, lockerFormSchema } from '../schema';

export type FixedDepositType = yup.InferType<typeof fixedDepositSchema>;
export type DisputeClaimType = yup.InferType<typeof disputeClaimSchema>;
export type BlockAccountType = yup.InferType<typeof blockAccountSchema>;
export type ChequeRequestType = yup.InferType<typeof chequeRequestSchema>;
export type ChequeStopPaymentType = yup.InferType<typeof chequeStopPaymentSchema>;
export type BalanceCertificateFormType = yup.InferType<typeof balanceCertificateSchema>;
export type LockerRequestFormType = yup.InferType<typeof lockerFormSchema>;