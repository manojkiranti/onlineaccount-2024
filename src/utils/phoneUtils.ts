// utils/phoneUtils.ts
import { getCountryData, ICountryData, TCountryCode } from 'countries-list';

/**
 * Extracts the phone number without the country code.
 * @param phone The full phone number including the country code.
 * @param countryCode The country code to extract from the phone number.
 * @returns The phone number without the country code.
 */
export const extractPhoneNumber = (
  phone: string,
  countryCode: string,
): string => {
  const countryDetail = getCountryData(countryCode as TCountryCode);
  if (countryDetail) {
    // Slice off the country code from the phone number
    const phoneWithoutCountryCode = phone
      ? phone.slice(countryDetail?.phone[0].toString().length + 1)
      : '';
    return phoneWithoutCountryCode;
  }
  return phone;
};

/**
 * Formats the phone number with the country code for submission.
 * @param phone The phone number without the country code.
 * @param countryCode The country code to prepend to the phone number.
 * @returns The formatted phone number with the country code.
 */
export const formatPhoneNumber = (
  phone: string,
  countryCode: string,
): string => {
  const countryDetail = getCountryData(countryCode as TCountryCode);
  if (countryDetail) {
    const countryCodePrefix = `+${countryDetail?.phone[0]}`;
    return `${countryCodePrefix}${phone}`;
  }
  return phone;
};
