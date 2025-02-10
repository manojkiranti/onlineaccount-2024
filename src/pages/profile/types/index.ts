import * as yup from 'yup';
import { profileAppSchema } from '../schema';
export interface Enable2faResponse {
  qr_code: string;
  secret: string;
  messages: string;
  two_factor_enabled: boolean;
}
export type ProfileAppFormType = yup.InferType<typeof profileAppSchema>;
