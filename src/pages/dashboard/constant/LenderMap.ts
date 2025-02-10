export type EmploymentStatus =
  | 'employee'
  | 'self_employed_trader_or_contractor'
  | 'unemployed';
export type CitizenshipStatus =
  | 'australian_citizen'
  | 'australian_pr_visa'
  | 'foreign_national';
export type MortgageType =
  | 'pre_approval'
  | 'refinance'
  | 'purchase'
  | 'refinance_cashout';

interface LenderMappings {
  pre_approval: Record<CitizenshipStatus, Record<EmploymentStatus, string[]>>;
  refinance: Record<CitizenshipStatus, Record<EmploymentStatus, string[]>>;
  purchase: Record<CitizenshipStatus, Record<EmploymentStatus, string[]>>;
  refinance_cashout: Record<
    CitizenshipStatus,
    Record<EmploymentStatus, string[]>
  >;
}

export const lenderMappings: LenderMappings = {
  pre_approval: {
    australian_citizen: {
      employee: [
        'ANZ Bank',
        'Commonwealth Bank of Australia',
        'Heritage Bank',
        'Bankwest',
        'NAB',
        'MA Money',
      ],
      self_employed_trader_or_contractor: [
        'AAA Financial Corporation',
        'MA Money',
        'HSBC',
        'LA Trobe Financial',
        'NAB',
      ],
      unemployed: [
        'ANZ Bank',
        'Commonwealth Bank of Australia',
        'Heritage Bank',
      ],
    },
    australian_pr_visa: {
      employee: [
        'Bankwest',
        'Commonwealth Bank of Australia',
        'St. George',
        'NAB',
        'MA Money',
        'AAA Financial Corporation',
      ],
      self_employed_trader_or_contractor: [
        'AAA Financial Corporation',
        'MA Money',
        'HSBC',
        'LA Trobe Financial',
      ],
      unemployed: ['Bankwest', 'Commonwealth Bank of Australia', 'St. George'],
    },
    foreign_national: {
      employee: [
        'Bankwest',
        'AAA Financial Corporation',
        'HSBC',
        'LA Trobe Financial',
      ],
      self_employed_trader_or_contractor: [
        'AAA Financial Corporation',
        'LA Trobe Financial',
        'HSBC',
      ],
      unemployed: ['Bankwest', 'AAA Financial Corporation', 'HSBC'],
    },
  },
  purchase: {
    australian_citizen: {
      employee: [
        'ANZ Bank',
        'Commonwealth Bank of Australia',
        'Heritage Bank',
        'Bankwest',
        'NAB',
        'MA Money',
      ],
      self_employed_trader_or_contractor: [
        'AAA Financial Corporation',
        'MA Money',
        'HSBC',
        'LA Trobe Financial',
        'NAB',
      ],
      unemployed: [
        'ANZ Bank',
        'Commonwealth Bank of Australia',
        'Heritage Bank',
      ],
    },
    australian_pr_visa: {
      employee: [
        'Bankwest',
        'Commonwealth Bank of Australia',
        'St. George',
        'NAB',
        'MA Money',
        'AAA Financial Corporation',
      ],
      self_employed_trader_or_contractor: [
        'AAA Financial Corporation',
        'MA Money',
        'HSBC',
        'LA Trobe Financial',
      ],
      unemployed: ['Bankwest', 'Commonwealth Bank of Australia', 'St. George'],
    },
    foreign_national: {
      employee: [
        'Bankwest',
        'AAA Financial Corporation',
        'HSBC',
        'LA Trobe Financial',
      ],
      self_employed_trader_or_contractor: [
        'AAA Financial Corporation',
        'LA Trobe Financial',
        'HSBC',
      ],
      unemployed: ['Bankwest', 'AAA Financial Corporation', 'HSBC'],
    },
  },
  refinance: {
    australian_citizen: {
      employee: [
        'ANZ Bank',
        'Commonwealth Bank of Australia',
        'Heritage Bank',
        'Bankwest',
        'NAB',
        'MA Money',
      ],
      self_employed_trader_or_contractor: [
        'AAA Financial Corporation',
        'MA Money',
        'HSBC',
        'LA Trobe Financial',
        'NAB',
      ],
      unemployed: [
        'ANZ Bank',
        'Commonwealth Bank of Australia',
        'Heritage Bank',
      ],
    },
    australian_pr_visa: {
      employee: [
        'Bankwest',
        'Commonwealth Bank of Australia',
        'NAB',
        'AAA Financial Corporation',
        'MA Money',
        'LA Trobe Financial',
      ],
      self_employed_trader_or_contractor: [
        'AAA Financial Corporation',
        'MA Money',
        'HSBC',
        'LA Trobe Financial',
        'NAB',
      ],
      unemployed: ['Bankwest', 'Commonwealth Bank of Australia', 'NAB'],
    },
    foreign_national: {
      employee: [
        'Bankwest',
        'AAA Financial Corporation',
        'HSBC',
        'LA Trobe Financial',
      ],
      self_employed_trader_or_contractor: [
        'AAA Financial Corporation',
        'LA Trobe Financial',
        'HSBC',
      ],
      unemployed: ['Bankwest', 'AAA Financial Corporation', 'HSBC'],
    },
  },
  refinance_cashout: {
    australian_citizen: {
      employee: [
        'ANZ Bank',
        'Commonwealth Bank of Australia',
        'Heritage Bank',
        'Bankwest',
        'NAB',
        'MA Money',
      ],
      self_employed_trader_or_contractor: [
        'AAA Financial Corporation',
        'MA Money',
        'HSBC',
        'LA Trobe Financial',
        'NAB',
      ],
      unemployed: [
        'ANZ Bank',
        'Commonwealth Bank of Australia',
        'Heritage Bank',
      ],
    },
    australian_pr_visa: {
      employee: [
        'Bankwest',
        'Commonwealth Bank of Australia',
        'NAB',
        'AAA Financial Corporation',
        'MA Money',
        'LA Trobe Financial',
      ],
      self_employed_trader_or_contractor: [
        'AAA Financial Corporation',
        'MA Money',
        'HSBC',
        'LA Trobe Financial',
        'NAB',
      ],
      unemployed: ['Bankwest', 'Commonwealth Bank of Australia', 'NAB'],
    },
    foreign_national: {
      employee: [
        'Bankwest',
        'AAA Financial Corporation',
        'HSBC',
        'LA Trobe Financial',
      ],
      self_employed_trader_or_contractor: [
        'AAA Financial Corporation',
        'LA Trobe Financial',
        'HSBC',
      ],
      unemployed: ['Bankwest', 'AAA Financial Corporation', 'HSBC'],
    },
  },
};

export const totalLenders = [
  'ANZ Bank',
  'Commonwealth Bank of Australia',
  'Heritage Bank',
  'Bankwest',
  'NAB',
  'MA Money',
  'AAA Financial Corporation',
  'HSBC',
  'LA Trobe Financial',
  'St. George',
];
