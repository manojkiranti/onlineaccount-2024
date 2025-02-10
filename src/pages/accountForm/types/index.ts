import * as yup from "yup";

import { accountSignUpSchema } from "../schema/AccountSignUpSchema";
import { documentVerificationSchema } from "../schema/DocumentVerificationSchema";
import { addressEmploymentSchema } from "../schema";
export type AccountSignUpType = yup.InferType<typeof accountSignUpSchema>;
export type DocumentVerificationType = yup.InferType<typeof documentVerificationSchema>;
export type AddressEmploymentType = yup.InferType<typeof addressEmploymentSchema>;