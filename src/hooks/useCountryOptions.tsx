import { useState, useEffect } from 'react';
import {
  countries,
  getEmojiFlag,
  TCountryCode,
  getCountryData,
} from 'countries-list';

interface CountryOption {
  value: string;
  label: JSX.Element;
  countryName?: string;
}

export const useCountryOptions = (): CountryOption[] => {
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  useEffect(() => {
    const autoCompleteOptions: CountryOption[] = [];
    for (const country in countries) {
      const countryCode = country as TCountryCode;
      autoCompleteOptions.push({
        value: countryCode,
        countryName: getCountryData(countryCode)?.name,
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{getEmojiFlag(countryCode)}</span> &nbsp;{' '}
            {countries[countryCode]?.name}
          </div>
        ),
      });
    }
    setCountryOptions(autoCompleteOptions);
  }, []);

  return countryOptions;
};
