import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Checkbox } from 'antd';
import { ErrorText } from '../Elements';
import FormLabel from './FormLabel';

interface CheckboxGroupFieldProps {
  title?: string;
  label?: string;
  control: Control<any>;
  name: string;
  error?: string;
  options: { label: string; value: string }[];
  required?: boolean;
}

const CheckboxGroupField: React.FC<CheckboxGroupFieldProps> = ({
  title,
  label,
  control,
  name,
  error,
  options,
  required = false,
}) => {
  return (
    <div className="form-control">
       {label && <FormLabel required={required} label={label} />}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox.Group
            options={options}
            value={field.value || []}
            onChange={(checkedValues) => field.onChange(checkedValues)}
          />
        )}
      />
      {error && <ErrorText error={error} />}
    </div>
  );
};

export default CheckboxGroupField;