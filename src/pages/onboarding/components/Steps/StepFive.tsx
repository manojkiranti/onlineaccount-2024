import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Button, Col, Row } from 'antd';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { InputField } from '@/components/Form';

import { OnboardingFormMethods, OnboardingFormProps } from '../../types';
import StepTitle from './StepTitle';
import Paragraph from 'antd/es/typography/Paragraph';

const stepFiveSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
});

export type StepFiveFormType = yup.InferType<typeof stepFiveSchema>;

const StepFive = forwardRef<
  OnboardingFormMethods<StepFiveFormType>,
  OnboardingFormProps<StepFiveFormType>
>(({ handleFormSubmit, submitRef, savedData }, ref) => {
  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(stepFiveSchema),
    defaultValues: {
      email: '',
    },
  });

  /**
   * useImperativeHandle is used to trigger methods from parent component
   */
  useImperativeHandle(ref, () => ({
    triggerValidation: async () => {
      const result = await trigger();
      if (result) {
        return { isValid: true, data: getValues() };
      }
      return { isValid: false };
    },
  }));

  const handleBlur = async () => {
    const result = await trigger(); // Trigger validation for the form
    if (result) {
      handleFormSubmit(getValues()); // Submit the form if validation passes
    }
  };

  useEffect(() => {
    if (savedData) {
      setValue('email', savedData.email);
    }
  }, [savedData]);

  const onSubmit: SubmitHandler<StepFiveFormType> = (data) => {
    handleFormSubmit(data);
  };

  return (
    <>
      <StepTitle
        title="Finish Up and Get Your Results!"
        subTitle="Get quick insights tailored to your situation as an overseas resident."
        formTitle="5. Please provide your email to see your results."
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xl={24}>
            <InputField
              size="large"
              name="email"
              label="Your Email Address"
              placeholder="jhondeo@example.com"
              control={control}
              error={errors.email?.message ?? ''}
              // onBlur={handleBlur}
              required={true}
            />
          </Col>
          <Col xl={24}>
            <Button
              style={{ display: 'none' }}
              htmlType="submit"
              ref={submitRef}
            >
              Form Submit
            </Button>
          </Col>
        </Row>
      </form>
      <Paragraph>
        Please ensure you have answered all of the questions above before
        proceeding to the next page
      </Paragraph>
    </>
  );
});

export default StepFive;
