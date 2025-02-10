import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Button, Col, Row } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, FormFieldHeading } from '@/components/Elements';
import { PropertyDetailFormType } from '../types';
import { InputField, ListOptionsField, SelectField } from '@/components/Form';
import { AUS_PROPERTY_OPTIONS } from '../constant/optionList';

import useUnsavedChangesWarning from '@/hooks/useUnsavedChangesWarning';
import StepperFormLayout from '@/components/Layout/StepperFormLayout';
import {
  AGREE_OPTIONS,
  FREQUENCY_OPTIONS,
  LENDER_OPTIONS,
  OPTIONAL_AGREE_OPTIONS,
  PROPERTY_OWNER_TYPE_OPTIONS,
  PROPERTY_USE_TYPE_OPTIONS,
  RATE_TYPE_OPTIONS,
  STATES_OPTIONS,
} from '@/constant/options';
import {
  propertyDetailLabelMapper,
  propertyDetailSchema,
} from '../schema/propertyDetailSchema';
import { useCountryOptions } from '@/hooks/useCountryOptions';
import { purchaseFormRoutes } from '../constant/stepperRoutes';
import useScrollToTop from '@/hooks/useScrollTop';
import {
  useGetPurchaseStepDetailQuery,
  usePostPurchaseRequestMutation,
} from '@/pages/mortgage/apis/purchaseAPI';
import { PropertyDetailPayload } from '@/pages/mortgage/types/Purchase';
import { displayError, displaySuccess } from '@/utils/displayMessageUtils';
import StepProgress from '@/components/StepProgress/StepProgress';
import { stepData } from '../constant/stepData';
import { OVERSEAS_PROPERTY_PURPOSE_OPTIONS } from '../../Refinance/constant/optionList';

