import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Checkbox } from 'antd';
import { ErrorText } from '../Elements';

interface MultiCheckboxFieldProps {
  label: string;
  control: Control<any>;
  name: string;
  value: string;
  selectedValues: string[];
  error?: string;
}

const MultiCheckboxField: React.FC<MultiCheckboxFieldProps> = ({
  label,
  control,
  name,
  value,
  selectedValues,
  error,
}) => {
  return (
    <div className="form-control">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox
            checked={selectedValues.includes(value)}
            onChange={(e) => {
              const newValue = e.target.checked
                ? [...selectedValues, value]
                : selectedValues.filter((v) => v !== value);
              field.onChange(newValue);
            }}
          >
            {label}
          </Checkbox>
        )}
      />
      {error && <ErrorText error={error} />}
    </div>
  );
};

export default MultiCheckboxField;
