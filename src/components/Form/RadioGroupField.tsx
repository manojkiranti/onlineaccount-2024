import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Radio, theme } from 'antd';
import { ErrorText } from '../Elements';

const { useToken } = theme;

interface RadioGroupFieldProps {
  label?: string;
  control: Control<any>;
  name: string;
  options: Array<{ label: string; value: any }>;
  error?: string;
  formDirection?: 'row' | 'column';
}

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  label,
  control,
  name,
  options,
  error,
  formDirection = 'column',
}) => {
  const { token } = useToken();
  return (
    <div className={`form-control ${formDirection}`}>
      <div className="form-label-wrap">
        {label && (
          <label
            className="form-label"
            style={{ color: token.colorTextSecondary }}
          >
            {label}
          </label>
        )}
      </div>
      <div className="input-containter">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Radio.Group {...field}>
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
