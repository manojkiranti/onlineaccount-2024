import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Button, Col, Row } from 'antd';

import { getCountryData, TCountryCode, ICountryData } from 'countries-list';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { InputField, SelectField } from '@/components/Form';
import { useCountryOptions } from '@/hooks/useCountryOptions';

import { OnboardingFormMethods, OnboardingFormProps } from '../../types';
import StepTitle from './StepTitle';
import Paragraph from 'antd/es/typography/Paragraph';
import { useFetchCountryByIPQuery } from '@/store/apis/coreApi';

const stepOneSchema = yup.object().shape({
  fullname: yup.string().required('Name is required'),
  countryCode: yup.string().required('Residence is required'),
  phone: yup.string().required('Phone number is required'),
});

export type StepOneFormType = yup.InferType<typeof stepOneSchema>;

const StepOne = forwardRef<
  OnboardingFormMethods<StepOneFormType>,
  OnboardingFormProps<StepOneFormType>
>(({ handleFormSubmit, submitRef, savedData }, ref) => {
  const countryOptions = useCountryOptions();
  const [countryDetail, setCountryDetail] = useState<ICountryData | null>(null);
  const { data: countryData, isLoading } = useFetchCountryByIPQuery();
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(stepOneSchema),
    defaultValues: {
      countryCode: '',
      phone: '',
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

  useEffect(() => {
    if (countryData) {
      setValue('countryCode', countryData.data.country);
    }
  }, [countryData]);

  const watchResidence = watch('countryCode');
  const watchedFields = watch();

  const handleBlur = async () => {
    const result = await trigger(); // Trigger validation for the form
    if (result) {
      handleFormSubmit(getValues()); // Submit the form if validation passes
    }
  };

  useEffect(() => {
    if (watchResidence) {
      const countryDetail = getCountryData(watchResidence as TCountryCode);
      setCountryDetail(countryDetail);
    }
  }, [watchResidence]);

  useEffect(() => {
    console.log(savedData);
    if (savedData) {
      setValue('countryCode', savedData.countryCode);
      // setValue('phone', savedData.phone);
      setValue('fullname', savedData.fullname);
      const cDetail = getCountryData(savedData.countryCode as TCountryCode);
      const phonePrefix = `+${cDetail?.phone[0].toString()}`;

      // Escape the plus sign in the phonePrefix
      const escapedPrefix = phonePrefix.replace('+', '\\+');

      // Remove the prefix and the + sign
      const phoneWithoutPrefix = savedData.phone.replace(
        new RegExp('^' + escapedPrefix),
        '',
      );
      const phoneWithoutPlusSign = phoneWithoutPrefix.replace(/^\+/, '');

      setValue('phone', phoneWithoutPlusSign);
    }
  }, [savedData]);

  const onSubmit: SubmitHandler<StepOneFormType> = (data) => {
    handleFormSubmit({
      ...data,
      phone: `+${countryDetail?.phone[0]}${data.phone}`,
    } as StepOneFormType);
  };

  return (
    <>
      <StepTitle
        title="Find Out if You Qualify for an Australian Mortgage in 1 Minute!"
        subTitle="Get quick insights tailored to your situation as an overseas resident."
        formTitle="1. What’s your name, country of residence, and number?"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={30}>
          <Col xs={24}>
            <InputField
              size="large"
              name="fullname"
              label="Full Name"
              placeholder="Enter your full name"
              control={control}
              error={errors.fullname?.message ?? ''}
              // onBlur={handleBlur}
              required={true}
            />
          </Col>
          <Col xs={24}>
            <SelectField
              showSearch={true}
              options={countryOptions}
              label="Country Of Residence"
              name="countryCode"
              control={control}
              size="large"
              placeholder="Select your country"
              error={errors.countryCode?.message ?? ''}
              // onBlur={handleBlur}
              required={true}
            />
          </Col>
          <Col xs={24}>
            <InputField
              prefix={countryDetail ? `+ ${countryDetail.phone[0]}` : ''}
              size="large"
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
              control={control}
              error={errors.phone?.message ?? ''}
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

export default StepOne;
