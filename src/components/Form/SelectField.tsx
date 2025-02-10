import React, { FocusEvent } from 'react';
import { Controller, Control } from 'react-hook-form';
import { Select, theme } from 'antd';
import { ErrorText } from '../Elements';
import FormLabel from './FormLabel';

const { useToken } = theme;

type DefaultOptionType = {
  value: string;
  label: string;
};
const defaultFieldNames: DefaultOptionType = {
  value: 'value',
  label: 'label',
};
interface SelectFieldProps {
  label?: string;
  placeholder?: string;
  control: Control<any>;
  name: string;
  options: Record<string, any>[];
  error?: string;
  showSearch?: boolean;
  size?: 'large' | 'middle' | 'small';
  formDirection?: 'row' | 'column';
  disabled?: boolean;
  required?: boolean;
  fieldNames?: any;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  filterName?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  control,
  name,
  placeholder,
  options,
  showSearch = false,
  error,
  size = 'middle',
  formDirection = 'column',
  disabled = false,
  required = false,
  onBlur,
  fieldNames = { defaultFieldNames },
  filterName = 'country',
}) => {
  const errorStatus = error ? 'error' : undefined;
  const { token } = useToken();
  return (
    <div className={`form-control ${formDirection}`}>
      {label && <FormLabel required={required} label={label} />}
      <div className="input-containter">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              disabled={disabled}
              showSearch={showSearch}
              onChange={(value) => field.onChange(value)}
              status={errorStatus}
              options={options}
              placeholder={placeholder}
              size={size}
              style={{ width: '100%' }}
              fieldNames={fieldNames}
              onBlur={onBlur}
              filterOption={(input, option) =>
                name.includes(filterName)
                  ? option?.countryName
                      ?.toLowerCase()
                      .includes(input.toLowerCase())
                  : option?.label?.toLowerCase().includes(input.toLowerCase())
              }
            />
          )}
        />
        {error && <ErrorText error={error} />}
      </div>
    </div>
  );
};

export default SelectField;
