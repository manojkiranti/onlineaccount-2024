export const tipsData = [
  {
    id: 1,
    number: '01',
    variable: true,
    name: 'citizenship',
    option: {
      australian_citizen: {
        title: 'As a Australian Citizen',
        content:
          'Lenders offer lending between 60-80% of the property value for Australian Citizens subject to credit application.',
      },
      australian_pr_visa: {
        title: 'As a Australian PR Visa',
        content:
          'Lenders offer lending between 60-80% of the property value for Australian PR Visa holders subject to credit application.',
      },
      foreign_national: {
        title: 'As a Foreign National',
        content:
          'Lenders offer lending between 60-80% of the property value for non-Australian residents subject to credit application.',
      },
    },
  },
  {
    id: 2,
    number: '02',
    variable: true,
    name: 'employment',
    option: {
      employee: {
        title: 'As a Salaried Employee',
        content:
          'Typical lenders discount your foreign income by 20% and apply Australian tax rates. However, we have lenient lenders that don’t discount foreign income, applies local tax rates, and allows bonuses and commissions. You’ll need to provide the last 3 months’ payslips, bank statements, and your employment contract or letter.',
      },
      self_employed_trader_or_contractor: {
        title: 'As a Self Employed',
        content:
          'As a self-employed individual, banks may consider you higher risk, but options are still available. You’ll typically need your last 2 years’ Personal & Company Tax Notices of Assessment, Financial Account Statements, and trading bank statements.',
      },
      unemployed: {
        title: 'As a Unemployed or Retired',
        content:
          'If you’re unemployed, obtaining lending is difficult unless you have a working co-borrower or substantial investment income with minimal debt. Retirees with fixed government pensions and low expenses may also have options.',
      },
    },
  },
  {
    id: 3,
    number: '03',
    variable: false,
    name: 'borrowerType',
    title: 'Borrower Type',
    content:
      'Using just your name is the simplest, but adding a partner as a co-borrower can boost capacity if their finances are strong. Joint borrowing combines both parties’ assets, liabilities, income, and expenses. Be mindful of the foreign stamp duty surcharge if a foreign national is on the title. Trust and company borrowing are options, though very restrictive. In both cases, a strong financial position is needed, and loans are serviced by the trustee’s or director’s salary.',
  },
  {
    id: 4,
    number: '04',
    variable: false,
    name: 'propertyType',
    title: 'Property Use Type',
    content:
      'If buying as an owner-occupier, you’ll need to explain how you’ll live there while overseas, usually by having family reside there. Otherwise, declare it as an investment property, which increases borrowing capacity through rental income, though rates are about 0.20% higher. As an overseas resident, you can’t really claim owner-occupier status.',
  },
];
