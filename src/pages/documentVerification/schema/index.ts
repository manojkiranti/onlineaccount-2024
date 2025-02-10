import * as yup from 'yup';

export const bankGuraneeVerificationSchema = yup.object().shape({
  accountNumber: yup
    .string(),
  referenceNumber: yup
    .string()
    .required('Reference number is required.'),
  guranteeAmount: yup.number().required('Gurantee amount is required.'),
  phone: yup.string().required('Phone number is required.')
});