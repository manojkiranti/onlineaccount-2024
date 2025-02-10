import * as yup from 'yup';

export const lodgeReturnApplicationSchema = yup.object().shape({
  australianTaxFileNumber: yup
    .string()
    .required('Please write the tax file number.'),
  income: yup.array().required('Please select any option.'),
  jointlyOwnedProperties: yup.boolean().required('Please select any option.'),
  numberOfRentalProperties: yup.number().required('Please select any option.'),
  dateOfBirth: yup.string().required('Please select any option.'),
});
