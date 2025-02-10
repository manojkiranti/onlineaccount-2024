import { countries, TCountryCode } from 'countries-list';

const uniqueCurrencies = new Set<string>();
Object.keys(countries).forEach((country) => {
  const countryCode = country as TCountryCode;
  const currency = countries[countryCode].currency[0];
  if (currency !== undefined && currency !== 'ALL') {
    uniqueCurrencies.add(currency);
  }
});
export const currencies = Array.from(uniqueCurrencies).map((currency) => ({
  label: currency,
  value: currency,
}));
