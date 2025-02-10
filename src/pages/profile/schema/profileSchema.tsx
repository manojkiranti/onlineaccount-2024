import * as yup from 'yup';

export const profileSchema = yup.object().shape({
  fullname: yup.string().required('Full Name is required'),
  phone: yup.string().required('Phone number is required'),
  countryCode: yup.string().required('Country is required'),
  email: yup.string().email('Invalid email'),
  tfn_number: yup.string(),
});
