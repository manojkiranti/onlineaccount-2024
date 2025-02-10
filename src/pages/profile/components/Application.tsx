import {
  DatePickerField,
  InputField,
  ListOptionsField,
  SelectField,
} from '@/components/Form';
import {
  AGREE_OPTIONS,
  CITIZENSHIP_OPTIONS,
  FREQUENCY_OPTIONS,
  MARITIAL_STATUS_OPTIONS,
  MONTHS,
  RESIDENTIAL_STATUS_OPTIONS,
  YEARS,
} from '@/constant/options';
import { useCountryOptions } from '@/hooks/useCountryOptions';
import {
  useFetchUserProfileQuery,
  usePostUserProfileMutation,
} from '@/store/apis/userApi';
import { displayError, displaySuccess } from '@/utils/displayMessageUtils';
import { Button, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { INCOME_SOURCE_OPTIONS } from '@/pages/mortgage/routes/Refinance/constant/optionList';
import { currencies } from '@/utils/currenciesUtils';
import { DATE_FORMAT } from '@/constant/dateFormate';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileAppSchema } from '../schema';

const Application = () => {
  const { data: profileData } = useFetchUserProfileQuery();
  const profileDetail = profileData?.data?.common_data;
  const [
    postUserProfile,
    { isLoading: postUserProfileLoading, error: postUserProfileError },
  ] = usePostUserProfileMutation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(profileAppSchema),
  });

  console.log('errors', errors);

  const watchDependentChildren = watch('dependentChildren');
  const watchMaritalStatus = watch('maritalStatus');
  const watchCitizenship = watch('citizenship');
  const watchIncomeSource = watch('incomeSource');
  const watchSalaryCurrency = watch('salaryCurrency');
  const watchCurrentResidentalStatus = watch('currentResidentalStatus');

  const countryOptions = useCountryOptions();

  const onSubmit = async (data: any) => {
    try {
      data = {
        ...data,
        numberOfDependents: parseInt(data.numberOfDependents),
        baseSalary: parseInt(data.baseSalary),
      };
      await postUserProfile(data).unwrap();
      displaySuccess('Successfully Updated Profile.');
    } catch (err) {
      displayError('Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    if (profileDetail) {
      setValue('maritalStatus', profileDetail.maritalStatus ?? '');
      setValue('citizenship', profileDetail.citizenship ?? '');
      setValue(
        'currentResidentalStatus',
        profileDetail.currentResidentalStatus ?? '',
      );
      setValue('dependentChildren', profileDetail?.dependentChildren ?? false);
      setValue('numberOfDependents', profileDetail?.numberOfDependents);
      setValue('incomeSource', profileDetail?.incomeSource ?? '');
      if (profileDetail?.incomeSource === 'employee') {
        setValue('jobStartMonth', profileDetail?.jobStartMonth ?? '');
        setValue('jobStartYear', profileDetail?.jobStartYear ?? '');
        setValue('baseSalary', profileDetail?.baseSalary);
        setValue('salaryCurrency', profileDetail?.salaryCurrency ?? '');
        setValue('salaryFrequency', profileDetail?.salaryFrequency ?? '');
        setValue('occupation', profileDetail?.occupation ?? '');
      }
      if (
        profileDetail?.incomeSource === 'self_employed_trader_or_contractor' ||
        profileDetail?.incomeSource === 'self_employed_company'
      ) {
        setValue(
          'operationStartMonth',
          profileDetail?.operationStartMonth ?? '',
        );
        setValue('operationStartYear', profileDetail?.operationStartYear);
        setValue('industry', profileDetail?.industry ?? '');
        setValue('companySalaryCurrency', profileDetail?.companySalaryCurrency);
      }
      setValue(
        'currentResidentalStatus',
        profileDetail?.currentResidentalStatus,
      );
      setValue(
        'residentalOtherSpecification',
        profileDetail?.residentalOtherSpecification,
      );
      setValue('maritalStatus', profileDetail?.maritalStatus);
      setValue('dependentChildren', profileDetail?.dependentChildren);
      setValue('numberOfDependents', profileDetail?.numberOfDependents);
      if (profileDetail.currentResidentalStatus === 'renting') {
        setValue('rentExpense', profileDetail.rentExpense ?? 0);
        setValue('frequencyOfRent', profileDetail.frequencyOfRent ?? '');
      }
      if (profileDetail.currentResidentalStatus === 'live_own_place') {
        setValue(
          'isTheResidentialPlaceMortgaged',
          profileDetail.isTheResidentialPlaceMortgaged ?? false,
        );
      }
    }
  }, [profileDetail]);

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <div>
            <h2
              style={{
                marginBottom: '20px',
                color: '#1a1a1a',
                fontSize: '20px',
              }}
            >
              Personal Information
            </h2>
          </div>
          <Row gutter={30}>
            <Col sm={24} md={12}>
              <SelectField
                name="citizenship"
                options={CITIZENSHIP_OPTIONS}
                control={control}
                label="Citizenship Detail"
                size="large"
                placeholder="Select Citizenship Detail"
                error={errors?.citizenship?.message ?? ''}
              />
            </Col>

            {(watchCitizenship === 'australian_pr_visa' ||
              watchCitizenship === 'australian_tr_visa') && (
              <>
                <Col xs={24} md={12}>
                  <InputField
                    label="Visa Sub-Class"
                    name="visaSubClass"
                    control={control}
                    placeholder="Eg: Skilled Visa"
                    size="large"
                    error={errors.visaSubClass?.message ?? ''}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <DatePickerField
                    label="Visa Expiry Date"
                    name="visaExpiryDate"
                    control={control}
                    size="large"
                    placeholder="Select Visa Expiry Date"
                    minDate={dayjs()}
                    dateFormat={DATE_FORMAT}
                    error={errors.visaExpiryDate?.message ?? ''}
                  />
                </Col>
              </>
            )}

            <Col sm={24} md={12}>
              <SelectField
                options={RESIDENTIAL_STATUS_OPTIONS}
                name="currentResidentalStatus"
                control={control}
                label="Residential Status"
                size="large"
              />
            </Col>
            {watchCurrentResidentalStatus === 'renting' && (
              <>
                <Col xs={24} md={12}>
                  <InputField
                    label="Rent Expense"
                    type="number"
                    name="rentExpense"
                    control={control}
                    error={errors.rentExpense?.message ?? ''}
                    placeholder="Enter the rent expense"
                    size="large"
                  />
                </Col>
                <Col xs={24} md={12}>
                  <SelectField
                    label="Frequency of Rent"
                    options={FREQUENCY_OPTIONS}
                    name="frequencyOfRent"
                    filterName="country"
                    control={control}
                    size="large"
                    placeholder="Select your country"
                    error={errors.frequencyOfRent?.message ?? ''}
                  />
                </Col>
              </>
            )}

            {watchCurrentResidentalStatus === 'live_own_place' && (
              <Col xs={24}>
                <SelectField
                  options={AGREE_OPTIONS}
                  label="Is This Place Mortgaged?"
                  name="isTheResidentialPlaceMortgaged"
                  control={control}
                  error={errors.isTheResidentialPlaceMortgaged?.message ?? ''}
                  placeholder="Is this place mortgaged?"
                  size="large"
                />
              </Col>
            )}

            {watchCurrentResidentalStatus === 'other' && (
              <Col xs={24}>
                <InputField
                  label="Provide Further Specification"
                  name="residentalOtherSpecification"
                  control={control}
                  error={errors.residentalOtherSpecification?.message ?? ''}
                  placeholder="Eg: Domicile of choice by demonstrating an intention to reside in a particular country indefinitely"
                  size="large"
                />
              </Col>
            )}
            {(watchCitizenship === 'australian_pr_visa' ||
              watchCitizenship === 'australian_tr_visa') && (
              <>
                <Col xs={24} md={12}>
                  <InputField
                    label="Visa Sub-Class"
                    name="visaSubClass"
                    control={control}
                    placeholder="Eg: Skilled Visa"
                    size="large"
                    error={errors.visaSubClass?.message ?? ''}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <DatePickerField
                    label="Visa Expiry Date"
                    name="visaExpiryDate"
                    control={control}
                    size="large"
                    placeholder="Select Visa Expiry Date"
                    minDate={dayjs()}
                    error={errors.visaExpiryDate?.message ?? ''}
                  />
                </Col>
              </>
            )}

            <Col sm={24} md={24}>
              <SelectField
                options={MARITIAL_STATUS_OPTIONS}
                name="maritalStatus"
                control={control}
                label="Marital Status"
                size="large"
                placeholder="Select your marital status"
                error={errors?.maritalStatus?.message ?? ''}
              />
            </Col>
            {watchMaritalStatus !== 'single' &&
              watchMaritalStatus !== 'unmarried' &&
              watchMaritalStatus !== undefined && (
                <Col sm={24} md={12}>
                  <SelectField
                    options={AGREE_OPTIONS}
                    name="dependentChildren"
                    control={control}
                    label="Do you have any dependent children?"
                    size="large"
                    placeholder="Do you have any dependent children?"
                    error={errors.dependentChildren?.message ?? ''}
                  />
                </Col>
              )}
            {watchDependentChildren && (
              <Col sm={24} md={12}>
                <InputField
                  label="If Yes How many?"
                  name="numberOfDependents"
                  control={control}
                  placeholder="Eg: 4"
                  size="large"
                  type="number"
                  error={errors.numberOfDependents?.message ?? ''}
                />
              </Col>
            )}

            <Col sm={24}>
              <SelectField
                name="incomeSource"
                options={INCOME_SOURCE_OPTIONS}
                label="Income Source"
                control={control}
                size="large"
                placeholder="Select your income source"
                error={errors?.incomeSource?.message ?? ''}
              />
            </Col>
            {watchIncomeSource === 'employee' && (
              <>
                <Col xs={24} md={12}>
                  <SelectField
                    options={MONTHS}
                    name="jobStartMonth"
                    control={control}
                    size="large"
                    label="Started Month"
                    placeholder="Select job start month"
                    showSearch={true}
                    error={errors.jobStartMonth?.message ?? ''}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <SelectField
                    options={YEARS}
                    name="jobStartYear"
                    control={control}
                    size="large"
                    label="Started Year"
                    placeholder="Select job start year"
                    showSearch={true}
                    error={errors.jobStartYear?.message ?? ''}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <InputField
                    label="What's your Occupation"
                    name="occupation"
                    control={control}
                    placeholder="Eg: Doctor"
                    size="large"
                    error={errors.occupation?.message ?? ''}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <SelectField
                    options={currencies}
                    name="salaryCurrency"
                    control={control}
                    size="large"
                    label="Salary Currency"
                    placeholder="Select your salary currency"
                    error={errors.salaryCurrency?.message ?? ''}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <InputField
                    label="Base Salary"
                    name="baseSalary"
                    control={control}
                    placeholder="$ 54000"
                    size="large"
                    type="number"
                    prefix={watchSalaryCurrency ?? ''}
                    error={errors.baseSalary?.message ?? ''}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <SelectField
                    label="Salary Frequency"
                    name="salaryFrequency"
                    placeholder="Select your salary frequency"
                    control={control}
                    size="large"
                    options={FREQUENCY_OPTIONS}
                    error={errors.salaryFrequency?.message ?? ''}
                  />
                </Col>
              </>
            )}
            {(watchIncomeSource === 'self_employed_trader_or_contractor' ||
              watchIncomeSource === 'self_employed_company') && (
              <>
                <Col xs={24} md={12}>
                  <SelectField
                    options={MONTHS}
                    name="operationStartMonth"
                    control={control}
                    size="large"
                    label="Started Month"
                    placeholder="Select operation start month"
                    error={errors.operationStartMonth?.message ?? ''}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <SelectField
                    options={YEARS}
                    name="operationStartYear"
                    control={control}
                    size="large"
                    label="Started Year"
                    placeholder="Select operation start year"
                    error={errors.operationStartYear?.message ?? ''}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <InputField
                    label="Enter your industry?"
                    name="industry"
                    control={control}
                    placeholder="Enter your industry"
                    size="large"
                    error={errors.industry?.message ?? ''}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <SelectField
                    options={currencies}
                    name="companySalaryCurrency"
                    control={control}
                    size="large"
                    label="Salary Currency"
                    placeholder="Select your salary currency"
                    error={errors.companySalaryCurrency?.message ?? ''}
                  />
                </Col>
              </>
            )}
          </Row>
        </>
        <Button
          loading={postUserProfileLoading}
          type="primary"
          htmlType="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default Application;
