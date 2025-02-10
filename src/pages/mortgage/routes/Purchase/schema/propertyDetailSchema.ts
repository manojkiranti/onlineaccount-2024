import * as yup from 'yup';
const MAX_PROPERTIES = 6;

type PropertyFields = {
  [key: string]: yup.Schema<any>;
};

const propertyFields: PropertyFields = {};

for (let i = 1; i <= MAX_PROPERTIES; i++) {
  propertyFields[`ausPropertyLocation${i}`] = yup.string().when('ausProperty', {
    is: (ausPropertyValue: any) =>
      typeof ausPropertyValue === 'number' && ausPropertyValue >= i,
    then: (schema) => schema.required(`Please enter property location ${i}`),
    otherwise: (schema) => schema.notRequired(),
  });

  propertyFields[`ausPropertyValue${i}`] = yup
    .number()
    .typeError(`Property value ${i} must be a number`)
    .when('ausProperty', {
      is: (ausPropertyValue: any) =>
        typeof ausPropertyValue === 'number' && ausPropertyValue >= i,
      then: (schema) => schema.required(`Please enter property value ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });

  propertyFields[`ausPropertyOwner${i}`] = yup.string().when('ausProperty', {
    is: (ausPropertyValue: any) =>
      typeof ausPropertyValue === 'number' && ausPropertyValue >= i,
    then: (schema) => schema.required(`Please select owner ${i}`),
    otherwise: (schema) => schema.notRequired(),
  });

  propertyFields[`ausPropertyUse${i}`] = yup.string().when('ausProperty', {
    is: (ausPropertyValue: any) =>
      typeof ausPropertyValue === 'number' && ausPropertyValue >= i,
    then: (schema) => schema.required(`Please select property usage ${i}`),
    otherwise: (schema) => schema.notRequired(),
  });

  propertyFields[`isMortgageOnProperty${i}`] = yup
    .boolean()
    .when('ausProperty', {
      is: (ausPropertyValue: any) =>
        typeof ausPropertyValue === 'number' && ausPropertyValue >= i,
      then: (schema) => schema.required('Please confirm your mortgage'),
      otherwise: (schema) => schema.notRequired(),
    });

  propertyFields[`ausMortgageLoanLimit${i}`] = yup
    .number()
    .typeError(`Loan limit ${i} must be a number`)
    .when(`isMortgageOnProperty${i}`, {
      is: true,
      then: (schema) => schema.required(`Please enter loan limit ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });

  propertyFields[`ausMortgageLender${i}`] = yup
    .string()
    .when(`isMortgageOnProperty${i}`, {
      is: true,
      then: (schema) => schema.required(`Please select Lender`),
      otherwise: (schema) => schema.notRequired(),
    });

  propertyFields[`ausMortgageLoanTerm${i}`] = yup
    .number()
    .typeError(`Loan term ${i} must be a number`)
    .when(`isMortgageOnProperty${i}`, {
      is: true,
      then: (schema) => schema.required(`Loan term is required`),
      otherwise: (schema) => schema.notRequired(),
    });

  propertyFields[`ausMortgageInterest${i}`] = yup
    .number()
    .max(100, 'Interest rate cannot exceed 100')
    .typeError(`Interest rate ${i} must be a number`)
    .when(`isMortgageOnProperty${i}`, {
      is: true,
      then: (schema) => schema.required(`Interest rate is required`),
      otherwise: (schema) => schema.notRequired(),
    });

  propertyFields[`ausMortgageInterestType${i}`] = yup
    .string()
    .when(`isMortgageOnProperty${i}`, {
      is: true,
      then: (schema) => schema.required(`Interest rate type is required`),
      otherwise: (schema) => schema.notRequired(),
    });

  propertyFields[`ausPropertyRent${i}`] = yup
    .number()
    .when(`ausPropertyUse${i}`, {
      is: (ausPropertyValue: any, ausPropertyUseValue: any) =>
        typeof ausPropertyValue === 'number' &&
        ausPropertyValue >= i &&
        (ausPropertyUseValue === 'rented' ||
          ausPropertyUseValue === 'short_term_lease'),
      then: (schema) => schema.required(`Please enter rent ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });

  propertyFields[`ausPropertyRentFrequency${i}`] = yup
    .string()
    .when(['ausProperty', `ausPropertyUse${i}`], {
      is: (ausPropertyValue: any, ausPropertyUseValue: any) =>
        typeof ausPropertyValue === 'number' &&
        ausPropertyValue >= i &&
        (ausPropertyUseValue === 'rented' ||
          ausPropertyUseValue === 'short_term_lease'),
      then: (schema) => schema.required(`Please enter rent frequency ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });
}

type OverseasPropertyFields = {
  [key: string]: yup.Schema<any>;
};

const overseasPropertyFields: OverseasPropertyFields = {};

for (let i = 1; i <= MAX_PROPERTIES; i++) {
  overseasPropertyFields[`overseasPropertyLocation${i}`] = yup
    .string()
    .when('overseasProperty', {
      is: (overseasPropertyValue: any) =>
        typeof overseasPropertyValue === 'number' && overseasPropertyValue >= i,
      then: (schema) => schema.required(`Please enter property location ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });
  overseasPropertyFields[`overseasPropertyValue${i}`] = yup
    .number()
    .typeError(`Property value ${i} must be a number`)
    .when('overseasProperty', {
      is: (overseasPropertyValue: any) =>
        typeof overseasPropertyValue === 'number' && overseasPropertyValue >= i,
      then: (schema) => schema.required(`Please enter property value ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });

  overseasPropertyFields[`overseasPropertyOwner${i}`] = yup
    .string()
    .when('overseasProperty', {
      is: (overseasPropertyValue: any) =>
        typeof overseasPropertyValue === 'number' && overseasPropertyValue >= i,
      then: (schema) => schema.required(`Please select owner ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });

  overseasPropertyFields[`overseasPropertyUse${i}`] = yup
    .string()
    .when('overseasProperty', {
      is: (overseasPropertyValue: any) =>
        typeof overseasPropertyValue === 'number' && overseasPropertyValue >= i,
      then: (schema) => schema.required(`Please select property usage ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });

  overseasPropertyFields[`isMortgageOnOverseasProperty${i}`] = yup
    .boolean()
    .when('overseasProperty', {
      is: (overseasPropertyValue: any) =>
        typeof overseasPropertyValue === 'number' && overseasPropertyValue >= i,
      then: (schema) => schema.required('Please confirm your mortgage'),
      otherwise: (schema) => schema.notRequired(),
    });

  overseasPropertyFields[`overseasMortgageLoanLimit${i}`] = yup
    .number()
    .typeError(`Loan limit ${i} must be a number`)
    .when(`isMortgageOnOverseasProperty${i}`, {
      is: true,
      then: (schema) => schema.required(`Please enter loan limit ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });

  overseasPropertyFields[`overseasMortgageInterest${i}`] = yup
    .number()
    .max(100, 'Interest rate cannot exceed 100')
    .typeError(`Interest rate ${i} must be a number`)
    .when(`isMortgageOnOverseasProperty${i}`, {
      is: true,
      then: (schema) => schema.required(`Interest rate is required`),
      otherwise: (schema) => schema.notRequired(),
    });

  overseasPropertyFields[`overseasMortgageLoanTerm${i}`] = yup
    .number()
    .typeError(`Loan term ${i} must be a number`)
    .when(`isMortgageOnOverseasProperty${i}`, {
      is: true,
      then: (schema) => schema.required(`Loan term is required`),
      otherwise: (schema) => schema.notRequired(),
    });

  overseasPropertyFields[`overseasMortgageRepayment${i}`] = yup
    .number()
    .typeError(`Repayment sum ${i} must be a number`)
    .when(`isMortgageOnOverseasProperty${i}`, {
      is: true,
      then: (schema) =>
        schema.required(`Repayment on overseas mortgage is required`),
      otherwise: (schema) => schema.notRequired(),
    });

  overseasPropertyFields[`overseasPropertyRent${i}`] = yup
    .number()
    .when(`overseasPropertyUse${i}`, {
      is: (value: string) =>
        value === 'rented' ||
        value === 'short_term_lease' ||
        value === 'investment_property',
      then: (schema) => schema.required(`Please enter rent ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });

  overseasPropertyFields[`overseasPropertyRentFrequency${i}`] = yup
    .string()
    .when(`overseasPropertyUse${i}`, {
      is: (value: string) =>
        value === 'rented' ||
        value === 'short_term_lease' ||
        value === 'investment_property',
      then: (schema) => schema.required(`Please enter rent frequency ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });
}

export const propertyDetailSchema = yup.object().shape({
  maxPurchaseAmount: yup.number().required('Please enter your amount'),
  propertyLocation: yup.string().required('Please select property location'),
  maxDepositDownpayment: yup
    .number()
    .required('Please enter your maximum deposit down payment amount'),

  ausProperty: yup
    .number()
    .required('Please select your Australia property size'),
  ...propertyFields,

  useExistingAusProperty: yup
    .string()
    .required('Please select your preferred option'),

  overseasProperty: yup
    .number()
    .required('Please select your overseas property size'),
  ...overseasPropertyFields,
});

export const propertyDetailLabelMapper = {
  maxPurchaseAmount: 'Maximum purchase price for your new property',
  propertyLocation: 'Which state will this property be located?',
  maxDepositDownpayment: 'Maximum deposit available for downpayment',
  ausProperty: 'How many properties do you own in Australia?',
  ausPropertyDetail: 'Property location and valuation',

  useExistingAusProperty:
    'Would  you like to use equity from your existing Australian property(s) to assist with the new purchase?',
  overseasProperty: 'How many “Overseas” properties do you own?',
  overseasPropertyDetail: 'Property location and valuation',
};

export const refinancePropertyDetailSchema = yup.object().shape({
  ausProperty: yup
    .number()
    .required('Please select your Australia property size'),
  ...propertyFields,
  overseasProperty: yup
    .number()
    .required('Please select your overseas property size'),
  ...overseasPropertyFields,
  firstName: yup.string().required('Please enter your first name'),
  lastName: yup.string().required('Please enter your last name'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Please enter your email address'),
});
