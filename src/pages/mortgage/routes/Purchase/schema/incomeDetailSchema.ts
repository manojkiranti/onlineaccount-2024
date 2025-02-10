import * as yup from 'yup';

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

const MAX_PROPERTIES = 6;

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

function requiredIfCondition<T extends yup.AnySchema>(
  schemaType: T,
  fields: string[],
  condition: (...values: any[]) => boolean,
  message: string,
): T {
  return schemaType.when(fields, {
    is: (...fieldValues: any[]) => condition(...fieldValues),
    then: (schema: T) => schema.required(message),
    otherwise: (schema: T) => schema.notRequired(),
  });
}

function requiredIfCoapplicantIncomeSource<T extends yup.AnySchema>(
  schemaType: T,
  incomeSources: string[],
  message: string,
): T {
  return schemaType.when('coapplicantIncomeSource', {
    is: (incomeSource: string) => incomeSources.includes(incomeSource),
    then: (schema: T) => schema.required(message),
    otherwise: (schema: T) => schema.notRequired(),
  });
}

type NonPropertyFields = {
  [key: string]: yup.Schema<any>;
};

const nonPropertyFields: NonPropertyFields = {};

for (let i = 1; i <= MAX_PROPERTIES; i++) {
  nonPropertyFields[`nonPropertyLoanType${i}`] = yup
    .string()
    .when('nonPropertyLoan', {
      is: (nonPropertyLoan: any) =>
        typeof nonPropertyLoan === 'number' && nonPropertyLoan >= i,
      then: (schema) =>
        schema.required(`Please select non property loan type ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });

  nonPropertyFields[`nonPropertyLoanCurrency${i}`] = yup
    .string()
    .when('nonPropertyLoan', {
      is: (nonPropertyLoan: any) =>
        typeof nonPropertyLoan === 'number' && nonPropertyLoan >= i,
      then: (schema) =>
        schema.required(`Please select non property loan currency ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });

  nonPropertyFields[`nonPropertyLoanBalance${i}`] = yup
    .number()
    .typeError(`Non Property ${i}      loan balance  must be a number`)
    .when('nonPropertyLoan', {
      is: (nonPropertyLoan: any) =>
        typeof nonPropertyLoan === 'number' && nonPropertyLoan >= i,
      then: (schema) =>
        schema.required(`Please enter non property loan balance ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });

  nonPropertyFields[`nonPropertyLoanRepaymentTerm${i}`] = yup
    .number()
    .typeError(`Non Property ${i} loan repayment  must be a number`)
    .when('nonPropertyLoan', {
      is: (nonPropertyLoan: any) =>
        typeof nonPropertyLoan === 'number' && nonPropertyLoan >= i,
      then: (schema) =>
        schema.required(`Please enter non property repayment loan term ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });

  nonPropertyFields[`nonPropertyLoanRepaymentSum${i}`] = yup
    .number()
    .typeError(`Non Property ${i} loan repayment  must be a number`)
    .when('nonPropertyLoan', {
      is: (nonPropertyLoan: any) =>
        typeof nonPropertyLoan === 'number' && nonPropertyLoan >= i,
      then: (schema) =>
        schema.required(`Please enter non property repayment loan sum  ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });

  nonPropertyFields[`nonPropertyLoanRepaymentFrequency${i}`] = yup
    .string()
    .when('nonPropertyLoan', {
      is: (nonPropertyLoan: any) =>
        typeof nonPropertyLoan === 'number' && nonPropertyLoan >= i,
      then: (schema) =>
        schema.required(`Please select non property repayment frequency  ${i}`),
      otherwise: (schema) => schema.notRequired(),
    });
}

type CoapplicantNonPropertyFields = {
  [key: string]: yup.Schema<any>;
};

const coapplicantNonPropertyFields: CoapplicantNonPropertyFields = {};

for (let i = 1; i <= MAX_PROPERTIES; i++) {
  coapplicantNonPropertyFields[`coapplicantNonPropertyLoanType${i}`] = yup
    .string()
    .when('coapplicantNonPropertyLoan', {
      is: (coapplicantNonPropertyLoan: any) =>
        typeof coapplicantNonPropertyLoan === 'number' &&
        coapplicantNonPropertyLoan >= i,
      then: (schema) =>
        schema.required(
          `Please select co-applicant non-property loan type ${i}`,
        ),
      otherwise: (schema) => schema.notRequired(),
    });

  coapplicantNonPropertyFields[`coapplicantNonPropertyLoanCurrency${i}`] = yup
    .string()
    .when('coapplicantNonPropertyLoan', {
      is: (coapplicantNonPropertyLoan: any) =>
        typeof coapplicantNonPropertyLoan === 'number' &&
        coapplicantNonPropertyLoan >= i,
      then: (schema) =>
        schema.required(
          `Please select co-applicant non-property loan currency ${i}`,
        ),
      otherwise: (schema) => schema.notRequired(),
    });

  coapplicantNonPropertyFields[`coapplicantNonPropertyLoanBalance${i}`] = yup
    .number()
    .typeError(`Co-applicant Non-Property ${i} loan balance must be a number`)
    .when('coapplicantNonPropertyLoan', {
      is: (coapplicantNonPropertyLoan: any) =>
        typeof coapplicantNonPropertyLoan === 'number' &&
        coapplicantNonPropertyLoan >= i,
      then: (schema) =>
        schema.required(
          `Please enter co-applicant non-property loan balance ${i}`,
        ),
      otherwise: (schema) => schema.notRequired(),
    });

  coapplicantNonPropertyFields[`coapplicantNonPropertyLoanRepaymentTerm${i}`] =
    yup
      .number()
      .typeError(
        `Co-applicant Non-Property ${i} loan repayment term must be a number`,
      )
      .when('coapplicantNonPropertyLoan', {
        is: (coapplicantNonPropertyLoan: any) =>
          typeof coapplicantNonPropertyLoan === 'number' &&
          coapplicantNonPropertyLoan >= i,
        then: (schema) =>
          schema.required(
            `Please enter co-applicant non-property loan repayment term ${i}`,
          ),
        otherwise: (schema) => schema.notRequired(),
      });

  coapplicantNonPropertyFields[`coapplicantNonPropertyLoanRepaymentSum${i}`] =
    yup
      .number()
      .typeError(
        `Co-applicant Non-Property ${i} loan repayment sum must be a number`,
      )
      .when('coapplicantNonPropertyLoan', {
        is: (coapplicantNonPropertyLoan: any) =>
          typeof coapplicantNonPropertyLoan === 'number' &&
          coapplicantNonPropertyLoan >= i,
        then: (schema) =>
          schema.required(
            `Please enter co-applicant non-property loan repayment sum ${i}`,
          ),
        otherwise: (schema) => schema.notRequired(),
      });

  coapplicantNonPropertyFields[
    `coapplicantNonPropertyLoanRepaymentFrequency${i}`
  ] = yup.string().when('coapplicantNonPropertyLoan', {
    is: (coapplicantNonPropertyLoan: any) =>
      typeof coapplicantNonPropertyLoan === 'number' &&
      coapplicantNonPropertyLoan >= i,
    then: (schema) =>
      schema.required(
        `Please select co-applicant non-property loan repayment frequency ${i}`,
      ),
    otherwise: (schema) => schema.notRequired(),
  });
}

export const incomeDetailSchema = yup.object().shape({
  incomeSource: yup.string().required('Please select income source option.'),
  nonPropertyLoan: yup
    .number()
    .required('please verify your non property loan'),
  whereDidYouHearAboutUs: yup
    .string()
    .required('Please select where did you hear about us option.'),
  creditCardCurrency: yup
    .string()
    .required('Please verify your credit card currency'),
  creditCardLimit: yup.number().required('Credit card limit is required'),
  userMessage: yup.string(),
  taxBenefitAwareness: yup.string().required('Please select any option.'),

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
  companySalaryCurrency: requiredIfIncomeSource(
    yup.string(),
    ['self_employed_company', 'self_employed_trader_or_contractor'],
    'Please select your company salary currency.',
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
  receiveAllowanceIncome: requiredIfIncomeSource(
    yup.boolean(),
    ['employee'],
    'Please verify your allowance income.',
  ),
  receiveCommissionIncome: requiredIfIncomeSource(
    yup.boolean(),
    ['employee'],
    'Please verify your commission income.',
  ),
  receiveAnnualCashBonus: requiredIfIncomeSource(
    yup.boolean(),
    ['employee'],
    'Please verify your annual cash bonus.',
  ),
  receiveStockUnit: requiredIfIncomeSource(
    yup.boolean(),
    ['employee'],
    'Please verify your stock units.',
  ),

  industry: requiredIfIncomeSource(
    yup.string(),
    ['self_employed_company', 'self_employed_trader_or_contractor'],
    'Please select your industry.',
  ),
  operationStartMonth: requiredIfIncomeSource(
    yup.string(),
    ['self_employed_company', 'self_employed_trader_or_contractor'],
    'Please select operation start month.',
  ),
  operationStartYear: requiredIfIncomeSource(
    yup.string(),
    ['self_employed_company', 'self_employed_trader_or_contractor'],
    'Please select operation start year.',
  ),
  thisYearPersonalNetIncomeAfterTaxes: requiredIfIncomeSource(
    yup.number(),
    ['self_employed_company', 'self_employed_trader_or_contractor'],
    'Please enter your personal net income after taxes.',
  ),
  lastYearPersonalNetIncomeAfterTaxes: requiredIfIncomeSource(
    yup.number(),
    ['self_employed_company', 'self_employed_trader_or_contractor'],
    'Please enter your personal net income after taxes.',
  ),

  ownershipPercentage: requiredIfIncomeSource(
    yup.number(),
    ['self_employed_company'],
    'Please enter ownership percentage.',
  ),
  thisYearCompanyNetIncomeAfterTaxes: requiredIfIncomeSource(
    yup.number(),
    ['self_employed_company'],
    'Please enter your company net income after taxes.',
  ),
  lastYearCompanyNetIncomeAfterTaxes: requiredIfIncomeSource(
    yup.number(),
    ['self_employed_company'],
    'Please enter your company net income after taxes.',
  ),
  allowanceIncome: requiredIfCondition(
    yup.number().typeError('Allowance income must be a number'),
    ['incomeSource', 'receiveAllowanceIncome'],
    (incomeSource, receiveAllowanceIncome) =>
      incomeSource === 'employee' && receiveAllowanceIncome === true,
    'Please enter your allowance income.',
  ),
  allowanceFrequency: requiredIfCondition(
    yup.string(),
    ['incomeSource', 'receiveAllowanceIncome'],
    (incomeSource, receiveAllowanceIncome) =>
      incomeSource === 'employee' && receiveAllowanceIncome === true,
    'Please select your allowance frequency.',
  ),
  // allowanceIncome: yup.number().when('receiveAllowanceIncome', {
  //   is: true,
  //   then: (schema) => schema.required('Please enter your allowance income'),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  // typeOfAllowanceIncome: requiredIfIncomeSource(
  //   yup.array(),
  //   ['self_employed_company'],
  //   'Please select the types of allowance income.',
  // ),
  typeOfAllowanceIncome: requiredIfCondition(
    yup.array(),
    ['incomeSource', 'receiveAllowanceIncome'],
    (incomeSource, receiveAllowanceIncome) =>
      incomeSource === 'self_employed_company' &&
      receiveAllowanceIncome === true,
    'Please enter the allowance income type.',
  ),
  commissionIncome: yup.number().when('receiveCommissionIncome', {
    is: true,
    then: (schema) => schema.required('Please enter your commission income'),
    otherwise: (schema) => schema.notRequired(),
  }),
  commissionFrequency: yup.string().when('receiveCommissionIncome', {
    is: true,
    then: (schema) =>
      schema.required('Please select your commission frequency'),
    otherwise: (schema) => schema.notRequired(),
  }),
  commissionYears: yup.string().when('receiveCommissionIncome', {
    is: true,
    then: (schema) => schema.required('Please enter your commission years'),
    otherwise: (schema) => schema.notRequired(),
  }),
  lastYearAnnualCashBonus: yup.number().when('receiveAnnualCashBonus', {
    is: true,
    then: (schema) => schema.required('Please enter your annual cash bonus'),
    otherwise: (schema) => schema.notRequired(),
  }),
  thisYearAnnualCashBonus: yup.number().when('receiveAnnualCashBonus', {
    is: true,
    then: (schema) => schema.required('Please enter your annual cash bonus'),
    otherwise: (schema) => schema.notRequired(),
  }),
  lastYearStockOptions: yup.number().when('receiveStockUnit', {
    is: true,
    then: (schema) => schema.required('Please enter your stock units'),
    otherwise: (schema) => schema.notRequired(),
  }),
  thisYearStockOptions: yup.number().when('receiveStockUnit', {
    is: true,
    then: (schema) => schema.required('Please enter your stock units'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Coapplicant Schema
  coapplicantExists: yup.boolean().required('Please select any option.'),
  coapplicantNonPropertyLoan: yup.number().when('coapplicantExists', {
    is: true,
    then: (schema) => schema.required('Please select any option.'),
    otherwise: (schema) => schema.notRequired(),
  }),
  coapplicantFirstName: yup.string().when('coapplicantExists', {
    is: true,
    then: (schema) => schema.required('Please enter coaaplicant first name'),
    otherwise: (schema) => schema.notRequired(),
  }),
  coapplicantLastName: yup.string().when('coapplicantExists', {
    is: true,
    then: (schema) => schema.required('Please enter coaaplicant last name'),
    otherwise: (schema) => schema.notRequired(),
  }),
  coapplicantEmail: yup
    .string()
    .email('Please enter a valid email address')
    .when('coapplicantExists', {
      is: true,
      then: (schema) => schema.required('Please enter coaaplicant email'),
      otherwise: (schema) => schema.notRequired(),
    }),
  coapplicantPhone: yup.string().when('coapplicantExists', {
    is: true,
    then: (schema) => schema.required('Please enter coaaplicant phone'),
    otherwise: (schema) => schema.notRequired(),
  }),
  coapplicantRelationship: yup.string().when('coapplicantExists', {
    is: true,
    then: (schema) => schema.required('Please enter coaaplicant relationship'),
    otherwise: (schema) => schema.notRequired(),
  }),
  coapplicantCitizenship: yup.string().when('coapplicantExists', {
    is: true,
    then: (schema) => schema.required('Please enter coaaplicant citizenship'),
    otherwise: (schema) => schema.notRequired(),
  }),
  coapplicantLivingTogether: yup.boolean().when('coapplicantExists', {
    is: true,
    then: (schema) =>
      schema.required('Please select coaaplicant living together'),
    otherwise: (schema) => schema.notRequired(),
  }),
  coapplicantIncomeSource: yup.string().when('coapplicantExists', {
    is: true,
    then: (schema) => schema.required('Please enter coaaplicant income source'),
    otherwise: (schema) => schema.notRequired(),
  }),

  coapplicantCreditCardCurrency: yup.string().when('coapplicantExists', {
    is: true,
    then: (schema) =>
      schema.required('Please enter coaaplicant credit card currency'),
    otherwise: (schema) => schema.notRequired(),
  }),
  coapplicantCreditCardLimit: yup.number().when('coapplicantExists', {
    is: true,
    then: (schema) =>
      schema.required('Please enter coaaplicant credit card limit'),
    otherwise: (schema) => schema.notRequired(),
  }),

  coapplicantJobStartMonth: requiredIfCoapplicantIncomeSource(
    yup.string(),
    ['employee'],
    'Please select job start month.',
  ),
  coapplicantJobStartYear: requiredIfCoapplicantIncomeSource(
    yup.string(),
    ['employee'],
    'Please select job start year.',
  ),
  coapplicantOccupation: requiredIfCoapplicantIncomeSource(
    yup.string(),
    ['employee'],
    'Occupation is required.',
  ),
  coapplicantSalaryCurrency: requiredIfCoapplicantIncomeSource(
    yup.string(),
    ['employee'],
    'Please select your salary currency.',
  ),
  coapplicantCompanySalaryCurrency: requiredIfCoapplicantIncomeSource(
    yup.string(),
    ['self_employed_company', 'self_employed_trader_or_contractor'],
    'Please select your company salary currency.',
  ),
  coapplicantBaseSalary: requiredIfCoapplicantIncomeSource(
    yup.number(),
    ['employee'],
    'Please enter your base salary.',
  ),
  coapplicantSalaryFrequency: requiredIfCoapplicantIncomeSource(
    yup.string(),
    ['employee'],
    'Please select your salary frequency.',
  ),
  coapplicantReceiveAllowanceIncome: requiredIfCoapplicantIncomeSource(
    yup.boolean(),
    ['employee'],
    'Please verify your allowance income.',
  ),
  coapplicantAllowanceIncome: requiredIfCondition(
    yup.number().typeError('Allowance income must be a number'),
    ['coapplicantIncomeSource', 'coapplicantReceiveAllowanceIncome'],
    (incomeSource, receiveAllowanceIncome) =>
      incomeSource === 'employee' && receiveAllowanceIncome === true,
    'Please enter your allowance income.',
  ),
  coapplicantAllowanceFrequency: requiredIfCondition(
    yup.string(),
    ['coapplicantIncomeSource', 'coapplicantReceiveAllowanceIncome'],
    (incomeSource, receiveAllowanceIncome) =>
      incomeSource === 'employee' && receiveAllowanceIncome === true,
    'Please select your allowance frequency.',
  ),
  coapplicantTypeOfAllowanceIncome: requiredIfCondition(
    yup.string(),
    ['coapplicantIncomeSource', 'coapplicantReceiveAllowanceIncome'],
    (incomeSource, receiveAllowanceIncome) =>
      incomeSource === 'employee' && receiveAllowanceIncome === true,
    'Please select your allowance type.',
  ),
  coapplicantReceiveCommissionIncome: requiredIfCoapplicantIncomeSource(
    yup.boolean(),
    ['employee'],
    'Please verify your commission income.',
  ),
  coapplicantCommissionFrequency: requiredIfCondition(
    yup.string(),
    ['coapplicantIncomeSource', 'coapplicantReceiveCommissionIncome'],
    (incomeSource, receiveCommissionIncome) =>
      incomeSource === 'employee' && receiveCommissionIncome === true,
    'Please select your commission frequency.',
  ),
  coapplicantCommissionIncome: yup
    .number()
    .when('coapplicantReceiveCommissionIncome', {
      is: true,
      then: (schema) => schema.required('Please enter your commission income'),
      otherwise: (schema) => schema.notRequired(),
    }),
  coapplicantReceiveAnnualCashBonus: requiredIfCoapplicantIncomeSource(
    yup.boolean(),
    ['employee'],
    'Please verify your annual cash bonus.',
  ),
  coapplicantThisYearAnnualCashBonus: yup
    .number()
    .when('coapplicantReceiveAnnualCashBonus', {
      is: true,
      then: (schema) => schema.required('Please enter your annual cash bonus'),
      otherwise: (schema) => schema.notRequired(),
    }),
  coapplicantLastYearAnnualCashBonus: yup
    .number()
    .when('coapplicantReceiveAnnualCashBonus', {
      is: true,
      then: (schema) => schema.required('Please enter your annual cash bonus'),
      otherwise: (schema) => schema.notRequired(),
    }),
  coapplicantReceiveStockUnit: requiredIfCoapplicantIncomeSource(
    yup.boolean(),
    ['employee'],
    'Please verify your stock units.',
  ),
  coapplicantThisYearStockOptions: yup
    .number()
    .when('coapplicantReceiveStockUnit', {
      is: true,
      then: (schema) => schema.required('Please enter your annual cash bonus'),
      otherwise: (schema) => schema.notRequired(),
    }),
  coapplicantLastYearStockOptions: yup
    .number()
    .when('coapplicantReceiveStockUnit', {
      is: true,
      then: (schema) => schema.required('Please enter your annual cash bonus'),
      otherwise: (schema) => schema.notRequired(),
    }),
  coapplicantIndustry: requiredIfCoapplicantIncomeSource(
    yup.string(),
    ['self_employed_company', 'self_employed_trader_or_contractor'],
    'Please select your industry.',
  ),
  coapplicantOperationStartMonth: requiredIfCoapplicantIncomeSource(
    yup.string(),
    ['self_employed_company', 'self_employed_trader_or_contractor'],
    'Please select operation start month.',
  ),
  coapplicantOperationStartYear: requiredIfCoapplicantIncomeSource(
    yup.string(),
    ['self_employed_company', 'self_employed_trader_or_contractor'],
    'Please select operation start year.',
  ),
  coapplicantThisYearPersonalNetIncomeAfterTaxes:
    requiredIfCoapplicantIncomeSource(
      yup.number(),
      ['self_employed_company', 'self_employed_trader_or_contractor'],
      'Please enter your personal net income after taxes.',
    ),
  coapplicantLastYearPersonalNetIncomeAfterTaxes:
    requiredIfCoapplicantIncomeSource(
      yup.number(),
      ['self_employed_company', 'self_employed_trader_or_contractor'],
      'Please enter your personal net income after taxes.',
    ),

  coapplicantOwnershipPercentage: requiredIfCoapplicantIncomeSource(
    yup.number(),
    ['self_employed_company'],
    'Please enter ownership percentage.',
  ),
  coapplicantThisYearCompanyNetIncomeAfterTaxes:
    requiredIfCoapplicantIncomeSource(
      yup.number(),
      ['self_employed_company'],
      'Please enter your company net income after taxes.',
    ),
  coapplicantLastYearCompanyNetIncomeAfterTaxes:
    requiredIfCoapplicantIncomeSource(
      yup.number(),
      ['self_employed_company'],
      'Please enter your company net income after taxes.',
    ),
  coapplicantVisaSubClass: requiredIfPR(
    yup.string(),
    'Visa sub class is required.',
  ),
  coapplicantVisaExpiryDate: requiredIfPR(
    yup.string(),
    'Visa expire date is required.',
  ),
  ...nonPropertyFields,
  ...coapplicantNonPropertyFields,
});

export const incomeDetailLabelMapper = {
  incomeSource: 'What’s your main source of income?',
  nonPropertyLoan: 'How many non-property loans do you have?',
  nonPropertyLoanType: 'What’s your loan type and other loan info?',
  creditCard: 'What’s your credit details ?',
  userMessage: 'Is there anything you’d want us to know?',
  whereDidYouHearAboutUs: 'Where did you hear about us?',
  coapplicantNonPropertyLoan:
    'How many non-property loans does the co-applicant have?',
};
