import React from "react";
import { Controller, Control } from "react-hook-form";
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';

import { ErrorText } from "../Elements";
import FormLabel from "./FormLabel";
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
interface NepaliDatePickerFieldProps {
  label?: string;
  control: Control<any>;
  name: string;
  error?: string;
  required?: boolean;
  formDirection?: "row" | "column";
  placeholder?: string;
  // You can pass custom options to the NepaliDatePicker
  options?: {
    calenderLocale?: string;
    valueLocale?: string;
    // ... add other option props supported by the package if needed
    [key: string]: any;
  };
}

const NepaliDatePickerField: React.FC<NepaliDatePickerFieldProps> = ({
  label,
  control,
  name,
  error,
  required = false,
  formDirection = "column",
  placeholder = "Select Date",
  // Default options: using Nepali for calendar and English for value formatting
  options = { calenderLocale: "ne", valueLocale: "en" },
}) => {
  return (
    <div className={`form-control ${formDirection}`}>
      {label && <FormLabel required={required} label={label} />}
      <div className="bs-datepicker-input-containter">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Calendar
              // Add error styling if necessary
              inputClassName={`form-control ${error ? "error" : ""}`}
              // Use field.value or default to an empty string
              value={field.value || ""}
              onChange={(value: string) => {
                // When the date changes, update the form field value
                field.onChange(value);
              }}
              theme='deepdark'
              hideDefaultValue={true}
              placeholder={placeholder}
              
              language="en"
            />
          )}
        />
        {error && <ErrorText error={error} />}
      </div>
    </div>
  );
};

export default NepaliDatePickerField;
