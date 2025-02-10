import * as yup from 'yup';

export const newDebitCardSchema = yup.object().shape({
  accountNumber: yup
    .string()
    .required('Account number is required.'),
  phone: yup.string().required('Mobile number is required.'),
  accountName: yup.string().required('Account name is required.'),
  branch: yup.string().required('Branch is required.'),
  email: yup.string().email().required('Email is required.'),
  address: yup.string().required("Address is required."),
});

export const repinDebitCardSchema = yup.object().shape({
  accountNumber: yup
    .string()
    .required('Account number is required.'),
    phone: yup.string().required('Mobile number is required.'),
  accountName: yup.string().required('Account name is required.'),
  branch: yup.string().required('Branch is required.'),
  pinOption: yup.string().required('Pin Option is required.')
});

export const cardBlockchema = yup.object().shape({
  accountNumber: yup
    .string()
    .required('Account number is required.'),
    phone: yup.string().required('Mobile number is required.'),
  accountName: yup.string().required('Account name is required.'),
  blockType: yup.string().required('Branch is required.'),
  blockReason: yup.string().required('Pin Option is required.')
});

export const cardUnblockchema = yup.object().shape({
  accountNumber: yup
    .string()
    .required('Account number is required.'),
    phone: yup.string().required('Mobile number is required.'),
  accountName: yup.string().required('Account name is required.'),
  unblockReason: yup.string().required('Pin Option is required.')
});