const PropertyDetail = () => {
  const { id } = useParams();
  useUnsavedChangesWarning(true);
  useScrollToTop();
  const countryOptions = useCountryOptions();
  const navigate = useNavigate();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const total = 6;

  const [postPurchaseRequest, { isLoading: postPurchaseRequestLoading }] =
    usePostPurchaseRequestMutation();

  const {
    data: propertyDetailApiResponse,
    error: fetchPropertyDetailError,
    isLoading: fetchPropertyDetailLoading,
  } = useGetPurchaseStepDetailQuery(
    { application_id: id!, step: 'property_detail' },
    { skip: !id, refetchOnMountOrArgChange: true },
  );

  const propertyDetailData = propertyDetailApiResponse?.data
    .data as PropertyDetailFormType;

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    unregister,
    formState: { errors },
  } = useForm<PropertyDetailFormType>({
    defaultValues: {},
    resolver: yupResolver(propertyDetailSchema),
  });

  useEffect(() => {
    if (propertyDetailData) {
      setValue('maxPurchaseAmount', propertyDetailData?.maxPurchaseAmount);
      setValue('propertyLocation', propertyDetailData?.propertyLocation);
      setValue(
        'maxDepositDownpayment',
        propertyDetailData?.maxDepositDownpayment,
      );
      setValue('ausProperty', propertyDetailData?.ausProperty);
      setValue(
        'useExistingAusProperty',
        propertyDetailData?.useExistingAusProperty,
      );
      setValue('overseasProperty', propertyDetailData?.overseasProperty);

      if (propertyDetailData?.ausProperty > 0) {
        for (let i = 1; i <= propertyDetailData?.ausProperty; i++) {
          const locationField =
            `ausPropertyLocation${i}` as keyof PropertyDetailFormType;
          const valueField =
            `ausPropertyValue${i}` as keyof PropertyDetailFormType;
          const isMortgageField =
            `isMortgageOnProperty${i}` as keyof PropertyDetailFormType;
          const ownerField =
            `ausPropertyOwner${i}` as keyof PropertyDetailFormType;
          const propertyUseField =
            `ausPropertyUse${i}` as keyof PropertyDetailFormType;

          const mortgageLoanLimitField =
            `ausMortgageLoanLimit${i}` as keyof PropertyDetailFormType;
          const mortgageLenderField =
            `ausMortgageLender${i}` as keyof PropertyDetailFormType;
          const mortgageTermField =
            `ausMortgageLoanTerm${i}` as keyof PropertyDetailFormType;
          const mortgageInterestRate =
            `ausMortgageInterest${i}` as keyof PropertyDetailFormType;
          const mortgageInterestType =
            `ausMortgageInterestType${i}` as keyof PropertyDetailFormType;
          const rentOnAusPropertyField =
            `ausPropertyRent${i}` as keyof PropertyDetailFormType;
          const ausPropertyRentFrequencyField =
            `ausPropertyRentFrequency${i}` as keyof PropertyDetailFormType;

          setValue(locationField, propertyDetailData[locationField]);
          setValue(valueField, propertyDetailData[valueField]);
          setValue(isMortgageField, propertyDetailData[isMortgageField]);
          setValue(ownerField, propertyDetailData[ownerField]);
          setValue(propertyUseField, propertyDetailData[propertyUseField]);
          setValue(
            mortgageLoanLimitField,
            propertyDetailData[mortgageLoanLimitField],
          );
          setValue(
            mortgageLenderField,
            propertyDetailData[mortgageLenderField],
          );
          setValue(mortgageTermField, propertyDetailData[mortgageTermField]);
          setValue(
            mortgageInterestRate,
            propertyDetailData[mortgageInterestRate],
          );
          setValue(
            mortgageInterestType,
            propertyDetailData[mortgageInterestType],
          );
          setValue(
            rentOnAusPropertyField,
            propertyDetailData[rentOnAusPropertyField],
          );
          setValue(
            ausPropertyRentFrequencyField,
            propertyDetailData[ausPropertyRentFrequencyField],
          );
        }
      }

      if (propertyDetailData.overseasProperty > 0) {
        for (let i = 1; i <= propertyDetailData?.overseasProperty; i++) {
          const locationField =
            `overseasPropertyLocation${i}` as keyof PropertyDetailFormType;
          const valueField =
            `overseasPropertyValue${i}` as keyof PropertyDetailFormType;
          const isMortgageField =
            `isMortgageOnOverseasProperty${i}` as keyof PropertyDetailFormType;
          const ownerField =
            `overseasPropertyOwner${i}` as keyof PropertyDetailFormType;
          const propertyUseField =
            `overseasPropertyUse${i}` as keyof PropertyDetailFormType;
          const mortgageLoanLimitField =
            `overseasMortgageLoanLimit${i}` as keyof PropertyDetailFormType;
          const mortgageInterestRate =
            `overseasMortgageInterest${i}` as keyof PropertyDetailFormType;
          const mortgageLoanTerm =
            `overseasMortgageLoanTerm${i}` as keyof PropertyDetailFormType;
          const mortgageRepayment =
            `overseasMortgageRepayment${i}` as keyof PropertyDetailFormType;
          const rent =
            `overseasPropertyRent${i}` as keyof PropertyDetailFormType;
          const frequency =
            `overseasPropertyRentFrequency${i}` as keyof PropertyDetailFormType;

          setValue(locationField, propertyDetailData[locationField]);
          setValue(valueField, propertyDetailData[valueField]);
          setValue(isMortgageField, propertyDetailData[isMortgageField]);
          setValue(ownerField, propertyDetailData[ownerField]);
          setValue(propertyUseField, propertyDetailData[propertyUseField]);
          setValue(
            mortgageLoanLimitField,
            propertyDetailData[mortgageLoanLimitField],
          );
          setValue(
            mortgageInterestRate,
            propertyDetailData[mortgageInterestRate],
          );
          setValue(mortgageLoanTerm, propertyDetailData[mortgageLoanTerm]);
          setValue(mortgageRepayment, propertyDetailData[mortgageRepayment]);
          setValue(rent, propertyDetailData[rent]);
          setValue(frequency, propertyDetailData[frequency]);
        }
      }
    }
  }, [propertyDetailData]);

  const watchAusProperties = watch('ausProperty') || 0;
  const watchOverseasProperties = watch('overseasProperty') || 0;

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
      `overseasPropertyOwner${index}`,
      `overseasPropertyUse${index}`,
      `overseasPropertyRent${index}`,
      `overseasPropertyRentFrequency${index}`,
    ];

    fields.forEach((field) => {
      unregister(field as keyof PropertyDetailFormType);
    });
  };

  useEffect(() => {
    const currentAusValue = watch('ausProperty') || 0;
    const previousAusValue = Object.keys(getValues()).filter((key) =>
      key.startsWith('ausPropertyLocation'),
    ).length;

    if (currentAusValue < previousAusValue) {
      for (let i = currentAusValue + 1; i <= previousAusValue; i++) {
        clearAusPropertyFields(i);
      }
    }
  }, [watch('ausProperty')]);

  useEffect(() => {
    const currentOverseasValue = watch('overseasProperty') || 0;
    const previousOverseasValue = Object.keys(getValues()).filter((key) =>
      key.startsWith('overseasPropertyLocation'),
    ).length;

    if (currentOverseasValue < previousOverseasValue) {
      for (let i = currentOverseasValue + 1; i <= previousOverseasValue; i++) {
        clearOverseasPropertyFields(i);
      }
    }
  }, [watch('overseasProperty')]);

  const onSubmit = (data: PropertyDetailFormType) => {
    const payload: PropertyDetailPayload = {
      data,
      step: 'property_detail',
      ...(id ? { application_id: id } : {}),
    };
    postPurchaseRequest(payload)
      .unwrap()
      .then((res) => {
        displaySuccess('Successfully submitted details.');
        navigate(
          `${purchaseFormRoutes['income_detail']}/${res.data.application_id}`,
        );
      })
      .catch((err) => {
        displayError(err);
      });
  };

  const handleFormSubmit = () => {
    console.log('handle submit');
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };

  const handleBackClick = () => {
    navigate(`${purchaseFormRoutes['personal_detail']}/${id}`);
  };

  const fieldOrder = [
    'propertyLocation',
    'ausProperty',
    'useExistingAusProperty',
    'overseasProperty',
  ];

  const scrollToNextField = (currentField: string) => {
    const currentIndex = fieldOrder.indexOf(currentField);
    if (currentIndex !== -1 && currentIndex < fieldOrder.length - 1) {
      const nextField = fieldOrder[currentIndex + 1];
      const nextFieldElement = document.getElementById(nextField);
      nextFieldElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <StepperFormLayout
      showBackButton={true}
      handleSubmit={handleFormSubmit}
      handleBackClick={handleBackClick}
      nextBtnText="Next: Income & Loan Details"
      isSubmitLoading={postPurchaseRequestLoading}
    >
      <Container width="md">
        <Row>
          <Col xs={24}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row
                style={{
                  marginBottom: '20px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid #E2E8F0',
                }}
              >
                <StepProgress
                  completedStep={2}
                  totalSteps={4}
                  id={id || ''}
                  formId="purchase_detail"
                  stepData={stepData}
                />
              </Row>
              <Row gutter={30}>
                <Col xs={24}>
                  <div className="form-section-header form-control">
                    <FormFieldHeading
                      total={total}
                      current={1}
                      title={propertyDetailLabelMapper['maxPurchaseAmount']}
                      subTitle="Enter the maximum purchase price you’d consider for your new property."
                    />

                    <InputField
                      name="maxPurchaseAmount"
                      control={control}
                      error={errors.maxPurchaseAmount?.message ?? ''}
                      placeholder="Enter your amount in AUD $"
                      size="large"
                      prefix="$"
                      type="number"
                    />
                  </div>
                </Col>

                <Col xs={24}>
                  <div
                    className="form-section-header form-control"
                    id="propertyLocation"
                  >
                    <FormFieldHeading
                      total={total}
                      current={2}
                      title={propertyDetailLabelMapper['propertyLocation']}
                      subTitle="Notes/ information that we want to relay to the user about the property type"
                    />

                    <ListOptionsField
                      name="propertyLocation"
                      options={STATES_OPTIONS}
                      error={errors.propertyLocation?.message}
                      control={control}
                      cols={2}
                      scrollToNextField={scrollToNextField}
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col xs={24}>
                  <div className="form-section-header form-control">
                    <FormFieldHeading
                      total={total}
                      current={3}
                      title={propertyDetailLabelMapper['maxDepositDownpayment']}
                      subTitle="Enter the maximum purchase price you’d consider for your new property."
                    />

                    <InputField
                      name="maxDepositDownpayment"
                      control={control}
                      error={errors.maxDepositDownpayment?.message ?? ''}
                      placeholder="Enter your amount in AUD$"
                      size="large"
                      prefix="$"
                      type="number"
                    />
                  </div>
                </Col>

                <Col xs={24}>
                  <div
                    className="form-section-header form-control"
                    id="ausProperty"
                  >
                    <FormFieldHeading
                      total={total}
                      current={4}
                      title={propertyDetailLabelMapper['ausProperty']}
                      subTitle="We need these to assess your tax situation to give you the best tax outcome."
                    />

                    <ListOptionsField
                      name="ausProperty"
                      options={AUS_PROPERTY_OPTIONS}
                      error={errors.ausProperty?.message}
                      control={control}
                      cols={5}
                      scrollToNextField={scrollToNextField}
                    />
                  </div>
                </Col>

                {Array.from({ length: watchAusProperties }, (_, index) => {
                  const fieldIndex = index + 1;
                  const isMortgageField = `isMortgageOnProperty${fieldIndex}`;
                  const isMortgage = watch(isMortgageField as any);
                  const propertyUsageField = `ausPropertyUse${fieldIndex}`;
                  const propertyUsage = watch(propertyUsageField as any);
                  return (
                    <Col xs={24} key={fieldIndex}>
                      <div className="form-section-header form-control">
                        <FormFieldHeading
                          topbarTitle={`Property ${fieldIndex} Details`}
                          title={propertyDetailLabelMapper['ausPropertyDetail']}
                          subTitle="Please fill out the following details in AUD."
                        />
                        <Row gutter={30}>
                          <Col xs={24} md={12}>
                            <InputField
                              label="Property Address"
                              name={`ausPropertyLocation${fieldIndex}`}
                              control={control}
                              error={
                                (errors as any)[
                                  `ausPropertyLocation${fieldIndex}`
                                ]?.message ?? ''
                              }
                              placeholder="42 Nellie Hamilton Avenue, Gungahlin, ACT 2912"
                              size="large"
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <InputField
                              label="Property’s Value"
                              name={`ausPropertyValue${fieldIndex}`}
                              control={control}
                              error={
                                (errors as any)[`ausPropertyValue${fieldIndex}`]
                                  ?.message ?? ''
                              }
                              placeholder="$ 2,200,450.00"
                              size="large"
                              type="number"
                            />
                          </Col>
                          <Col xs={24}>
                            <ListOptionsField
                              name={`isMortgageOnProperty${fieldIndex}`}
                              options={AGREE_OPTIONS}
                              label="Do you have a mortgage on this property?"
                              error={
                                (errors as any)[
                                  `isMortgageOnProperty${fieldIndex}`
                                ]?.message ?? ''
                              }
                              control={control}
                              cols={2}
                            />
                          </Col>
                        </Row>
                      </div>

                      {isMortgage && (
                        <>
                          <FormFieldHeading
                            topbarTitle={`Property ${fieldIndex} Details`}
                            title="Mortgage Detail"
                            subTitle="We need these to assess your tax situation to give you the best tax outcome."
                          />
                          <Row gutter={30}>
                            <Col xs={24} md={12}>
                              <InputField
                                label="Loan Limit"
                                name={`ausMortgageLoanLimit${fieldIndex}`}
                                control={control}
                                error={
                                  (errors as any)[
                                    `ausMortgageLoanLimit${fieldIndex}`
                                  ]?.message ?? ''
                                }
                                placeholder="Enter your loan limit"
                                size="large"
                                type="number"
                              />
                            </Col>
                            <Col xs={24} md={12}>
                              <SelectField
                                options={LENDER_OPTIONS}
                                name={`ausMortgageLender${fieldIndex}`}
                                control={control}
                                size="large"
                                label="Lender"
                                placeholder="Select your lender"
                                error={
                                  (errors as any)[
                                    `ausMortgageLender${fieldIndex}`
                                  ]?.message ?? ''
                                }
                              />
                            </Col>
                            <Col xs={24} md={12}>
                              <InputField
                                label="Remaining Loan Term"
                                name={`ausMortgageLoanTerm${fieldIndex}`}
                                control={control}
                                error={
                                  (errors as any)[
                                    `ausMortgageLoanTerm${fieldIndex}`
                                  ]?.message ?? ''
                                }
                                placeholder="Years left on loan term"
                                size="large"
                                type="number"
                                suffix="Years"
                              />
                            </Col>
                            <Col xs={24} md={12}>
                              <InputField
                                label="Interest Rate %"
                                name={`ausMortgageInterest${fieldIndex}`}
                                control={control}
                                error={
                                  (errors as any)[
                                    `ausMortgageInterest${fieldIndex}`
                                  ]?.message ?? ''
                                }
                                placeholder="Your loan interest rate"
                                size="large"
                                suffix="%"
                                type="number"
                              />
                            </Col>
                            <Col xs={24}>
                              <ListOptionsField
                                name={`ausMortgageInterestType${fieldIndex}`}
                                options={RATE_TYPE_OPTIONS}
                                label="Type of Interest Rate"
                                error={
                                  (errors as any)[
                                    `ausMortgageInterestType${fieldIndex}`
                                  ]?.message ?? ''
                                }
                                control={control}
                                cols={2}
                              />
                            </Col>
                          </Row>
                        </>
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
                    </Col>
                  );
                })}
              </Row>
              <Row gutter={30} id="useExistingAusProperty">
                <Col xs={24}>
                  <div className="form-section-header form-control">
                    <FormFieldHeading
                      total={total}
                      current={5}
                      title={
                        propertyDetailLabelMapper['useExistingAusProperty']
                      }
                      subTitle="We need these to assess your tax situation to give you the best tax outcome."
                    />

                    <ListOptionsField
                      name="useExistingAusProperty"
                      options={OPTIONAL_AGREE_OPTIONS}
                      error={errors.useExistingAusProperty?.message}
                      control={control}
                      cols={3}
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={30} id="overseasProperty">
                <Col xs={24}>
                  <div className="form-section-header form-control">
                    <FormFieldHeading
                      total={total}
                      current={6}
                      title={propertyDetailLabelMapper['overseasProperty']}
                      subTitle="We need these to assess your tax situation to give you the best tax outcome."
                    />

                    <ListOptionsField
                      name="overseasProperty"
                      options={AUS_PROPERTY_OPTIONS}
                      error={errors.overseasProperty?.message}
                      control={control}
                      cols={5}
                    />
                  </div>
                </Col>
                {Array.from({ length: watchOverseasProperties }, (_, index) => {
                  const fieldIndex = index + 1;
                  const isMortgageField = `isMortgageOnOverseasProperty${fieldIndex}`;
                  const overseasPropertyUse = watch(
                    `overseasPropertyUse${fieldIndex}` as any,
                  );
                  const isMortgage = watch(isMortgageField as any);
                  const propertyUsageField = `overseasPropertyUse${fieldIndex}`;
                  const propertyUsage = watch(propertyUsageField as any);
                  return (
                    <Col xs={24} key={fieldIndex}>
                      <div className="form-section-header form-control">
                        <FormFieldHeading
                          topbarTitle={`Overseas Property ${fieldIndex} Details`}
                          title={
                            propertyDetailLabelMapper['overseasPropertyDetail']
                          }
                          subTitle="Please fill out the following details in currency of the property’s country"
                        />
                        <Row gutter={30}>
                          <Col xs={24} md={12}>
                            <SelectField
                              showSearch={true}
                              options={countryOptions}
                              name={`overseasPropertyLocation${fieldIndex}`}
                              control={control}
                              size="large"
                              placeholder="Country"
                              label="Country"
                              error={
                                (errors as any)[
                                  `overseasPropertyLocation${fieldIndex}`
                                ]?.message ?? ''
                              }
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <InputField
                              label="Property’s Value"
                              name={`overseasPropertyValue${fieldIndex}`}
                              control={control}
                              error={
                                (errors as any)[
                                  `overseasPropertyValue${fieldIndex}`
                                ]?.message ?? ''
                              }
                              placeholder="$ 2,200,450.00"
                              size="large"
                              type="number"
                            />
                          </Col>
                          <Col xs={24}>
                            <ListOptionsField
                              name={`isMortgageOnOverseasProperty${fieldIndex}`}
                              options={AGREE_OPTIONS}
                              label="Do you have a mortgage on this property?"
                              error={
                                (errors as any)[
                                  `isMortgageOnOverseasProperty${fieldIndex}`
                                ]?.message ?? ''
                              }
                              control={control}
                              cols={2}
                            />
                          </Col>
                        </Row>
                      </div>
                      {isMortgage && (
                        <>
                          <FormFieldHeading
                            topbarTitle={`Overseas Property ${fieldIndex} Details`}
                            title="Mortgage Detail"
                            subTitle="We need these to assess your tax situation to give you the best tax outcome."
                          />
                          <Row gutter={30}>
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
                                label="Interest Rate %"
                                name={`overseasMortgageInterest${fieldIndex}`}
                                control={control}
                                error={
                                  (errors as any)[
                                    `overseasMortgageInterest${fieldIndex}`
                                  ]?.message ?? ''
                                }
                                placeholder="Your loan interest rate"
                                size="large"
                                type="number"
                                suffix="%"
                              />
                            </Col>
                            <Col xs={24} md={12}>
                              <InputField
                                label="Remaining Loan Term"
                                name={`overseasMortgageLoanTerm${fieldIndex}`}
                                control={control}
                                error={
                                  (errors as any)[
                                    `overseasMortgageLoanTerm${fieldIndex}`
                                  ]?.message ?? ''
                                }
                                placeholder="Years left on loan term"
                                size="large"
                                type="number"
                                suffix="Years"
                              />
                            </Col>
                            <Col xs={24} md={12}>
                              <InputField
                                label="Repayment"
                                name={`overseasMortgageRepayment${fieldIndex}`}
                                control={control}
                                error={
                                  (errors as any)[
                                    `overseasMortgageRepayment${fieldIndex}`
                                  ]?.message ?? ''
                                }
                                placeholder="Your total repayment sum"
                                size="large"
                                type="number"
                              />
                            </Col>
                          </Row>
                        </>
                      )}
                      <div className="form-section-header form-control">
                        <FormFieldHeading
                          topbarTitle={`Overseas Property ${fieldIndex} Details`}
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
                                (errors as any)[
                                  `overseasPropertyOwner${fieldIndex}`
                                ]?.message ?? ''
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
                      </div>
                      {(propertyUsage === 'rented' ||
                        propertyUsage === 'short_term_lease' ||
                        propertyUsage === 'investment_property') && (
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
                    </Col>
                  );
                })}
              </Row>
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
            </form>
          </Col>
        </Row>
      </Container>
    </StepperFormLayout>
  );
};

export default PropertyDetail;
