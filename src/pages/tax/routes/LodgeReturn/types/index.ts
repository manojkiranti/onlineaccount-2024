import * as yup from 'yup';
import { lodgeReturnApplicationSchema } from '../schema/lodgeReturnApplicationSchema';

export type LodgeReturnApplicationFormType = yup.InferType<
  typeof lodgeReturnApplicationSchema
>;
