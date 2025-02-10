export const MONTHS = [
  {
    label: "January",
    value: "january",
  },
  {
    label: "February",
    value: "february",
  },
  {
    label: "March",
    value: "march",
  },
  {
    label: "April",
    value: "april",
  },
  {
    label: "May",
    value: "may",
  },
  {
    label: "June",
    value: "june",
  },
  {
    label: "July",
    value: "july",
  },
  {
    label: "August",
    value: "august",
  },
  {
    label: "September",
    value: "september",
  },
  {
    label: "October",
    value: "october",
  },
  {
    label: "November",
    value: "november",
  },
  {
    label: "December",
    value: "december",
  },
];

export const YEARS = Array.from({ length: 60 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { label: year.toString(), value: year.toString() };
}).reverse();

export const AGREE_OPTIONS = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];

export const OPTIONAL_AGREE_OPTIONS = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
  {
    label: "Maybe",
    value: "maybe",
  },
];

export const FREQUENCY_OPTIONS = [
  {
    label: "Weekly",
    value: "weekly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Annually",
    value: "annually",
  },
  {
    label: "Fortnightly",
    value: "fortnightly",
  },
];

export const LENDER_OPTIONS = [
  {
    label: "ANZ",
    value: "anz",
  },
  {
    label: "Bankwest",
    value: "bankwest",
  },
  {
    label: "BOQ",
    value: "boq",
  },
  {
    label: "Citibank",
    value: "citibank",
  },
  {
    label: "Commonwealth Bank",
    value: "commonwealth_bank",
  },
  {
    label: "Heritage",
    value: "heritage",
  },
  {
    label: "HSBC",
    value: "hsbc",
  },
  {
    label: "Macquire",
    value: "macquire",
  },
  {
    label: "NAB",
    value: "nab",
  },
  {
    label: "Qudos",
    value: "qudos",
  },
  {
    label: "St. George / BoM / BoSA",
    value: "st_george_or_bom_bosa",
  },
  {
    label: "Suncorp",
    value: "suncorp",
  },
  {
    label: "Westpac",
    value: "westpac",
  },
  {
    label: "Other - Australian Lender",
    value: "otther_australian_lender",
  },
  {
    label: "Other - Foreign Lender",
    value: "other_foreign_lender",
  },
];

export const RATE_TYPE_OPTIONS = [
  {
    label: "Variable rate loan",
    value: "variable",
  },
  {
    label: "Fixed rate loan",
    value: "fixed",
  },
];

export const PROPERTY_OWNER_TYPE_OPTIONS = [
  {
    label: "I own this",
    value: "own",
  },
  {
    label: "Co-applicant owns this",
    value: "coapplicant_own",
  },
  {
    label: "Jointly owned with co-applicant",
    value: "jointly_own",
  },
  {
    label: "Owned with other(s)",
    value: "own_with_other",
  },
  {
    label: "Trust / Company",
    value: "trust_or_company",
  },
];

export const PROPERTY_USE_TYPE_OPTIONS = [
  {
    label: "Primary residence",
    value: "primary_residence",
  },
  {
    label: "Investment (rented)",
    value: "rented",
  },
  {
    label: "Investment (airbnb/short-term lease)",
    value: "short_term_lease",
  },
  {
    label: "Investment (untenanted)",
    value: "untenanted",
  },
  {
    label: "Commercial property",
    value: "commercial",
  },
];

export const STATES_OPTIONS = [
  {
    label: "New South Wales (NSW)",
    value: "nsw",
  },
  {
    label: "Victoria (VIC) ",
    value: "vic",
  },
  {
    label: "Queensland (QLD)",
    value: "qld",
  },
  {
    label: "Western Australia (WA)",
    value: "wa",
  },
  {
    label: "Southern Australia (SA)",
    value: "sa",
  },
  {
    label: "Tasmania (TAS)",
    value: "tas",
  },
  {
    label: "Northern Territory (NT)",
    value: "nt",
  },
  {
    label: "Australian Capital Territory (ACT)",
    value: "act",
  },
];

export const EMPLOYMENT_OPTIONS = [
  {
    label: "Employee",
    value: "employee",
  },
  {
    label: "Self-Employed (Sole trader / Contractor)",
    value: "self_employed_contractor",
  },
  {
    label: "Self- Employed (Company)",
    value: "self_employed_company",
  },
  {
    label: "Unemployed / Home Duties",
    value: "unemployed                ",
  },
];

export const LOAN_TYPE_OPTIONS = [
  {
    label: "Personal Loan",
    value: "personal_loan",
  },
  {
    label: "Car Loan",
    value: "car_loan",
  },
  {
    label: "Tax Loan",
    value: "tax_loan",
  },
  {
    label: "Margin Loan",
    value: "margin_loan",
  },
  {
    label: "Student Loan",
    value: "student_loan",
  },
];

export const RELATIONSHIP_OPTIONS = [
  {
    label: "My Spouse",
    value: "my_spouse",
  },
  {
    label: "My Partner (Unmarried)",
    value: "my_partner",
  },
  {
    label: "My Mother/Father",
    value: "my_mother_or_father",
  },
  {
    label: "My Brother/Sister/Relative",
    value: "my_brother_sister_relative",
  },
  {
    label: "My friend",
    value: "friend",
  },
  {
    label: "My Child",
    value: "child ",
  },
];

