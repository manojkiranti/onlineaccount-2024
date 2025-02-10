import * as yup from 'yup';

function requiredIfMarried<T extends yup.AnySchema>(
  schemaType: T,
  message: string,
): T {
  return schemaType.when(['maritalStatus '], {
    is: (maritalStatus: string) => maritalStatus !== 'single',
    then: (schema: T) => schema.required(message),
    otherwise: (schema: T) => schema.notRequired(),
  });
}

function requiredIfPR<T extends yup.AnySchema>(
  schemaType: T,
  message: string,
): T {
  return schemaType.when(['citizenship '], {
    is: (citizenship: string) =>
      citizenship === 'australian_pr_visa' ||
      citizenship === 'australian_tr_visa',
    then: (schema: T) => schema.required(message),
    otherwise: (schema: T) => schema.notRequired(),
  });
}

function requiredIfIncomeSource<T extends yup.AnySchema>(
  schemaType: T,
  incomeSources: string[],
  message: string,
): T {
  return schemaType.when('incomeSource', {
    is: (incomeSource: string) => incomeSources.includes(incomeSource),
    then: (schema: T) => schema.required(message),
    otherwise: (schema: T) => schema.notRequired(),
  });
}

export const profileAppSchema = yup.object().shape({
  maritalStatus: yup.string(),
  dependentChildren: requiredIfMarried(yup.boolean(), 'Please select option.'),
  numberOfDependents: yup.number().when(['dependentChildren'], {
    is: (dependentChildren: boolean) => dependentChildren === true,
    then: (schema) =>
      schema.required('Number of dependent children is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  citizenship: yup.string(),
  visaSubClass: requiredIfPR(yup.string(), 'Visa sub class is required.'),
  visaExpiryDate: requiredIfPR(yup.string(), 'Visa expire date is required.'),
  incomeSource: yup.string().required('Please select income source option.'),
  jobStartMonth: requiredIfIncomeSource(
    yup.string(),
    ['employee'],
    'Please select job start month.',
  ),
  jobStartYear: requiredIfIncomeSource(
    yup.string(),
    ['employee'],
    'Please select job start year.',
  ),
  occupation: requiredIfIncomeSource(
    yup.string(),
    ['employee'],
    'Occupation is required.',
  ),
  salaryCurrency: requiredIfIncomeSource(
    yup.string(),
    ['employee'],
    'Please select your salary currency.',
  ),
  baseSalary: requiredIfIncomeSource(
    yup.number(),
    ['employee'],
    'Please enter your base salary.',
  ),
  salaryFrequency: requiredIfIncomeSource(
    yup.string(),
    ['employee'],
    'Please select your salary frequency.',
  ),
  operationStartMonth: requiredIfIncomeSource(
    yup.string(),
    ['self_employed_company', 'self_employed_trader_or_contractor'],
    'Please select operation start month.',
  ),
  operationStartYear: requiredIfIncomeSource(
    yup.number(),
    ['self_employed_company', 'self_employed_trader_or_contractor'],
    'Please select operation start year.',
  ),
  industry: requiredIfIncomeSource(
    yup.string(),
    ['self_employed_company', 'self_employed_trader_or_contractor'],
    'Please select the industry.',
  ),

  companySalaryCurrency: requiredIfIncomeSource(
    yup.string(),
    ['self_employed_company', 'self_employed_trader_or_contractor'],
    'Please select company salary currency.',
  ),

  permanentResident: yup.boolean(),
  currentResidentalStatus: yup.string(),
  residentalOtherSpecification: yup.string().when(['residentialStatus '], {
    is: (residentialStatus: string) => residentialStatus === 'other',
    then: (schema) => schema.required('Please provide more details'),
    otherwise: (schema) => schema.notRequired(),
  }),

  rentExpense: yup.number().when(['currentResidentalStatus'], {
    is: (residentialStatus: string) => residentialStatus === 'renting',
    then: (schema) => schema.required('Please enter your rent'),
    otherwise: (schema) => schema.notRequired(),
  }),
  frequencyOfRent: yup.string().when(['currentResidentalStatus'], {
    is: (residentialStatus: string) => residentialStatus === 'renting',
    then: (schema) => schema.required('Please select your frequency of rent'),
    otherwise: (schema) => schema.notRequired(),
  }),
  isTheResidentialPlaceMortgaged: yup
    .boolean()
    .when(['currentResidentalStatus'], {
      is: (residentialStatus: string) => residentialStatus === 'live_own_place',
      then: (schema) => schema.required('Please select any option.'),
      otherwise: (schema) => schema.notRequired(),
    }),
});
