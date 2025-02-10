import * as yup from 'yup';

export const newMobankRegisterSchema = yup.object().shape({
  accountNumber: yup
    .string()
    .required('Account number is required.'),
  phone: yup.string().required('Mobile number is required.'),
  accountName: yup.string().required('Account name is required.'),
  email: yup.string().email().required('Email is required.')
});

export const mobankResetPinSchema = yup.object().shape({
    accountNumber: yup
      .string()
      .required('Account number is required.'),
    phone: yup.string().required('Mobile number is required.'),
    accountName: yup.string().required('Account name is required.')
  });

  export const mobankBlockSchema = yup.object().shape({
    accountNumber: yup
      .string()
      .required('Account number is required.'),
    phone: yup.string().required('Mobile number is required.'),
    accountName: yup.string().required('Account name is required.')
  });

  export const mobankUnblockSchema = yup.object().shape({
    accountNumber: yup
      .string()
      .required('Account number is required.'),
    phone: yup.string().required('Mobile number is required.'),
    accountName: yup.string().required('Account name is required.')
  });