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

export const personalDetailSchema = yup.object().shape({
  refinancePriority: yup
    .array()
    .min(1, 'At least one option must be selected')
    .required(),
  citizenship: yup.string().required('Please select any option.'),
  visaSubClass: requiredIfPR(yup.string(), 'Visa sub class is required.'),
  visaExpiryDate: requiredIfPR(yup.string(), 'Visa expire date is required.'),

  // This is test because I dont see tje permanent Resident field in the form design
  // permanentResident: yup.boolean().required("Please select any option."),

  country: yup.string().required('Please select any option.'),
  currentResidentalStatus: yup.string().required('Please select any option.'),
  residentalOtherSpecification: yup.string().when(['residentialStatus '], {
    is: (residentialStatus: string) => residentialStatus === 'other',
    then: (schema) => schema.required('Please provide more details'),
    otherwise: (schema) => schema.notRequired(),
  }),
  maritalStatus: yup.string().required('Please select any option.'),
  dependentChildren: requiredIfMarried(yup.boolean(), 'Please select option.'),
  numberOfDependents: yup.number().when(['dependentChildren'], {
    is: (dependentChildren: boolean) => dependentChildren === true,
    then: (schema) =>
      schema.required('Number of dependent children is required'),
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

export const personalDetailLabelMapper = {
  refinancePriority: 'What are your refinance priorities?',
  citizenship: 'What’s your citizenship?',
  country: 'Which country do you currently reside in?',
  permanentResident: 'Are you a Permanent Resident(PR) of this country?',
  currentResidentalStatus: 'What’s your current residential status?',
  maritalStatus: 'What is your marital status?',
  dependentChildren: 'Do you have any dependent children?',
};
