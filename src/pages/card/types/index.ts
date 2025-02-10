import * as yup from 'yup';
import { cardBlockchema, cardUnblockchema, newDebitCardSchema, repinDebitCardSchema } from '../schema';

export type NewDebitCardFormType = yup.InferType<typeof newDebitCardSchema>;
export type RepinDebitCardType = yup.InferType<typeof repinDebitCardSchema>;
export type CardBlockType = yup.InferType<typeof cardBlockchema>;
export type CardUnblockType = yup.InferType<typeof cardUnblockchema>;