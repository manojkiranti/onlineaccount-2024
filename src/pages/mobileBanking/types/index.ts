import * as yup from 'yup';
import { mobankBlockSchema, mobankResetPinSchema, mobankUnblockSchema, newMobankRegisterSchema } from '../schema';

export type NewMobankRegisterType = yup.InferType<typeof newMobankRegisterSchema>;
export type MobankResetPinType = yup.InferType<typeof mobankResetPinSchema>;
export type MobankBlockType = yup.InferType<typeof mobankBlockSchema>;
export type MobankUnblockType = yup.InferType<typeof mobankUnblockSchema>;
