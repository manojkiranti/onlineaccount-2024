import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Checkbox } from 'antd';
import { ErrorText } from '../Elements';

interface CheckboxFieldProps {
  title?: string;
  label?: string;
  control: Control<any>;
  name: string;
  error?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  title,
  label,
  control,
  name,
  error,
}) => {
  return (
    <div className="form-control">
      {title && <label>{title}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
          >
            {label}
          </Checkbox>
        )}
      />
      {error && <ErrorText error={error} />}
    </div>
  );
};

export default CheckboxField;
