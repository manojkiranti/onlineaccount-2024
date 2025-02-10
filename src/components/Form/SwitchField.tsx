import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Switch } from 'antd';
import { ErrorText } from '../Elements';

interface SwitchFieldProps {
  label?: string;
  control: Control<any>;
  name: string;
  error?: string;
}

const SwitchField: React.FC<SwitchFieldProps> = ({
  label,
  control,
  name,
  error,
}) => {
  return (
    <div className="form-control">
      {label && <label>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <Switch checked={value} onChange={onChange} ref={ref} />
        )}
      />
      {error && <ErrorText error={error} />}
    </div>
  );
};

export default SwitchField;
