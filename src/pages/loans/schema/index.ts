import * as yup from 'yup';

export const loanSchema = yup.object().shape({
    accountNumber: yup
    .string()
    .required('Account number is required.'),
  phone: yup.string().required('Mobile number is required.'),
  accountName: yup.string().required('Account name is required.'),
  email: yup.string().email().required('Email is required.'),
  loanType: yup.string().required('Please select a loan type'),
  loanAmount: yup.number().required('Loan amount is required.'),
  paybackPeriod: yup.number().required('Payback period is required')
});