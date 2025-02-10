export const REFINANCE_PRIORITY_OPTIONS = [
  {
    label: 'Lower my repayments',
    value: 'lower_my_repayments',
  },
  {
    label: 'Pay off my mortgage faster',
    value: 'pay_off_my_mortgage_faster',
  },
  {
    label: 'Get on a better rate',
    value: 'get_on_a_better_rate',
  },
  {
    label: 'More loan features / flexibility',
    value: 'more_loan_features_flexibility',
  },
  {
    label: 'Consolidate my debts',
    value: 'consolidate_my_debts',
  },
  {
    label: 'Cash out from my property',
    value: 'cash_out_from_my_property',
  },
];

export const AUS_PROPERTY_OPTIONS = Array.from({ length: 7 }, (_, i) => ({
  label: i === 6 ? '6 or more' : i.toString(),
  value: i,
}));

export const OVERSEAS_PROPERTY_OPTIONS = Array.from({ length: 7 }, (_, i) => ({
  label: i === 6 ? '6 or more' : i.toString(),
  value: i,
}));

export const IS_PROPERTY_MORTGAGED_OPTIONS = [
  {
    label: 'Yes',
    value: true,
  },
  {
    label: 'No',
    value: false,
  },
];

export const TYPE_OF_INTEREST_RATE_OPTIONS = [
  {
    label: 'Fixed Rate Loan',
    value: 'fixed',
  },
  {
    label: 'Variable Rate Loan',
    value: 'variable',
  },
];

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

export const PROPERTY_PURPOSE_OPTIONS_REFINANCE = [
  {
    label: 'Refinance',
    value: 'refinance',
  },
  {
    label: 'Refinance and Cash-out',
    value: 'refinance_and_cash_out',
  },
  {
    label: 'Cash-out only',
    value: 'cash_out_only',
  },
];

export const PROPERTY_REFINANCE_OPTIONS = [
  {
    label: 'Renovations of existing property',
    value: 'renovations_of_existing_property',
  },
  {
    label: 'Funds for upcoming property purchase (australia)',
    value: 'funds_for_upcoming_property_purchase_australia',
  },
  {
    label: 'Funds for upcoming property purchase (overseas)',
    value: 'funds_for_upcoming_property_purchase_overseas',
  },
  {
    label: 'Purchase of investment shares',
    value: 'purchase_of_investment_shares',
  },
  {
    label: 'Personal purposes - not investment related',
    value: 'personal_purposes_not_investment_related',
  },
];

export const OVERSEAS_PROPERTY_PURPOSE_OPTIONS = [
  {
    label: 'Owner Occupier Home',
    value: 'owner_occupier_home',
  },
  {
    label: 'Investment Property',
    value: 'investment_property',
  },
];
