export const INCOME_SOURCE_OPTIONS = [
  {
    label: 'Employee',
    value: 'employee',
  },
  {
    label: 'Self-Employed (Sole trader / Contractor)',
    value: 'self_employed_trader_or_contractor',
  },
  {
    label: 'Self-Employed (Company)',
    value: 'self_employed_company',
  },
  {
    label: 'Unemployed / Home Duties',
    value: 'unemployed',
  },
];

export const NON_PROPERTY_LOAN_OPTIONS = Array.from({ length: 6 }, (_, i) => ({
  label: i === 6 ? '6 or more' : i.toString(),
  value: i,
}));

export const NON_PROPERTY_LOAN_TYPE_OPTIONS = [
  {
    label: 'Personal Loan',
    value: 'personal_loan',
  },
  {
    label: 'Car Loan',
    value: 'car_loan',
  },
  {
    label: 'Tax Loan',
    value: 'tax_loan',
  },
  {
    label: 'Margin Loan',
    value: 'margin_loan',
  },
  {
    label: 'Student Loan',
    value: 'student_loan',
  },
];

export const PURCHASING_UNDER_OPTIONS = [
  {
    label: 'I’m buying in personal name (Sole borrower)',
    value: 'solo_borrower',
    icon: 'man',
  },
  {
    label: 'I’m buying in personal names (Joint borrowers)',
    value: 'joint_borrower',
    icon: 'jointProperty',
  },
  {
    label: 'I’m buying under a Trust',
    value: 'trust',
    icon: 'trust',
  },
  {
    label: 'I’m buying under a non trading company',
    value: 'non_trading_company',
    icon: 'nonTrading',
  },
];

export const PROPERTY_TYPE_OPTIONS = [
  {
    label: 'House',
    value: 'house',
    icon: 'house',
  },
  {
    label: 'Build/Construction Only',
    value: 'build_or_construction',
    icon: 'building',
  },
  {
    label: 'Apartment Unit',
    value: 'apartment',
    icon: 'apartment',
  },
  {
    label: 'Land & House Turnkey (1 contract)',
    value: 'land_house_turnkey',
    icon: 'man',
  },
  {
    label: 'Off-The-Plan Apartment',
    value: 'off_plan_apartment',
    icon: 'offApartment',
  },
  {
    label: 'Land & House Split (2 contracts)',
    value: 'land_house_split',
    icon: 'jointProperty',
  },
  {
    label: 'Land Only',
    value: 'land_only',
    icon: 'map',
  },
];

export const PROPERTY_PURPOSE_OPTIONS = [
  {
    label: 'Owner occupier (OO)',
    value: 'owner_occupied',
  },
  {
    label: 'Investment (INV)',
    value: 'investment',
  },
  {
    label: 'Initially INV, then OO',
    value: 'initially_inv',
  },
  {
    label: 'Holiday Home',
    value: 'holiday_home',
  },
];

export const PROPERTY_TIMEFRAME_OPTIONS = [
  {
    label: 'Immediately. Already signed contract',
    value: 'immediately',
  },
  {
    label: 'ASAP: Found a property',
    value: 'asap',
  },
  {
    label: 'Within 6 Months',
    value: 'within_6_months',
  },
  {
    label: 'More than 6 Months',
    value: 'more_than_6_months',
  },
  {
    label: 'Not Sure Yet',
    value: 'not_sure',
  },
];

export const AUS_PROPERTY_OPTIONS = Array.from({ length: 7 }, (_, i) => ({
  label: i === 6 ? '6 or more' : i.toString(),
  value: i,
}));

export const ALLOWANCES_TYPES_OPTIONS = [
  {
    label: 'Housing',
    value: 'housing',
  },
  {
    label: 'Transport',
    value: 'transport',
  },
  {
    label: 'Education',
    value: 'education',
  },
  {
    label: 'Cash',
    value: 'cash',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

export const COMMISSION_YEARS = [
  {
    label: '1 - 6 months',
    value: '1 - 6 months',
  },
  {
    label: '6 - 12 months',
    value: '6 - 12 months',
  },
  {
    label: '1 - 2 years',
    value: '1 - 2 years',
  },
  {
    label: '2 + years',
    value: '2 + years',
  },
];

export const ADDITIONAL_TAX_BENEFITS = [
  {
    label: 'Yes, but I’d like to know more about tax residency.',
    value: 'yes_but_i_d_like_to_know_more_about_tax_residency',
  },
  {
    label: 'Yes, I need help with non-resident income tax calculations.',
    value: 'Yes, I need help with non-resident income tax calculations.',
  },
  {
    label:
      'Yes, I’m interested in rental property deductions and negative gearing.',
    value:
      'Yes, I’m interested in rental property deductions and negative gearing.',
  },
  {
    label: 'Yes, I’d like guidance on capital gains tax.',
    value: 'Yes, I’d like guidance on capital gains tax.',
  },
  {
    label: 'Yes, I have other specific tax questions.',
    value: 'Yes, I have other specific tax questions.',
  },
  {
    label: 'Yes, I need help filing overdue tax returns.',
    value: 'Yes, I need help filing overdue tax returns.',
  },
  {
    label: 'I’m fully across the tax implications for non-residents.',
    value: 'I’m fully across the tax implications for non-residents.',
  },
];
