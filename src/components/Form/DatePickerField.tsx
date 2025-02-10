import React from 'react';
import dayjs from 'dayjs';
import { Controller, Control } from 'react-hook-form';
import { DatePicker, theme } from 'antd';
import { ErrorText } from '../Elements';
import FormLabel from './FormLabel';

const { useToken } = theme;

interface DatePickerFieldProps {
  label?: string;
  control: Control<any>;
  name: string;
  error?: string;
  required?: boolean;
  formDirection?: 'row' | 'column';
  size?: 'large' | 'middle' | 'small';
  placeholder?: string;
  maxDate?: dayjs.Dayjs;
  minDate?: dayjs.Dayjs;
  dateFormat?: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  control,
  name,
  error,
  formDirection = 'column',
  required = false,
  size = 'middle',
  placeholder = 'Select Date',
  maxDate,
  minDate,
  dateFormat,
}) => {
  const errorStatus = error ? 'error' : undefined;
  const { token } = useToken();

  const disabledDate = (current: dayjs.Dayjs): boolean => {
    const isBeforeMinDate = minDate ? current.isBefore(minDate, 'day') : false;
    const isAfterMaxDate = maxDate ? current.isAfter(maxDate, 'day') : false;
    return isBeforeMinDate || isAfterMaxDate;
  };

  return (
    <div className={`form-control ${formDirection}`}>
      {label && <FormLabel required={required} label={label} />}
      <div className="input-containter">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <DatePicker
              size={size}
              style={{ width: '100%' }}
              status={errorStatus}
              onChange={(date) => {
                if (dateFormat) {
                  // Format the date only if dateFormat is provided
                  field.onChange(date ? dayjs(date).format(dateFormat) : null);
                } else {
                  // Default behavior
                  field.onChange(date);
                }
              }}
              placeholder={placeholder}
              value={field.value ? dayjs(field.value) : null}
              disabledDate={disabledDate}
            />
          )}
        />
        {error && <ErrorText error={error} />}
      </div>
    </div>
  );
};

export default DatePickerField;
