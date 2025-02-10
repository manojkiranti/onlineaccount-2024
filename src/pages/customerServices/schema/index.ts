import * as yup from 'yup';

export const fixedDepositSchema = yup.object().shape({
  accountNumber: yup
    .string()
    .required('Account number is required.'),
  accountName: yup.string().required('Account name is required'),
  phone: yup.string().required('Mobile number is required.'),
  email: yup.string().email().required('Email is required.'),
  depositAmount: yup.number().required('Depost amount is required.'),
  tenureMonths: yup.number().required('Tenure in month is required.'),
  interestRate: yup.string().required('Interest rate is required.'),
  applyingFrom: yup.string().required('Applying from is required.')
});

export const disputeClaimSchema = yup.object().shape({
  disputeType: yup.string().required('Dispute type is required'),
  accountNumber: yup.string().required('Account number is required'),
  accountName: yup.string().required('Account name is required'),
  transactionDate: yup.string().required('Transaction date is required'),
  disputeAmount: yup.number().required('Dispute amount is required'),
  transactionBankMerchant: yup.string().required('Transaction bank is required'),
  transactionLocation: yup.string().required('Transaction location is required'),
  phone: yup.string().required('Contact number is required'),
  email: yup.string().email().required("Email address is required")
});

export const blockAccountSchema = yup.object().shape({
  accountNumber: yup
    .string()
    .required('Account number is required.'),
  accountName: yup.string().required('Account name is required.'),
  phone: yup.string().required('Mobile number is required.'),
  email: yup.string().email().required('Email is required.'),
  remarks: yup.string().required('Remarks is required.')
});


export const chequeRequestSchema = yup.object().shape({
  accountNumber: yup
    .string()
    .required('Account number is required.'),
  accountName: yup.string().required('Account name is required.'),
  phone: yup.string().required('Mobile number is required.'),
  email: yup.string().email().required('Email is required.'),
  noOfLeaves: yup.number().required('Remarks is required.'),
  branch: yup.string().required('Branch is required.'),
  isCollectorDifferent: yup.string().required('Please select yes or no.'),
});


export const chequeStopPaymentSchema = yup.object().shape({
  accountNumber: yup
    .string()
    .required('Account number is required.'),
  accountName: yup.string().required('Account name is required.'),
  phone: yup.string().required('Mobile number is required.'),
  reason: yup.string().required('Reason to stop cheque payment is required.'),
  amount: yup.number().required('Amount is required.'),
  chequeNumber: yup.string().required('Cheque number is required.'),
});

export const balanceCertificateSchema = yup.object().shape({
  accountNumber: yup
    .string()
    .required('Account number is required.'),
  accountName: yup.string().required('Account name is required.'),
  phone: yup.string().required('Mobile number is required.'),
  branch: yup.string().required('Branch is required.'),
  currency: yup.string().required('Currency is required.'),
  date: yup.string().required('Date is required.'),
  email: yup.string().email().required('Email is required.'),
});

export const lockerFormSchema = yup.object().shape({
  accountNumber: yup
    .string()
    .required('Account number is required.'),
  accountName: yup.string().required('Account name is required.'),
  phone: yup.string().required('Mobile number is required.'),
  branch: yup.string().required('Branch is required.')
});