import { CSSProperties, FC } from 'react';
import { Controller, Control } from 'react-hook-form';
import { Input, theme } from 'antd';
import { ErrorText } from '../Elements';
import FormLabel from './FormLabel';

const { TextArea } = Input;

const { useToken } = theme;

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  control: Control<any>;
  name: string;
  error?: string;
  readonly?: boolean;
  disabled?: boolean;
  variant?: 'outlined' | 'borderless' | 'filled';
  size?: 'large' | 'middle' | 'small';
  formDirection?: 'row' | 'column';
  required?: boolean;
  showCount?: boolean;
  maxLength?: number;
  inputStyle?: CSSProperties;
  rows?: number;
}

const TextAreaField: FC<InputFieldProps> = ({
  name,
  control,
  label,
  placeholder,
  variant = 'outlined',
  readonly = false,
  disabled = false,
  error,
  size = 'middle',
  formDirection = 'column',
  required = false,
  showCount = true,
  maxLength = 500,
  inputStyle,
  rows = 5,
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
            <TextArea
              {...field}
              readOnly={readonly}
              variant={variant}
              placeholder={placeholder}
              status={errorStatus}
              size={size}
              disabled={disabled}
              showCount={showCount}
              maxLength={maxLength}
              style={{ ...inputStyle }}
              rows={rows}
            />
          )}
        />
        {error && <ErrorText error={error} />}
      </div>
    </div>
  );
};

export default TextAreaField;