export const CITIZENSHIP_OPTIONS = [
  {
    value: "australian_citizen",
    label: "Australian Citizen",
  },
  {
    value: "australian_pr_visa",
    label: "Australian PR Visa",
  },
  {
    value: "australian_tr_visa",
    label: "Australian TR Visa",
  },
  {
    value: "newzeland_citizen",
    label: "New Zealand Citizen",
  },
  {
    value: "foreign_national",
    label: "Foreign National",
  },
];

export const MARITIAL_STATUS_OPTIONS = [
  {
    label: "Single",
    value: "single",
  },
  {
    label: "Married",
    value: "married",
  },
  {
    label: "De-facto",
    value: "defacto",
  },
  {
    label: "Divorced",
    value: "divorced",
  },
  {
    label: "Widowed",
    value: "widowed",
  },
];

export const RESIDENTIAL_STATUS_OPTIONS = [
  {
    label: "I’m renting",
    value: "renting",
  },
  {
    label: "I live in my own place",
    value: "live_own_place",
  },
  {
    label: "I’m rent free/ boarding (parent)",
    value: "rent_free_or_boarding_parent",
  },
  {
    label: "I live rent free/ boarding (spouse)",
    value: "rent_free_or_boarding_spouse",
  },
  {
    label: "I live rent free/ boarding (friend)",
    value: "rent_free_or_boarding_friend",
  },

  {
    label: "live rent free/ boarding (employer provides)",
    value: "rent_free_or_boarding_employer",
  },
  {
    label: "Other (Provide Specification)",
    value: "other",
  },
];

export const WHERE_DID_YOU_HEAR_ABOUT_US_OPTIONS = [
  {
    label: "Google",
    value: "google",
  },
  {
    label: "Google Ads",
    value: "google_ads",
  },
  {
    label: "Blog Articles",
    value: "blog_articles",
  },
  {
    label: "Word of Mouth",
    value: "word_of_mouth",
  },
  {
    label: "Facebook",
    value: "facebook",
  },
  {
    label: "Australian Associations",
    value: "australian_associations",
  },
  {
    label: "Professional Referral (Agent/Fin. Planners)",
    value: "professional_referral_agent_fin_planners",
  },
  {
    label: "Social Media",
    value: "social_media",
  },
  {
    label: "Webinars",
    value: "webinars",
  },
  {
    label: "Existing Client",
    value: "existing_client",
  },
];

export const OVERSEAS_PROPERTY_USE_OPTIONS = [
  {
    label: "Owner Occupier Home",
    value: "owner_occupier_home",
  },
  {
    label: "Investment Property",
    value: "investment_property",
  },
];

export const BRANCH_LIST = [
  {
    id: "01",
    branchName: "Tripureshwor",
    status: "Y",
  },
  {
    id: "02",
    branchName: "Biratnagar",
    status: "Y",
  },
  {
    id: "03",
    branchName: "Jawalakhel",
    status: "Y",
  },
  {
    id: "04",
    branchName: "Itahari",
    status: "Y",
  },
  {
    id: "05",
    branchName: "Ilam",
    status: "Y",
  },
  {
    id: "06",
    branchName: "New Road",
    status: "Y",
  },
  {
    id: "07",
    branchName: "Banepa",
    status: "Y",
  },
  {
    id: "01",
    branchName: "Tripureshwor",
    status: "Y",
  },
  {
    id: "02",
    branchName: "Biratnagar",
    status: "Y",
  },
  {
    id: "03",
    branchName: "Jawalakhel",
    status: "Y",
  },
  {
    id: "04",
    branchName: "Itahari",
    status: "Y",
  },
  {
    id: "05",
    branchName: "Ilam",
    status: "Y",
  },
  {
    id: "06",
    branchName: "New Road",
    status: "Y",
  },
  {
    id: "07",
    branchName: "Banepa",
    status: "Y",
  },
];



export const CURRENCIES = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "JPY", value: "JPY" },
  { label: "GBP", value: "GBP" },
  { label: "AUD", value: "AUD" },
  { label: "CAD", value: "CAD" },
  { label: "CHF", value: "CHF" },
  { label: "CNY", value: "CNY" },
  { label: "SEK", value: "SEK" },
  { label: "NZD", value: "NZD" },
  { label: "MXN", value: "MXN" },
  { label: "SGD", value: "SGD" },
  { label: "HKD", value: "HKD" },
  { label: "NOK", value: "NOK" },
  { label: "KRW", value: "KRW" },
  { label: "INR", value: "INR" },
  { label: "RUB", value: "RUB" },
  { label: "BRL", value: "BRL" },
  { label: "ZAR", value: "ZAR" },
  { label: "TRY", value: "TRY" },
  { label: "MYR", value: "MYR" },
  { label: "THB", value: "THB" },
  { label: "PHP", value: "PHP" },
  { label: "PLN", value: "PLN" },
  { label: "IDR", value: "IDR" },
  { label: "SAR", value: "SAR" },
  { label: "AED", value: "AED" },
  { label: "DKK", value: "DKK" },
  { label: "NPR", value: "NPR" }
];
