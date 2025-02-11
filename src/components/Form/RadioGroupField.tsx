import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Radio, theme } from 'antd';
import { ErrorText } from '../Elements';
import FormLabel from './FormLabel';

const { useToken } = theme;

interface RadioGroupFieldProps {
  label?: string;
  control: Control<any>;
  name: string;
  options: Array<{ label: string; value: any }>;
  error?: string;
  formDirection?: 'row' | 'column';
  required?: boolean;
  size?: 'large' | 'middle' | 'small';
}

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  label='',
  control,
  name,
  options,
  error,
  formDirection = 'column',
  size='large',
  required=false
}) => {
  const { token } = useToken();
  return (
    <div className={`form-control ${formDirection}`}>
      <FormLabel required={required} label={label} />
      <div className="input-containter">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Radio.Group size={size} {...field}>
              {options.map((option) => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          )}
        />
        {error && <ErrorText error={error} />}
      </div>
    </div>
  );
};

export default RadioGroupField;
