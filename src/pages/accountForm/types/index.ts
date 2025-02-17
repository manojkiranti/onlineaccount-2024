import * as yup from "yup";

import { accountSignUpSchema } from "../schema/AccountSignUpSchema";
import { documentVerificationSchema } from "../schema/DocumentVerificationSchema";
import { addressSchema } from "../schema/AddressSchema";
import { occupationSchema } from "../schema/OccupationSchema";
import { declarationSchema } from "../schema/DeclarationSchema";
export type AccountSignUpType = yup.InferType<typeof accountSignUpSchema>;
export type DocumentVerificationType = yup.InferType<typeof documentVerificationSchema>;
export type AddressType = yup.InferType<typeof addressSchema>;
export type OccupationType = yup.InferType<typeof occupationSchema>;
export type DeclarationType = yup.InferType<typeof declarationSchema>;