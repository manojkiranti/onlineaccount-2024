import { Container, FormFieldHeading } from '@/components/Elements';
import {
  FormLabel,
  InputField,
  ListOptionsField,
  SelectField,
} from '@/components/Form';
import StepperFormLayout from '@/components/Layout/StepperFormLayout';
import { Button, Col, Row } from 'antd';
import { set, useForm } from 'react-hook-form';
import {
  AUS_PROPERTY_OPTIONS,
  IS_PROPERTY_MORTGAGED_OPTIONS,
  OVERSEAS_PROPERTY_OPTIONS,
  OVERSEAS_PROPERTY_PURPOSE_OPTIONS,
  PROPERTY_PURPOSE_OPTIONS_REFINANCE,
  PROPERTY_REFINANCE_OPTIONS,
  TYPE_OF_INTEREST_RATE_OPTIONS,
} from '../constant/optionList';
import {
  AGREE_OPTIONS,
  FREQUENCY_OPTIONS,
  LENDER_OPTIONS,
  PROPERTY_OWNER_TYPE_OPTIONS,
  PROPERTY_USE_TYPE_OPTIONS,
} from '@/constant/options';
import useScrollToTop from '@/hooks/useScrollTop';
import useUnsavedChangesWarning from '@/hooks/useUnsavedChangesWarning';
import { useNavigate, useParams } from 'react-router-dom';
import { useCountryOptions } from '@/hooks/useCountryOptions';
import { useEffect, useRef } from 'react';
import { refinanceFormRoutes } from '../constant/refinanceStepperRoutes';
import {
  useGetRefinanceStepDetailQuery,
  usePostRefinanceRequestMutation,
} from '@/pages/mortgage/apis/refinanceAPI';
import { displayError, displaySuccess } from '@/utils/displayMessageUtils';
import { useFetchUserProfileQuery } from '@/store/apis/userApi';
import { PropertyDetailPayload } from '@/pages/mortgage/types/Refinance';
import { PropertyDetailFormType } from '../types/index';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  propertyDetailLabelMapper,
  propertyDetailSchema,
} from '../schema/propertyDetailSchema';
import StepProgress from '@/components/StepProgress/StepProgress';
import { stepData } from '../constant/stepData';
const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const countryOptions = useCountryOptions();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  useScrollToTop();
  useUnsavedChangesWarning(true);

  const {
    data: userProfileData,
    error: userProfileDataError,
    isLoading: userProfileDataLoading,
  } = useFetchUserProfileQuery(undefined, {
    skip: false,
  });

  const [postRefinanceRequest, { isLoading: postRefinanceReqestLoading }] =
    usePostRefinanceRequestMutation();

  const {
    data: propertyDetailApiResponse,
    isLoading: fetchPropertyDetailLoading,
    isError: fetchPropertyDetailError,
  } = useGetRefinanceStepDetailQuery(
    { application_id: id!, step: 'property_detail' },
    { skip: !id, refetchOnMountOrArgChange: true },
  );

  const propertyDetailData = propertyDetailApiResponse?.data
    .data as PropertyDetailFormType;

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    unregister,
    watch,
    formState: { errors },
  } = useForm<PropertyDetailFormType>({
    defaultValues: {},
    resolver: yupResolver(propertyDetailSchema),
  });

  console.log('errors', errors);

  const watchAusProperties = watch('ausProperty') || 0;
  const watchOverseasProperties = watch('overseasProperty') || 0;

  const onSubmit = (data: PropertyDetailFormType) => {
    const payload: PropertyDetailPayload = {
      data,
      step: 'property_detail',
      ...(id ? { application_id: id } : {}),
    };

    postRefinanceRequest(payload)
      .unwrap()
      .then((res) => {
        displaySuccess('Successfully submitted details.');
        navigate(
          `${refinanceFormRoutes['income_detail']}/${res.data.application_id}`,
        );
      })
      .catch((err) => displayError(err));
  };

  const handleFormSubmit = () => {
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };

  const clearAusPropertyFields = (index: number) => {
    const fields = [
      `ausPropertyLocation${index}`,
      `ausPropertyValue${index}`,
      `isMortgageOnProperty${index}`,
      `ausMortgageLoanLimit${index}`,
      `ausMortgageLender${index}`,
      `ausMortgageLoanTerm${index}`,
      `ausMortgageInterest${index}`,
      `ausMortgageInterestType${index}`,
      `ausPropertyRent${index}`,
      `ausPropertyRentFrequency${index}`,
      `ausPropertyOwner${index}`,
      `ausPropertyUse${index}`,
      `ausPropertyRentFrequency${index}`,
    ];

    fields.forEach((field) => {
      unregister(field as keyof PropertyDetailFormType);
    });
  };

  const clearOverseasPropertyFields = (index: number) => {
    const fields = [
      `overseasPropertyLocation${index}`,
      `overseasPropertyValue${index}`,
      `isMortgageOnOverseasProperty${index}`,
      `overseasMortgageLoanLimit${index}`,
      `overseasMortgageLender${index}`,
      `overseasMortgageLoanTerm${index}`,
      `overseasMortgageRepayment${index}`,
      `overseasMortgageInterest${index}`,
      `overseasMortgageInterestType${index}`,
    ];

    fields.forEach((field) => {
      unregister(field as keyof PropertyDetailFormType);
    });
  };

  useEffect(() => {
    const currentValues = getValues();
    const previousAusProperties = Object.keys(currentValues).filter((key) =>
      key.startsWith('ausPropertyLocation'),
    ).length;

    if (previousAusProperties > watchAusProperties) {
      for (let i = watchAusProperties + 1; i <= previousAusProperties; i++) {
        clearAusPropertyFields(i);
      }
    }
  }, [watchAusProperties]);

  useEffect(() => {
    const currentValues = getValues();
    const previousOverseasProperties = Object.keys(currentValues).filter(
      (key) => key.startsWith('overseasPropertyLocation'),
    ).length;
    if (previousOverseasProperties > watchOverseasProperties) {
      for (
        let i = watchOverseasProperties + 1;
        i <= previousOverseasProperties;
        i++
      ) {
        clearOverseasPropertyFields(i);
      }
    }
  }, [watchOverseasProperties]);

  useEffect(() => {
    if (id && propertyDetailData) {
      setValue('ausProperty', propertyDetailData.ausProperty);
      setValue('overseasProperty', propertyDetailData.overseasProperty);
      // setValue('firstName', propertyDetailData.firstName);
      // setValue('lastName', propertyDetailData.lastName);
      // setValue('email', propertyDetailData.email);
      // setValue('phone', propertyDetailData.phone);
      if (propertyDetailData.ausProperty > 0) {
        for (let i = 1; i <= propertyDetailData.ausProperty; i++) {
          const locationField =
            `ausPropertyLocation${i}` as keyof PropertyDetailFormType;
          const valueField =
            `ausPropertyValue${i}` as keyof PropertyDetailFormType;
          const isMortgageField =
            `isMortgageOnProperty${i}` as keyof PropertyDetailFormType;
          const loanLimit =
            `ausMortgageLoanLimit${i}` as keyof PropertyDetailFormType;
          const lender =
            `ausMortgageLender${i}` as keyof PropertyDetailFormType;
          const loanTerm =
            `ausMortgageLoanTerm${i}` as keyof PropertyDetailFormType;
          const interestRate =
            `ausMortgageInterest${i}` as keyof PropertyDetailFormType;
          const interestRateType =
            `ausMortgageInterestType${i}` as keyof PropertyDetailFormType;
          const rentOnAusPropertyField =
            `ausPropertyRent${i}` as keyof PropertyDetailFormType;
          const ausPropertyRentFrequencyField =
            `ausPropertyRentFrequency${i}` as keyof PropertyDetailFormType;
          const owner = `ausPropertyOwner${i}` as keyof PropertyDetailFormType;
          const use = `ausPropertyUse${i}` as keyof PropertyDetailFormType;
          const refinancePurpose =
            `ausPropertyPurpose${i}` as keyof PropertyDetailFormType;
          const amountRequired =
            `ausPropertyAmountRequired${i}` as keyof PropertyDetailFormType;
          const amountPurpose =
            `ausPropertyAmountPurpose${i}` as keyof PropertyDetailFormType;
          const fixedRate =
            `ausLoanOnFixedRate${i}` as keyof PropertyDetailFormType;
          setValue(locationField, propertyDetailData[locationField]);
          setValue(valueField, propertyDetailData[valueField]);
          setValue(isMortgageField, propertyDetailData[isMortgageField]);
          setValue(loanLimit, propertyDetailData[loanLimit]);
          setValue(lender, propertyDetailData[lender]);
          setValue(loanTerm, propertyDetailData[loanTerm]);
          setValue(interestRate, propertyDetailData[interestRate]);
          setValue(interestRateType, propertyDetailData[interestRateType]);
          setValue(
            rentOnAusPropertyField,
            propertyDetailData[rentOnAusPropertyField],
          );
          setValue(
            ausPropertyRentFrequencyField,
            propertyDetailData[ausPropertyRentFrequencyField],
          );
          setValue(owner, propertyDetailData[owner]);
          setValue(use, propertyDetailData[use]);
          setValue(refinancePurpose, propertyDetailData[refinancePurpose]);
          setValue(amountRequired, propertyDetailData[amountRequired]);
          setValue(amountPurpose, propertyDetailData[amountPurpose]);
          setValue(fixedRate, propertyDetailData[fixedRate]);
        }
      }
      if (propertyDetailData.overseasProperty > 0) {
        for (let i = 1; i <= propertyDetailData.overseasProperty; i++) {
          const locationField =
            `overseasPropertyLocation${i}` as keyof PropertyDetailFormType;
          const valueField =
            `overseasPropertyValue${i}` as keyof PropertyDetailFormType;
          const isMortgageField =
            `isMortgageOnOverseasProperty${i}` as keyof PropertyDetailFormType;
          const loanLimit =
            `overseasMortgageLoanLimit${i}` as keyof PropertyDetailFormType;
          const lender =
            `overseasMortgageLender${i}` as keyof PropertyDetailFormType;
          const loanTerm =
            `overseasMortgageLoanTerm${i}` as keyof PropertyDetailFormType;
          const repayment =
            `overseasMortgageRepayment${i}` as keyof PropertyDetailFormType;
          const interestRate =
            `overseasMortgageInterest${i}` as keyof PropertyDetailFormType;
          const owner =
            `overseasPropertyOwner${i}` as keyof PropertyDetailFormType;
          const propertyUsage =
            `overseasPropertyUse${i}` as keyof PropertyDetailFormType;
          const overseasPropertyRent =
            `overseasPropertyRent${i}` as keyof PropertyDetailFormType;
          const overseasPropertyRentFrequency =
            `overseasPropertyRentFrequency${i}` as keyof PropertyDetailFormType;
          setValue(locationField, propertyDetailData[locationField]);
          setValue(valueField, propertyDetailData[valueField]);
          setValue(isMortgageField, propertyDetailData[isMortgageField]);
          setValue(loanLimit, propertyDetailData[loanLimit]);
          setValue(lender, propertyDetailData[lender]);
          setValue(loanTerm, propertyDetailData[loanTerm]);
          setValue(repayment, propertyDetailData[repayment]);
          setValue(interestRate, propertyDetailData[interestRate]);
          setValue(owner, propertyDetailData[owner]);
          setValue(propertyUsage, propertyDetailData[propertyUsage]);
          setValue(
            overseasPropertyRent,
            propertyDetailData[overseasPropertyRent],
          );
          setValue(
            overseasPropertyRentFrequency,
            propertyDetailData[overseasPropertyRentFrequency],
          );
        }
      }
    } else if (id && userProfileData) {
      const userDetail = userProfileData.data.common_data;
      // setValue('firstName', userDetail.firstName ?? '');
      // setValue('lastName', userDetail.lastName ?? '');
      // setValue('email', userDetail.email ?? '');
      // setValue('phone', userDetail.phone ?? '');
    }
  }, [propertyDetailData]);

  const handleBackClick = () => {
    navigate(`${refinanceFormRoutes['personal_detail']}/${id}`);
  };
  const total = 3;

  return (
    <StepperFormLayout
      showBackButton={true}
      handleBackClick={handleBackClick}
      handleSubmit={handleFormSubmit}
      nextBtnText="Next: Mortgage Details"
    >
      <Container width="md">
        <Row
          style={{
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <StepProgress
            completedStep={1}
            totalSteps={total}
            stepData={stepData}
            formId={id}
            id={id || ''}
          />
        </Row>
        <Row>
          <Col xs={24}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row gutter={30}>
                <Col xs={24} md={24}>
                  <div className="form-control">
                    <FormFieldHeading
                      total={3}
                      current={1}
                      title={propertyDetailLabelMapper['ausProperty']}
                      subTitle="Tell us about your property"
                    />
                    <ListOptionsField
                      cols={5}
                      control={control}
                      options={AUS_PROPERTY_OPTIONS}
                      error={errors.ausProperty?.message ?? ''}
                      name="ausProperty"
                    />
                  </div>
                </Col>
                {Array.from({ length: watchAusProperties }, (_, i) => {
                  const fieldIndex = i + 1;
                  const isMortgageField = `isMortgageOnProperty${fieldIndex}`;
                  const isMortgage = watch(isMortgageField as any);
                  const propertyUsageField = `ausPropertyUse${fieldIndex}`;
                  const propertyUsage = watch(propertyUsageField as any);
                  const isPurpose = `ausPropertyPurpose${fieldIndex}`;
                  const propertyPurpose = watch(isPurpose as any);
                  return (
                    <Col xs={24} md={24} key={fieldIndex}>
                      <div className="form-control">
                        <FormFieldHeading
                          topbarTitle={`Property ${fieldIndex} Details`}
                          title={propertyDetailLabelMapper['ausPropertyDetail']}
                          subTitle="Please fill out the following details in AUD."
                        />
                        <Row gutter={30}>
                          <Col xs={24} md={12}>
                            <InputField
                              control={control}
                              label={`Property ${i + 1} Address`}
                              name={`ausPropertyLocation${fieldIndex}`}
                              placeholder="42 Nellie Hamilton Avenue, gungahlin, ACT 2912"
                              error={
                                (errors as any)[
                                  `ausPropertyLocation${fieldIndex}`
                                ]?.message ?? ''
                              }
                              size="large"
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <InputField
                              control={control}
                              type="number"
                              label={`Property ${i + 1} value`}
                              placeholder="$ 1,800,000.00"
                              name={`ausPropertyValue${fieldIndex}`}
                              error={
                                (errors as any)[`ausPropertyValue${fieldIndex}`]
                                  ?.message ?? ''
                              }
                              size="large"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={24}>
                            <ListOptionsField
                              control={control}
                              options={IS_PROPERTY_MORTGAGED_OPTIONS}
                              error={
                                (errors as any)[
                                  `isMortgageOnProperty${fieldIndex}`
                                ]?.message ?? ''
                              }
                              name={`isMortgageOnProperty${fieldIndex}`}
                              label="Is there a mortgage on this property?"
                              cols={2}
                            />
                          </Col>
                        </Row>
                      </div>
                      {isMortgage && (
                        <Row gutter={30}>
                          <Col xs={24}>
                            <FormFieldHeading
                              topbarTitle={`Property ${fieldIndex} Details`}
                              title={
                                propertyDetailLabelMapper['ausMortgageDetails']
                              }
                              subTitle="Please fill out the following details in AUD."
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <InputField
                              type="number"
                              control={control}
                              label={`Loan Limit Property ${fieldIndex}`}
                              name={`ausMortgageLoanLimit${fieldIndex}`}
                              placeholder="Enter your loan limit"
                              error={
                                (errors as any)[
                                  `ausMortgageLoanLimit${fieldIndex}`
                                ]?.message ?? ''
                              }
                              size="large"
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <SelectField
                              showSearch={true}
                              options={LENDER_OPTIONS}
                              name={`ausMortgageLender${fieldIndex}`}
                              control={control}
                              label="Lender"
                              placeholder="Select your lender"
                              error={
                                (errors as any)[
                                  `ausMortgageLender${fieldIndex}`
                                ]?.message ?? ''
                              }
                              size="large"
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <InputField
                              type="number"
                              control={control}
                              label={`Remaining Loan Term on Property ${fieldIndex}`}
                              name={`ausMortgageLoanTerm${fieldIndex}`}
                              error={
                                (errors as any)[
                                  `ausMortgageLoanTerm${fieldIndex}`
                                ]?.message ?? ''
                              }
                              placeholder="Years left on loan term"
                              suffix="Years"
                              size="large"
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <InputField
                              type="number"
                              control={control}
                              label={`Interest Rate Property ${fieldIndex}`}
                              name={`ausMortgageInterest${fieldIndex}`}
                              error={
                                (errors as any)[
                                  `ausMortgageInterest${fieldIndex}`
                                ]?.message ?? ''
                              }
                              placeholder="Your loan interest rate"
                              suffix="%"
                              size="large"
                            />
                          </Col>
                        </Row>
                      )}
                      <div className="form-section-header form-control">
                        <FormFieldHeading
                          topbarTitle={`Property ${fieldIndex} Details`}
                          title="Property ownership and usage"
                          subTitle="We need these to assess your tax situation to give you the best tax outcome."
                        />
                        <Row gutter={30}>
                          <Col xs={24} md={12}>
                            <SelectField
                              options={PROPERTY_OWNER_TYPE_OPTIONS}
                              name={`ausPropertyOwner${fieldIndex}`}
                              control={control}
                              size="large"
                              label="Type of Ownership"
                              placeholder="Select type of ownership"
                              error={
                                (errors as any)[`ausPropertyOwner${fieldIndex}`]
                                  ?.message ?? ''
                              }
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <SelectField
                              options={PROPERTY_USE_TYPE_OPTIONS}
                              name={`ausPropertyUse${fieldIndex}`}
                              control={control}
                              size="large"
                              label="Property Usage"
                              placeholder="Select type of usage"
                              error={
                                (errors as any)[`ausPropertyUse${fieldIndex}`]
                                  ?.message ?? ''
                              }
                            />
                          </Col>
                        </Row>
                      </div>
                      {(propertyUsage === 'rented' ||
                        propertyUsage === 'short_term_lease' ||
                        propertyUsage === 'commercial') && (
                        <div className="form-section-header form-control">
                          <FormFieldHeading
                            topbarTitle={`Property ${fieldIndex} Details`}
                            title="Property rental details"
                            subTitle="We need these to assess your tax situation to give you the best tax outcome."
                          />
                          <Row gutter={30}>
                            <Col xs={24} md={12}>
                              <InputField
                                label="Rent on Property"
                                placeholder="Enter rent on property"
                                name={`ausPropertyRent${fieldIndex}`}
                                control={control}
                                size="large"
                                error={
                                  (errors as any)[
                                    `ausPropertyRent${fieldIndex}`
                                  ]?.message ?? ''
                                }
                              />
                            </Col>
                            <Col xs={24} md={12}>
                              <SelectField
                                options={FREQUENCY_OPTIONS}
                                name={`ausPropertyRentFrequency${fieldIndex}`}
                                control={control}
                                size="large"
                                label="Rent Frequency"
                                placeholder="Select the frequency of rent"
                                error={
                                  (errors as any)[
                                    `ausPropertyRentFrequency${fieldIndex}`
                                  ]?.message ?? ''
                                }
                              />
                            </Col>
                          </Row>
                        </div>
                      )}
                      <div className="form-section-header form-control">
                        <FormFieldHeading
                          topbarTitle={`Property ${fieldIndex} Details`}
                          title="Property purpose in refinancing"
                          subTitle="We need these to assess your tax situation to give you the best tax outcome."
                        />
                        <Row gutter={30}>
                          <Col xs={24}>
                            <SelectField
                              options={PROPERTY_PURPOSE_OPTIONS_REFINANCE}
                              name={`ausPropertyPurpose${fieldIndex}`}
                              control={control}
                              size="large"
                              label="Select the purpose"
                              placeholder="Select the purpose"
                              error={
                                (errors as any)[
                                  `ausPropertyPurpose${fieldIndex}`
                                ]?.message ?? ''
                              }
                            />
                          </Col>
                        </Row>
                      </div>
                      {(propertyPurpose === 'refinance_and_cash_out' ||
                        propertyPurpose === 'cash_out_only') && (
                        <div className="form-section-header form-control">
                          <Row gutter={30}>
                            <Col xs={24}>
                              <InputField
                                control={control}
                                type="number"
                                label={`Select the Property ${i + 1} amount`}
                                placeholder="$ 1,800,000.00"
                                name={`ausPropertyAmountRequired${fieldIndex}`}
                                error={
                                  (errors as any)[
                                    `ausPropertyAmountRequired${fieldIndex}`
                                  ]?.message ?? ''
                                }
                                size="large"
                              />
                            </Col>
                            <Col xs={24}>
                              <ListOptionsField
                                cols={2}
                                options={PROPERTY_REFINANCE_OPTIONS}
                                control={control}
                                label={`Property ${i + 1} Purpose`}
                                name={`ausPropertyAmountPurpose${fieldIndex}`}
                                error={
                                  (errors as any)[
                                    `ausPropertyAmountPurpose${fieldIndex}`
                                  ]?.message ?? ''
                                }
                              />
                            </Col>
                            <Col xs={24}>
                              <ListOptionsField
                                control={control}
                                name={`ausMortgageInterestType${fieldIndex}`}
                                options={TYPE_OF_INTEREST_RATE_OPTIONS}
                                cols={2}
                                label={`Type of interest rate in Property ${fieldIndex}`}
                                error={
                                  (errors as any)[
                                    `ausMortgageInterestType${fieldIndex}`
                                  ]?.message ?? ''
                                }
                              />
                            </Col>
                          </Row>
                        </div>
                      )}
                      {(propertyPurpose === 'refinance' ||
                        propertyPurpose === 'refinance_and_cash_out') && (
                        <div className="form-section-header form-control">
                          <ListOptionsField
                            control={control}
                            name={`ausLoanOnFixedRate${fieldIndex}`}
                            options={AGREE_OPTIONS}
                            cols={2}
                            label={`Is the loan on fixed rate for property ${fieldIndex}?`}
                          />
                        </div>
                      )}
                    </Col>
                  );
                })}
              </Row>
              <Row gutter={30}>
                <Col xs={24} md={24}>
                  <div className="form-control">
                    <FormFieldHeading
                      total={3}
                      current={2}
                      title={propertyDetailLabelMapper['overseasProperty']}
                      subTitle="Tell us about your overseas property"
                    />
                    <ListOptionsField
                      control={control}
                      name="overseasProperty"
                      options={OVERSEAS_PROPERTY_OPTIONS}
                      cols={5}
                      error={(errors as any)['overseasProperty']?.message ?? ''}
                    />
                  </div>
                </Col>
                {Array.from({ length: watchOverseasProperties }, (_, i) => {
                  const fieldIndex = i + 1;
                  const isMortgageField = `isMortgageOnOverseasProperty${fieldIndex}`;
                  const isMortgage = watch(isMortgageField as any);
                  const isPurpose = `overseasPropertyUse${fieldIndex}`;
                  const propertyPurpose = watch(isPurpose as any);
                  return (
                    <Col xs={24}>
                      <div className="form-control">
                        <Row gutter={30}>
                          <Col xs={24}>
                            <FormFieldHeading
                              topbarTitle={`Overseas Property ${fieldIndex} Details`}
                              // title="Overseas Property"
                              title={
                                propertyDetailLabelMapper[
                                  'overseasPropertyDetail'
                                ]
                              }
                              subTitle={`Property ${fieldIndex}`}
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <SelectField
                              showSearch={true}
                              control={control}
                              options={countryOptions}
                              name={`overseasPropertyLocation${fieldIndex}`}
                              label="Country"
                              error={
                                (errors as any)[
                                  `overseasPropertyLocation${fieldIndex}`
                                ]?.message ?? ''
                              }
                              size="large"
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <InputField
                              name={`overseasPropertyValue${fieldIndex}`}
                              control={control}
                              type="number"
                              label="Property's Value"
                              placeholder="Value"
                              error={
                                (errors as any)[
                                  `overseasPropertyValue${fieldIndex}`
                                ]?.message ?? ''
                              }
                              size="large"
                            />
                          </Col>
                          <Col xs={24}>
                            <ListOptionsField
                              control={control}
                              name={`isMortgageOnOverseasProperty${fieldIndex}`}
                              options={IS_PROPERTY_MORTGAGED_OPTIONS}
                              cols={2}
                              label={`Do you have a mortgage on property ${fieldIndex}?`}
                            />
                          </Col>
                        </Row>
                      </div>
                      {isMortgage && (
                        <Row gutter={30}>
                          <Col xs={24}>
                            <FormFieldHeading
                              topbarTitle={`Mortgage on Property ${fieldIndex} Details`}
                              title={
                                propertyDetailLabelMapper[
                                  'overseasMortgageDetails'
                                ]
                              }
                              subTitle={`Property ${fieldIndex}`}
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <InputField
                              label="Loan Limit"
                              name={`overseasMortgageLoanLimit${fieldIndex}`}
                              control={control}
                              error={
                                (errors as any)[
                                  `overseasMortgageLoanLimit${fieldIndex}`
                                ]?.message ?? ''
                              }
                              placeholder="Enter your loan limit"
                              size="large"
                              type="number"
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <InputField
                              type="number"
                              control={control}
                              label={`Interest Rate Property ${fieldIndex}`}
                              name={`overseasMortgageInterest${fieldIndex}`}
                              error={
                                (errors as any)[
                                  `overseasMortgageInterest${fieldIndex}`
                                ]?.message ?? ''
                              }
                              placeholder="Your loan interest rate"
                              suffix="%"
                              size="large"
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <InputField
                              type="number"
                              control={control}
                              label="Years left on loan term"
                              name={`overseasMortgageLoanTerm${fieldIndex}`}
                              placeholder="Years left on loan term"
                              suffix="Years"
                              error={
                                (errors as any)[
                                  `overseasMortgageLoanTerm${fieldIndex}`
                                ]?.message ?? ''
                              }
                              size="large"
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <InputField
                              type="number"
                              name={`overseasMortgageRepayment${fieldIndex}`}
                              control={control}
                              label="Repayment"
                              placeholder="Your total repayment sum"
                              error={
                                (errors as any)[
                                  `overseasMortgageRepayment${fieldIndex}`
                                ]?.message ?? ''
                              }
                              size="large"
                            />
                          </Col>
                        </Row>
                      )}
                      <div className="form-section-header form-control">
                        <FormFieldHeading
                          topbarTitle={`Property ${fieldIndex} Details`}
                          title="Property ownership and usage"
                          subTitle="We need these to assess your tax situation to give you the best tax outcome."
                        />
                        <Row gutter={30}>
                          <Col xs={24} md={12}>
                            <SelectField
                              options={PROPERTY_OWNER_TYPE_OPTIONS}
                              name={`overseasPropertyOwner${fieldIndex}`}
                              control={control}
                              size="large"
                              label="Type of Ownership"
                              placeholder="Select type of ownership"
                              error={
                                (errors as any)[`ausPropertyOwner${fieldIndex}`]
                                  ?.message ?? ''
                              }
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <SelectField
                              options={OVERSEAS_PROPERTY_PURPOSE_OPTIONS}
                              name={`overseasPropertyUse${fieldIndex}`}
                              control={control}
                              size="large"
                              label="Property Usage"
                              placeholder="Select type of usage"
                              error={
                                (errors as any)[
                                  `overseasPropertyUse${fieldIndex}`
                                ]?.message ?? ''
                              }
                            />
                          </Col>
                        </Row>
                        {propertyPurpose === 'investment_property' && (
                          <div className="form-section-header form-control">
                            <FormFieldHeading
                              topbarTitle={`Property ${fieldIndex} Details`}
                              title="Property rental details"
                              subTitle="We need these to assess your tax situation to give you the best tax outcome."
                            />
                            <Row gutter={30}>
                              <Col xs={24} md={12}>
                                <InputField
                                  label="Rent on Property"
                                  placeholder="Enter rent on property"
                                  name={`overseasPropertyRent${fieldIndex}`}
                                  control={control}
                                  size="large"
                                  error={
                                    (errors as any)[
                                      `overseasPropertyRent${fieldIndex}`
                                    ]?.message ?? ''
                                  }
                                />
                              </Col>
                              <Col xs={24} md={12}>
                                <SelectField
                                  options={FREQUENCY_OPTIONS}
                                  name={`overseasPropertyRentFrequency${fieldIndex}`}
                                  control={control}
                                  size="large"
                                  label="Rent Frequency"
                                  placeholder="Select the frequency of rent"
                                  error={
                                    (errors as any)[
                                      `overseasPropertyRentFrequency${fieldIndex}`
                                    ]?.message ?? ''
                                  }
                                />
                              </Col>
                            </Row>
                          </div>
                        )}
                      </div>
                    </Col>
                  );
                })}
              </Row>
              {/* <Row gutter={30}>
                <Col xs={24}>
                  <FormFieldHeading
                    total={3}
                    current={3}
                    title={propertyDetailLabelMapper['contactDetails']}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <InputField
                    control={control}
                    label="First Name"
                    name="firstName"
                    placeholder="Enter your first name"
                    error={(errors as any).firstName?.message ?? ''}
                    size="large"
                  />
                </Col>
                <Col xs={24} md={12}>
                  <InputField
                    control={control}
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter your last name"
                    error={(errors as any).lastName?.message ?? ''}
                    size="large"
                  />
                </Col>
              </Row> */}
              <Row gutter={30}>
                {/* <Col xs={24} md={12}>
                  <InputField
                    control={control}
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    error={(errors as any).email?.message ?? ''}
                    size="large"
                  />
                </Col>
                <Col xs={24} md={12}>
                  <InputField
                    control={control}
                    type="number"
                    label="Phone Number"
                    name="phone"
                    placeholder="Enter your phone Number"
                    error={(errors as any).phone?.message ?? ''}
                    size="large"
                  />
                </Col> */}
                <Col xs={24}>
                  <Button
                    ref={submitButtonRef}
                    type="primary"
                    htmlType="submit"
                    style={{ display: 'none' }}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </StepperFormLayout>
  );
};

export default PropertyDetail;
