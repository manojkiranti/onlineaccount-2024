import { FC, FocusEvent, ReactNode } from 'react';
import { Controller, Control } from 'react-hook-form';
import { Input, theme } from 'antd';
import { ErrorText } from '../Elements';
import FormLabel from './FormLabel';

const { useToken } = theme;

interface InputFieldProps {
  label?: string;
  type?: 'text' | 'number' | 'password';
  placeholder?: string;
  control: Control<any>;
  name: string;
  error?: string;
  readonly?: boolean;
  disabled?: boolean;
  variant?: 'outlined' | 'borderless' | 'filled';
  prefix?: string | ReactNode;
  suffix?: string | ReactNode;
  size?: 'large' | 'middle' | 'small';
  formDirection?: 'row' | 'column';
  required?: boolean;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputFieldProps> = ({
  name,
  control,
  label,
  type = 'text',
  placeholder,
  variant = 'outlined',
  readonly = false,
  disabled = false,
  error,
  prefix,
  suffix,
  size = 'large',
  formDirection = 'column',
  required = false,
  onBlur,
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
          render={({ field }) => {
            if (type === 'password') {
              return (
                <Input.Password
                  {...field}
                  prefix={prefix}
                  suffix={suffix}
                  type={type}
                  readOnly={readonly}
                  variant={variant}
                  placeholder={placeholder}
                  status={errorStatus}
                  size={size}
                  disabled={disabled}
                  onBlur={onBlur}
                />
              );
            } else {
              return (
                <Input
                  {...field}
                  prefix={prefix}
                  suffix={suffix}
                  type={type}
                  readOnly={readonly}
                  variant={variant}
                  placeholder={placeholder}
                  status={errorStatus}
                  size={size}
                  disabled={disabled}
                  onBlur={onBlur}
                />
              );
            }
          }}
        />
        {error && <ErrorText error={error} />}
      </div>
    </div>
  );
};

export default InputField;
