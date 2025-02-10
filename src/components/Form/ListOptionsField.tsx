import { FC, useEffect, useImperativeHandle, useRef } from 'react';
import { Row, Col, theme, Typography, Flex, FlexProps } from 'antd';
import { Controller, Control, useFormState } from 'react-hook-form';
import { ErrorText } from '../Elements';
import FormLabel from './FormLabel';

type JustifyType = Exclude<FlexProps['justify'], undefined>;

const { useToken } = theme;

const colsMapper = {
  1: 24,
  2: 12,
  3: 8,
  4: 6,
  5: 4,
};
type IconMapperType = Record<string, string>;
interface ListOptionsFieldProps {
  control: Control<any>;
  name: string;
  error?: string;
  options: Array<{
    label: string;
    value: any;
    disabled?: boolean;
    icon?: string;
  }>;
  iconMapper?: IconMapperType;
  cols?: 1 | 2 | 3 | 4 | 5;
  required?: boolean;
  label?: string;
  justify?: JustifyType;
  multiple?: boolean;
  scrollToNextField?: (currentName: string) => void;
}

const ListOptionsField: FC<ListOptionsFieldProps> = ({
  control,
  name,
  error,
  cols = 1,
  required,
  options,
  label,
  iconMapper,
  justify = 'start',
  multiple = false,
  scrollToNextField,
}) => {
  const errorStatus = error ? 'error' : undefined;
  const { token } = useToken();
  const containerRef = useRef<HTMLDivElement>(null);
  const { submitCount } = useFormState({ control });

  useEffect(() => {
    if (error && containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [submitCount, error]);

  return (
    <div className={`form-control`} ref={containerRef}>
      {label && <FormLabel required={required} label={label} />}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const handleChange = (value: any) => {
            if (multiple) {
              const newValue = field.value ? [...field.value] : [];
              if (newValue.includes(value)) {
                const index = newValue.indexOf(value);
                if (index > -1) {
                  newValue.splice(index, 1);
                }
              } else {
                newValue.push(value);
              }
              field.onChange(newValue);
            } else {
              field.onChange(value);
            }
            if (scrollToNextField && !multiple) {
              scrollToNextField(name);
            }
          };
          return (
            <>
              <Row gutter={30} justify="space-between">
                {options.map((option) => {
                  const isSelected = multiple
                    ? field.value?.includes(option.value)
                    : field.value === option.value;
                  return (
                    <Col xs={24} md={colsMapper[cols]} key={option.value}>
                      <div
                        className={`form-item ${isSelected ? 'selected' : ''}`}
                        onClick={() =>
                          !option.disabled && handleChange(option.value)
                        }
                        style={{
                          borderStyle: 'solid',
                          borderWidth: '1px',
                          backgroundColor: '#fff',
                          borderColor: isSelected
                            ? token.colorSuccess
                            : token.colorBorder,
                          padding: '0.7rem 1rem',
                          cursor: 'pointer',
                          borderRadius: '6px',
                          background: isSelected
                            ? token.colorSuccessBg
                            : '#fff',
                          marginBottom: '1rem',
                        }}
                      >
                        <Flex gap={30} justify={justify}>
                          {option?.icon && iconMapper && (
                            <img
                              style={{ width: '1.8rem', height: '1.8rem' }}
                              src={iconMapper[option.icon]}
                              alt={option.label}
                            />
                          )}
                          <Typography.Paragraph style={{ margin: 'auto 0' }}>
                            {option.label}
                          </Typography.Paragraph>
                        </Flex>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </>
          );
        }}
      />

      {error && <ErrorText error={error} />}
    </div>
  );
};

export default ListOptionsField;
