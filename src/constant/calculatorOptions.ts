import AustralianStampDutyCalculator from '@/assets/images/calculator/Australian_stamp_duty_calculator.svg';
import MortgageRepaymentCalculator from '@/assets/images/calculator/Mortgage_repayment_calculator.svg';
import BorrowingPowerCalculator from '@/assets/images/calculator/Borrowing_power_calculator.svg';
import InvestmentPropertyCalculator from '@/assets/images/calculator/Investment_property_calculator.svg';
import LoanComparisonCalculator from '@/assets/images/calculator/Loan_comparison_calculator.svg';
import PropertyBuyingCalculator from '@/assets/images/calculator/Property_buying_calculator.svg';
import PropertySellingCalculator from '@/assets/images/calculator/Property_selling_calculator.svg';
import MortgageSwitchingCalculator from '@/assets/images/calculator/Mortgage_switching_calculator.svg';
import HomeLoanOffsetCalculator from '@/assets/images/calculator/Home_loan_offset_calculator.svg';
import MortgageRefinanceCalculator from '@/assets/images/calculator/Mortgage_refinance_calculator.svg';

export interface CalculatorOption {
  id: number;
  name: string;
  description: string;
  icon: string;
  link: string;
  icon_link: string;
}

export const CALCULATOR_OPTIONS: CalculatorOption[] = [
  {
    id: 1,
    name: 'Australian Stamp Duty Calculator',
    description:
      'Estimate the stamp duty cost of your property purchase, or learn more about foreign stamp duty surcharge and whether it applies to you.',
    icon: AustralianStampDutyCalculator,
    icon_link: 'icons/Australian_stamp_duty_calculator.svg',
    link: 'https://www.odinmortgage.com/calculators/stamp-duty-australia/',
  },
  {
    id: 2,
    name: 'Mortgage Repayment Calculator',
    description:
      'Estimate the cost of your monthly home loan repayments. Switch between repayment types, repayment frequency, and optional extra repayments.',
    icon: MortgageRepaymentCalculator,
    icon_link: 'icons/Mortgage_repayment_calculator.svg',
    link: 'https://www.odinmortgage.com/calculators/mortgage-repayment-calculator/',
  },
  {
    id: 3,
    name: 'Borrowing Power Calculator',
    description:
      'Get an idea of how much you can borrow. Learn how you can increase your borrowing power and what the lenders look at when assessing your application.',
    icon: BorrowingPowerCalculator,
    icon_link: 'icons/Borrowing_power_calculator.svg',
    link: 'https://www.odinmortgage.com/calculators/how-much-can-you-borrow/',
  },
  {
    id: 4,
    name: ' Investment Property Calculator',
    description:
      'Get a detailed analysis of your purchase. Calculate your costs, cash flow, tax position, CGT, ROI, with our complete investor tool designed for non-residents.',
    icon: InvestmentPropertyCalculator,
    icon_link: 'icons/Investment_property_calculator.svg',
    link: 'https://www.odinmortgage.com/calculators/investment-property-calculator/',
  },
  {
    id: 5,
    name: 'Loan Comparison Calculator',
    description:
      'Which home loan is the best deal for you? Whilst your expert Odin Mortgage brokers will find you the perfect home loan, begin your number-crunching by using our loan comparison calculator!',
    icon: LoanComparisonCalculator,
    icon_link: 'icons/Loan_comparison_calculator.svg',
    link: 'https://www.odinmortgage.com/calculators/loan-comparison-calculator/',
  },
  {
    id: 6,
    name: 'Property Buying Calculator',
    description:
      'How much will your property purchase cost you? You know you will need to put down a hefty deposit. You understand loan repayments will be made monthly.',
    icon: PropertyBuyingCalculator,
    icon_link: 'icons/Property_buying_calculator.svg',
    link: 'https://www.odinmortgage.com/calculators/property-buying-cost-calculator/',
  },
  {
    id: 7,
    name: 'Property Selling Calculator',
    description:
      'Want to sell your existing property to buy your dream Aussie home? Perhaps cashing in on investment property, or relocating to your forever home? Calculate costs involved in selling a property in Australia?',
    icon: PropertySellingCalculator,
    icon_link: 'icons/Property_selling_calculator.svg',
    link: 'https://www.odinmortgage.com/calculators/property-selling-cost-calculator/',
  },
  {
    id: 8,
    name: 'Mortgage Switching Calculator',
    description:
      'Are you getting the most from your home loan deal? When it is time to switch your mortgage, choose a new loan that helps to save you money!',
    icon: MortgageSwitchingCalculator,
    icon_link: 'icons/Mortgage_switching_calculator.svg',
    link: 'https://www.odinmortgage.com/calculators/mortgage-switching-calculator/',
  },
  {
    id: 9,
    name: 'Home Loan Offset Calculator',
    description:
      'Are you up to speed with the benefits of an offset account for your home loan? Reduce your interest payable by placing your savings in a transaction account, with the balance offsetting your home loanbalance.',
    icon: HomeLoanOffsetCalculator,
    icon_link: 'icons/Home_loan_offset_calculator.svg',
    link: 'https://www.odinmortgage.com/calculators/home-loan-offset-calculator/',
  },
  {
    id: 10,
    name: 'Mortgage Refinance Calculator',
    description:
      'Use our calculator to estimate how much you could save and find the best mortgage options suited to our current financial situation.',
    icon: MortgageRefinanceCalculator,
    icon_link: 'icons/Mortgage_refinance_calculator.svg',
    link: 'https://www.odinmortgage.com/refinance-calculator/',
  },
];
