import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';

import { Button, Col, Row, Typography } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, FormFieldHeading, MessageBox } from '@/components/Elements';
import { IncomeDetailFormType } from '../types';
import {
  DatePickerField,
  InputField,
  ListOptionsField,
  SelectField,
  TextAreaField,
} from '@/components/Form';
import {
  ADDITIONAL_TAX_BENEFITS,
  ALLOWANCES_TYPES_OPTIONS,
  AUS_PROPERTY_OPTIONS,
  INCOME_SOURCE_OPTIONS,
  NON_PROPERTY_LOAN_OPTIONS,
} from '../constant/optionList';

import useUnsavedChangesWarning from '@/hooks/useUnsavedChangesWarning';
import StepperFormLayout from '@/components/Layout/StepperFormLayout';
import {
  AGREE_OPTIONS,
  CITIZENSHIP_OPTIONS,
  FREQUENCY_OPTIONS,
  LOAN_TYPE_OPTIONS,
  MONTHS,
  RELATIONSHIP_OPTIONS,
  WHERE_DID_YOU_HEAR_ABOUT_US_OPTIONS,
  YEARS,
} from '@/constant/options';
import {
  incomeDetailLabelMapper,
  incomeDetailSchema,
} from '../schema/incomeDetailSchema';
import { currencies } from '@/utils/currenciesUtils';
import { purchaseFormRoutes } from '../constant/stepperRoutes';
import useScrollToTop from '@/hooks/useScrollTop';
import { IncomeDetailPayload } from '@/pages/mortgage/types/Purchase';
import {
  useGetPurchaseStepDetailQuery,
  usePostPurchaseRequestMutation,
} from '@/pages/mortgage/apis/purchaseAPI';
import { displayError, displaySuccess } from '@/utils/displayMessageUtils';
import StepProgress from '@/components/StepProgress/StepProgress';
import { stepData } from '../constant/stepData';
import { EmployeeFields } from '../components/Fields/EmployeeFields';
import { ContractorField } from '../components/Fields/ContractorField';
import { CompanyField } from '../components/Fields/CompanyField';
import { useCountryOptions } from '@/hooks/useCountryOptions';
import { CoapplicantCompanyField } from '../components/Fields/CoapplicantCompanyField';
import { CoapplicantContractorField } from '../components/Fields/CoapplicantContractorField';
import { CoapplicantEmployeeField } from '../components/Fields/CoapplicantEmployeeFields';
import dayjs from 'dayjs';

const IncomeDetail = () => {
  const { id } = useParams();
  useUnsavedChangesWarning(true);
  useScrollToTop();
  const navigate = useNavigate();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const total = 6;
  const countryOptions = useCountryOptions();

  const [postPurchaseRequest, { isLoading: postPurchaseRequestLoading }] =
    usePostPurchaseRequestMutation();

  const {
    data: incomeDetailApiResponse,
    error: fetchIncomeDetailError,
    isLoading: fetchIncomeDetailLoading,
  } = useGetPurchaseStepDetailQuery(
    { application_id: id!, step: 'income_detail' },
    { skip: !id, refetchOnMountOrArgChange: true },
  );
  const incomeDetailData = incomeDetailApiResponse?.data
    .data as IncomeDetailFormType;

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IncomeDetailFormType>({
    defaultValues: {
      salaryCurrency: 'AUD',
      creditCardCurrency: 'AUD',
      coapplicantCreditCardCurrency: 'AUD',
    },
    resolver: yupResolver(incomeDetailSchema),
  });

  console.log('errors', errors);

  useEffect(() => {
    if (incomeDetailData) {
      setValue('incomeSource', incomeDetailData?.incomeSource);
      if (incomeDetailData?.incomeSource === 'employee') {
        setValue('jobStartMonth', incomeDetailData?.jobStartMonth);
        setValue('jobStartYear', incomeDetailData?.jobStartYear);
        setValue('occupation', incomeDetailData?.occupation);
        setValue('salaryCurrency', incomeDetailData?.salaryCurrency);
        setValue('baseSalary', incomeDetailData?.baseSalary);
        setValue('salaryFrequency', incomeDetailData?.salaryFrequency);
        setValue(
          'receiveAllowanceIncome',
          incomeDetailData?.receiveAllowanceIncome,
        );
        if (incomeDetailData?.receiveAllowanceIncome) {
          setValue('allowanceIncome', incomeDetailData?.allowanceIncome);
          setValue(
            'typeOfAllowanceIncome',
            incomeDetailData?.typeOfAllowanceIncome,
          );
          setValue('allowanceFrequency', incomeDetailData?.allowanceFrequency);
        }
        setValue(
          'receiveCommissionIncome',
          incomeDetailData?.receiveCommissionIncome,
        );
        if (incomeDetailData?.receiveCommissionIncome) {
          setValue('commissionYears', incomeDetailData?.commissionYears);
          setValue(
            'commissionFrequency',
            incomeDetailData?.commissionFrequency,
          );
          setValue('commissionIncome', incomeDetailData?.commissionIncome);
        }
        setValue(
          'receiveAnnualCashBonus',
          incomeDetailData?.receiveAnnualCashBonus,
        );
        if (incomeDetailData?.receiveAnnualCashBonus) {
          setValue(
            'lastYearAnnualCashBonus',
            incomeDetailData?.lastYearAnnualCashBonus,
          );
          setValue(
            'thisYearAnnualCashBonus',
            incomeDetailData?.thisYearAnnualCashBonus,
          );
        }
        setValue('receiveStockUnit', incomeDetailData?.receiveStockUnit);
        if (incomeDetailData?.receiveStockUnit) {
          setValue(
            'thisYearStockOptions',
            incomeDetailData?.thisYearStockOptions,
          );
          setValue(
            'lastYearStockOptions',
            incomeDetailData?.lastYearStockOptions,
          );
        }
      }

      if (incomeDetailData?.incomeSource === 'self_employed_company') {
        setValue('industry', incomeDetailData?.industry);
        setValue('operationStartMonth', incomeDetailData?.operationStartMonth);
        setValue('operationStartYear', incomeDetailData?.operationStartYear);
        setValue(
          'thisYearPersonalNetIncomeAfterTaxes',
          incomeDetailData?.thisYearPersonalNetIncomeAfterTaxes,
        );
        setValue(
          'lastYearPersonalNetIncomeAfterTaxes',
          incomeDetailData?.lastYearPersonalNetIncomeAfterTaxes,
        );
        setValue('ownershipPercentage', incomeDetailData?.ownershipPercentage);
        setValue(
          'thisYearCompanyNetIncomeAfterTaxes',
          incomeDetailData?.thisYearCompanyNetIncomeAfterTaxes,
        );
        setValue(
          'lastYearCompanyNetIncomeAfterTaxes',
          incomeDetailData?.lastYearCompanyNetIncomeAfterTaxes,
        );
      }

      if (
        incomeDetailData?.incomeSource === 'self_employed_trader_or_contractor'
      ) {
        setValue('operationStartMonth', incomeDetailData?.operationStartMonth);
        setValue('operationStartYear', incomeDetailData?.operationStartYear);
        setValue(
          'thisYearPersonalNetIncomeAfterTaxes',
          incomeDetailData?.thisYearPersonalNetIncomeAfterTaxes,
        );
        setValue(
          'lastYearPersonalNetIncomeAfterTaxes',
          incomeDetailData?.lastYearPersonalNetIncomeAfterTaxes,
        );
        setValue('ownershipPercentage', incomeDetailData?.ownershipPercentage);
        setValue(
          'thisYearCompanyNetIncomeAfterTaxes',
          incomeDetailData?.thisYearCompanyNetIncomeAfterTaxes,
        );
        setValue(
          'lastYearCompanyNetIncomeAfterTaxes',
          incomeDetailData?.lastYearCompanyNetIncomeAfterTaxes,
        );
        setValue('industry', incomeDetailData?.industry);
        setValue(
          'companySalaryCurrency',
          incomeDetailData?.companySalaryCurrency,
        );
      }
      setValue('nonPropertyLoan', incomeDetailData?.nonPropertyLoan);
      setValue('creditCardCurrency', incomeDetailData?.creditCardCurrency);
      setValue('creditCardLimit', incomeDetailData?.creditCardLimit);
      setValue('userMessage', incomeDetailData?.userMessage);
      setValue('taxBenefitAwareness', incomeDetailData?.taxBenefitAwareness);

      setValue(
        'whereDidYouHearAboutUs',
        incomeDetailData?.whereDidYouHearAboutUs,
      );

      if (incomeDetailData?.receiveAnnualCashBonus) {
        setValue(
          'lastYearAnnualCashBonus',
          incomeDetailData?.lastYearAnnualCashBonus,
        );
        setValue(
          'thisYearAnnualCashBonus',
          incomeDetailData?.thisYearAnnualCashBonus,
        );
      }

      if (incomeDetailData?.receiveStockUnit) {
        setValue(
          'thisYearStockOptions',
          incomeDetailData?.thisYearStockOptions,
        );
        setValue(
          'lastYearStockOptions',
          incomeDetailData?.lastYearStockOptions,
        );
      }

      if (incomeDetailData.nonPropertyLoan > 0) {
        for (let i = 1; i <= incomeDetailData.nonPropertyLoan; i++) {
          const propertyTypeField =
            `nonPropertyLoanType${i}` as keyof IncomeDetailFormType;
          const propertyCurrency =
            `nonPropertyLoanCurrency${i}` as keyof IncomeDetailFormType;
          const propertyBalance =
            `nonPropertyLoanBalance${i}` as keyof IncomeDetailFormType;
          const repaymentTerm =
            `nonPropertyLoanRepaymentTerm${i}` as keyof IncomeDetailFormType;
          const repaymentSum =
            `nonPropertyLoanRepaymentSum${i}` as keyof IncomeDetailFormType;
          const repaymentFrequency =
            `nonPropertyLoanRepaymentFrequency${i}` as keyof IncomeDetailFormType;

          setValue(propertyTypeField, incomeDetailData[propertyTypeField]);
          setValue(propertyCurrency, incomeDetailData[propertyCurrency]);
          setValue(propertyBalance, incomeDetailData[propertyBalance]);
          setValue(repaymentTerm, incomeDetailData[repaymentTerm]);
          setValue(repaymentSum, incomeDetailData[repaymentSum]);
          setValue(repaymentFrequency, incomeDetailData[repaymentFrequency]);
        }
      }

      setValue('coapplicantExists', incomeDetailData?.coapplicantExists);

      if (incomeDetailData?.coapplicantExists) {
        setValue(
          'coapplicantFirstName',
          incomeDetailData?.coapplicantFirstName,
        );
        setValue('coapplicantLastName', incomeDetailData?.coapplicantLastName);
        setValue('coapplicantEmail', incomeDetailData?.coapplicantEmail);
        setValue('coapplicantPhone', incomeDetailData?.coapplicantPhone);
        setValue(
          'coapplicantRelationship',
          incomeDetailData?.coapplicantRelationship,
        );
        setValue(
          'coapplicantCreditCardCurrency',
          incomeDetailData?.coapplicantCreditCardCurrency,
        );
        setValue(
          'coapplicantCreditCardLimit',
          incomeDetailData?.coapplicantCreditCardLimit,
        );
        setValue(
          'coapplicantVisaSubClass',
          incomeDetailData?.coapplicantVisaSubClass,
        );
        setValue(
          'coapplicantVisaExpiryDate',
          incomeDetailData?.coapplicantVisaExpiryDate,
        );
        setValue(
          'coapplicantNonPropertyLoan',
          incomeDetailData?.coapplicantNonPropertyLoan,
        );
        setValue(
          'coapplicantCitizenship',
          incomeDetailData?.coapplicantCitizenship,
        );
        setValue(
          'coapplicantLivingTogether',
          incomeDetailData?.coapplicantLivingTogether,
        );
        setValue(
          'coapplicantIncomeSource',
          incomeDetailData?.coapplicantIncomeSource,
        );
        if (incomeDetailData?.coapplicantIncomeSource === 'employee') {
          setValue(
            'coapplicantJobStartMonth',
            incomeDetailData?.coapplicantJobStartMonth,
          );
          setValue(
            'coapplicantJobStartYear',
            incomeDetailData?.coapplicantJobStartYear,
          );
          setValue(
            'coapplicantOccupation',
            incomeDetailData?.coapplicantOccupation,
          );
          setValue(
            'coapplicantSalaryCurrency',
            incomeDetailData?.coapplicantSalaryCurrency,
          );
          setValue(
            'coapplicantBaseSalary',
            incomeDetailData?.coapplicantBaseSalary,
          );
          setValue(
            'coapplicantSalaryFrequency',
            incomeDetailData?.coapplicantSalaryFrequency,
          );
          setValue(
            'coapplicantReceiveAllowanceIncome',
            incomeDetailData?.coapplicantReceiveAllowanceIncome,
          );
          setValue(
            'coapplicantAllowanceIncome',
            incomeDetailData?.coapplicantAllowanceIncome,
          );
          setValue(
            'coapplicantAllowanceFrequency',
            incomeDetailData?.coapplicantAllowanceFrequency,
          );
          setValue(
            'coapplicantTypeOfAllowanceIncome',
            incomeDetailData?.coapplicantTypeOfAllowanceIncome,
          );
          setValue(
            'coapplicantReceiveCommissionIncome',
            incomeDetailData?.coapplicantReceiveCommissionIncome,
          );
          setValue(
            'coapplicantCommissionIncome',
            incomeDetailData?.coapplicantCommissionIncome,
          );
          setValue(
            'coapplicantCommissionFrequency',
            incomeDetailData?.coapplicantCommissionFrequency,
          );
          setValue(
            'coapplicantReceiveAnnualCashBonus',
            incomeDetailData?.coapplicantReceiveAnnualCashBonus,
          );
          if (incomeDetailData?.coapplicantReceiveAnnualCashBonus) {
            setValue(
              'coapplicantThisYearAnnualCashBonus',
              incomeDetailData?.coapplicantThisYearAnnualCashBonus,
            );
            setValue(
              'coapplicantLastYearAnnualCashBonus',
              incomeDetailData?.coapplicantLastYearAnnualCashBonus,
            );
          }
          setValue(
            'coapplicantReceiveStockUnit',
            incomeDetailData?.coapplicantReceiveStockUnit,
          );
          if (incomeDetailData?.coapplicantReceiveStockUnit) {
            setValue(
              'coapplicantThisYearStockOptions',
              incomeDetailData?.coapplicantThisYearStockOptions,
            );
            setValue(
              'coapplicantLastYearStockOptions',
              incomeDetailData?.coapplicantLastYearStockOptions,
            );
          }
        }

        if (
          incomeDetailData?.coapplicantIncomeSource ===
          'self_employed_trader_or_contractor'
        ) {
          setValue(
            'coapplicantOperationStartMonth',
            incomeDetailData?.coapplicantOperationStartMonth,
          );
          setValue(
            'coapplicantOperationStartYear',
            incomeDetailData?.coapplicantOperationStartYear,
          );
          setValue(
            'coapplicantIndustry',
            incomeDetailData?.coapplicantIndustry,
          );
          setValue(
            'coapplicantCompanySalaryCurrency',
            incomeDetailData?.coapplicantCompanySalaryCurrency,
          );
          setValue(
            'coapplicantThisYearPersonalNetIncomeAfterTaxes',
            incomeDetailData?.coapplicantThisYearPersonalNetIncomeAfterTaxes,
          );
          setValue(
            'coapplicantLastYearPersonalNetIncomeAfterTaxes',
            incomeDetailData?.coapplicantLastYearPersonalNetIncomeAfterTaxes,
          );
        }

        if (
          incomeDetailData?.coapplicantIncomeSource === 'self_employed_company'
        ) {
          setValue(
            'coapplicantOperationStartMonth',
            incomeDetailData?.coapplicantOperationStartMonth,
          );
          setValue(
            'coapplicantOperationStartYear',
            incomeDetailData?.coapplicantOperationStartYear,
          );
          setValue(
            'coapplicantIndustry',
            incomeDetailData?.coapplicantIndustry,
          );
          setValue(
            'coapplicantCompanySalaryCurrency',
            incomeDetailData?.coapplicantCompanySalaryCurrency,
          );
          setValue(
            'coapplicantThisYearPersonalNetIncomeAfterTaxes',
            incomeDetailData?.coapplicantThisYearPersonalNetIncomeAfterTaxes,
          );
          setValue(
            'coapplicantLastYearPersonalNetIncomeAfterTaxes',
            incomeDetailData?.coapplicantLastYearPersonalNetIncomeAfterTaxes,
          );
          setValue(
            'coapplicantOwnershipPercentage',
            incomeDetailData?.coapplicantOwnershipPercentage,
          );
          setValue(
            'coapplicantThisYearCompanyNetIncomeAfterTaxes',
            incomeDetailData?.coapplicantThisYearCompanyNetIncomeAfterTaxes,
          );
          setValue(
            'coapplicantLastYearCompanyNetIncomeAfterTaxes',
            incomeDetailData?.coapplicantLastYearCompanyNetIncomeAfterTaxes,
          );
        }

        if (
          incomeDetailData?.coapplicantNonPropertyLoan &&
          incomeDetailData.coapplicantNonPropertyLoan > 0
        ) {
          for (
            let i = 1;
            i <= incomeDetailData.coapplicantNonPropertyLoan;
            i++
          ) {
            const propertyTypeField =
              `coapplicantNonPropertyLoanType${i}` as keyof IncomeDetailFormType;
            const propertyCurrency =
              `coapplicantNonPropertyLoanCurrency${i}` as keyof IncomeDetailFormType;
            const propertyBalance =
              `coapplicantNonPropertyLoanBalance${i}` as keyof IncomeDetailFormType;
            const repaymentTerm =
              `coapplicantNonPropertyLoanRepaymentTerm${i}` as keyof IncomeDetailFormType;
            const repaymentSum =
              `coapplicantNonPropertyLoanRepaymentSum${i}` as keyof IncomeDetailFormType;
            const repaymentFrequency =
              `coapplicantNonPropertyLoanRepaymentFrequency${i}` as keyof IncomeDetailFormType;

            setValue(propertyTypeField, incomeDetailData[propertyTypeField]);
            setValue(propertyCurrency, incomeDetailData[propertyCurrency]);
            setValue(propertyBalance, incomeDetailData[propertyBalance]);
            setValue(repaymentTerm, incomeDetailData[repaymentTerm]);
            setValue(repaymentSum, incomeDetailData[repaymentSum]);
            setValue(repaymentFrequency, incomeDetailData[repaymentFrequency]);
          }
        }
      }
    }
  }, [incomeDetailData]);

  const watchIncomeSource = watch('incomeSource');
  const watchSalaryCurrency = watch('salaryCurrency');
  const watchCompanySalaryCurrency = watch('companySalaryCurrency');
  const watchNonProperties = watch('nonPropertyLoan') || 0;
  const watchCreditCardCurrency = watch('creditCardCurrency');
  const watchAllowanceIncome = watch('receiveAllowanceIncome');
  const watchCommissionIncome = watch('receiveCommissionIncome');
  const watchAnnualCashBonus = watch('receiveAnnualCashBonus');
  const watchStockUnit = watch('receiveStockUnit');

  const watchCoapplicantExists = watch('coapplicantExists');

  const watchCoapplicantIncomeSource = watch('coapplicantIncomeSource');
  const watchCoapplicantAllowanceIncome = watch(
    'coapplicantReceiveAllowanceIncome',
  );
  const watchCoapplicantCommissionIncome = watch(
    'coapplicantReceiveCommissionIncome',
  );
  const watchCoapplicantAnnualCashBonus = watch(
    'coapplicantReceiveAnnualCashBonus',
  );
  const watchCoapplicantStockUnit = watch('coapplicantReceiveStockUnit');
  const watchCoapplicationNonProperty =
    watch('coapplicantNonPropertyLoan') || 0;
  const watchCoapplicantSalaryCurrency = watch('coapplicantSalaryCurrency');
  const watchCoapplicantCompanySalaryCurrency = watch(
    'coapplicantCompanySalaryCurrency',
  );
  const watchCoapplicantCitizenship = watch('coapplicantCitizenship');
  const watchCoapplicantCreditCardCurrency = watch(
    'coapplicantCreditCardCurrency',
  );

  const onSubmit = (data: IncomeDetailFormType) => {
    const payload: IncomeDetailPayload = {
      data,
      step: 'income_detail',
      ...(id ? { application_id: id } : {}),
    };
    postPurchaseRequest(payload)
      .unwrap()
      .then((res) => {
        displaySuccess('Successfully submitted details.');
        navigate(`/mortgage/purchase`, { replace: true });
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
    const route = `${purchaseFormRoutes['property_detail']}/${id}`;
    navigate(route);
  };

  return (
    <StepperFormLayout
      showBackButton={true}
      handleSubmit={handleFormSubmit}
      handleBackClick={handleBackClick}
      nextBtnText="Submit Assessment Form"
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
                  id={id || ''}
                  completedStep={3}
                  totalSteps={4}
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
                      title={incomeDetailLabelMapper['incomeSource']}
                      subTitle="Enter the maximum purchase price you’d consider for your new property."
                    />

                    <ListOptionsField
                      name="incomeSource"
                      options={INCOME_SOURCE_OPTIONS}
                      error={errors.incomeSource?.message ?? ''}
                      control={control}
                      cols={2}
                    />
                  </div>
                </Col>
                {watchIncomeSource === 'employee' && (
                  <EmployeeFields
                    control={control}
                    errors={errors}
                    watchSalaryCurrency={watchSalaryCurrency}
                    watchAllowanceIncome={watchAllowanceIncome}
                    watchCommissionIncome={watchCommissionIncome}
                    watchAnnualCashBonus={watchAnnualCashBonus}
                    watchStockUnit={watchStockUnit}
                  />
                )}
                {watchIncomeSource === 'self_employed_trader_or_contractor' && (
                  <ContractorField
                    control={control}
                    errors={errors}
                    watchSalaryCurrency={watchCompanySalaryCurrency}
                    watchAllowanceIncome={watchAllowanceIncome}
                    watchCommissionIncome={watchCommissionIncome}
                    watchAnnualCashBonus={watchAnnualCashBonus}
                    watchStockUnit={watchStockUnit}
                  />
                )}
                {watchIncomeSource === 'self_employed_company' && (
                  <CompanyField
                    control={control}
                    errors={errors}
                    watchSalaryCurrency={watchCompanySalaryCurrency}
                    watchAllowanceIncome={watchAllowanceIncome}
                    watchCommissionIncome={watchCommissionIncome}
                    watchAnnualCashBonus={watchAnnualCashBonus}
                    watchStockUnit={watchStockUnit}
                  />
                )}

                <Col xs={24}>
                  <div className="form-section-header form-control">
                    <FormFieldHeading
                      total={total}
                      current={2}
                      title={incomeDetailLabelMapper['nonPropertyLoan']}
                      subTitle="We need these to assess your tax situation to give you the best tax outcome."
                    />

                    <ListOptionsField
                      name="nonPropertyLoan"
                      options={NON_PROPERTY_LOAN_OPTIONS}
                      error={errors.nonPropertyLoan?.message ?? ''}
                      control={control}
                      cols={5}
                    />
                  </div>
                </Col>
                {Array.from({ length: watchNonProperties }, (_, index) => {
                  const fieldIndex = index + 1;
                  return (
                    <Col xs={24} key={fieldIndex}>
                      <div className="form-section-header form-control">
                        <FormFieldHeading
                          topbarTitle={`Non-property Loan ${fieldIndex} Details`}
                          title={incomeDetailLabelMapper['nonPropertyLoanType']}
                          subTitle="We need these to assess your tax situation to give you the best tax outcome."
                        />
                        <ListOptionsField
                          name={`nonPropertyLoanType${fieldIndex}`}
                          options={LOAN_TYPE_OPTIONS}
                          error={
                            (errors as any)[`nonPropertyLoanType${fieldIndex}`]
                              ?.message ?? ''
                          }
                          control={control}
                          cols={2}
                        />
                      </div>
                      <Row gutter={30}>
                        <Col xs={24} md={12}>
                          <SelectField
                            options={currencies}
                            name={`nonPropertyLoanCurrency${fieldIndex}`}
                            control={control}
                            size="large"
                            label="Currency"
                            placeholder="Select currency type"
                            error={
                              (errors as any)[
                                `nonPropertyLoanCurrency${fieldIndex}`
                              ]?.message ?? ''
                            }
                          />
                        </Col>
                        <Col xs={24} md={12}>
                          <InputField
                            label="Loan Balance"
                            name={`nonPropertyLoanBalance${fieldIndex}`}
                            control={control}
                            error={
                              (errors as any)[
                                `nonPropertyLoanBalance${fieldIndex}`
                              ]?.message ?? ''
                            }
                            placeholder="Enter your loan balance"
                            size="large"
                            type="number"
                          />
                        </Col>
                        <Col xs={24} md={12}>
                          <InputField
                            label="Repayment loan term"
                            name={`nonPropertyLoanRepaymentTerm${fieldIndex}`}
                            control={control}
                            error={
                              (errors as any)[
                                `nonPropertyLoanRepaymentTerm${fieldIndex}`
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
                            name={`nonPropertyLoanRepaymentSum${fieldIndex}`}
                            control={control}
                            error={
                              (errors as any)[
                                `nonPropertyLoanRepaymentSum${fieldIndex}`
                              ]?.message ?? ''
                            }
                            placeholder="Your repayment Sum"
                            size="large"
                            type="number"
                          />
                        </Col>
                        <Col xs={24}>
                          <ListOptionsField
                            name={`nonPropertyLoanRepaymentFrequency${fieldIndex}`}
                            options={FREQUENCY_OPTIONS}
                            label="Repayment Frequency"
                            error={
                              (errors as any)[
                                `nonPropertyLoanRepaymentFrequency${fieldIndex}`
                              ]?.message ?? ''
                            }
                            control={control}
                            cols={2}
                          />
                        </Col>
                      </Row>
                    </Col>
                  );
                })}

                <Col xs={24}>
                  <div className="form-section-header form-control">
                    <FormFieldHeading
                      total={total}
                      current={3}
                      title={incomeDetailLabelMapper['creditCard']}
                      subTitle="We need these to assess your tax situation to give you the best tax outcome."
                    />
                  </div>
                  <Row gutter={30}>
                    <Col xs={24} md={12}>
                      <SelectField
                        options={currencies}
                        name="creditCardCurrency"
                        control={control}
                        size="large"
                        showSearch={true}
                        label="Credit Card Currency"
                        placeholder="Select currency type"
                        error={errors?.creditCardCurrency?.message ?? ''}
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <InputField
                        label="Credit Card Limit Amount"
                        name="creditCardLimit"
                        control={control}
                        error={errors?.creditCardLimit?.message ?? ''}
                        placeholder="Enter your credit card limit"
                        size="large"
                        type="number"
                        prefix={watchCreditCardCurrency ?? ''}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col xs={24}>
                  <div className="form-section-header form-control">
                    <FormFieldHeading
                      total={total}
                      current={4}
                      title="Buying this property with someone else?"
                      subTitle="We need these to assess your tax situation to give you the best tax outcome."
                    />
                  </div>
                  <Row gutter={30}>
                    <Col xs={24}>
                      <ListOptionsField
                        name="coapplicantExists"
                        options={AGREE_OPTIONS}
                        label="Buying this property with someone else?"
                        control={control}
                        error={errors?.coapplicantExists?.message ?? ''}
                        cols={2}
                      />
                    </Col>
                  </Row>
                  {watchCoapplicantExists && (
                    <>
                      <div className="form-section-header form-control">
                        <FormFieldHeading title="Coapplicant Details" />
                      </div>
                      <Row gutter={30}>
                        <Col xs={24} md={12}>
                          <InputField
                            label="Coapplicant First Name"
                            name="coapplicantFirstName"
                            control={control}
                            error={errors?.coapplicantFirstName?.message ?? ''}
                            placeholder="Enter your first name"
                            size="large"
                          />
                        </Col>
                        <Col xs={24} md={12}>
                          <InputField
                            label="Coapplicant Last Name"
                            name="coapplicantLastName"
                            control={control}
                            error={errors?.coapplicantLastName?.message ?? ''}
                            placeholder="Enter your last name"
                            size="large"
                          />
                        </Col>
                        <Col xs={24} md={12}>
                          <InputField
                            label="Coapplicant Email"
                            name="coapplicantEmail"
                            control={control}
                            error={errors?.coapplicantEmail?.message ?? ''}
                            placeholder="Enter your email"
                            size="large"
                          />
                        </Col>
                        <Col xs={24} md={12}>
                          <InputField
                            label="Coapplicant Phone"
                            name="coapplicantPhone"
                            control={control}
                            error={errors?.coapplicantPhone?.message ?? ''}
                            placeholder="Enter your phone"
                            size="large"
                          />
                        </Col>
                        <Col xs={24}>
                          <ListOptionsField
                            name="coapplicantRelationship"
                            options={RELATIONSHIP_OPTIONS}
                            control={control}
                            label="Coapplicant Relationship"
                            cols={2}
                            error={
                              errors?.coapplicantRelationship?.message ?? ''
                            }
                          />
                        </Col>
                        <Col xs={24}>
                          <SelectField
                            options={CITIZENSHIP_OPTIONS}
                            name="coapplicantCitizenship"
                            control={control}
                            label="Coapplicant Citizenship"
                            error={
                              errors?.coapplicantCitizenship?.message ?? ''
                            }
                            size="large"
                          />
                        </Col>
                        {(watchCoapplicantCitizenship ===
                          'australian_pr_visa' ||
                          watchCoapplicantCitizenship ===
                            'australian_tr_visa') && (
                          <>
                            <Col xs={24} md={12}>
                              <InputField
                                label="Visa Sub-Class"
                                name="coapplicantVisaSubClass"
                                control={control}
                                error={
                                  errors.coapplicantVisaSubClass?.message ?? ''
                                }
                                placeholder="Eg: Skilled Visa"
                                size="large"
                              />
                            </Col>
                            <Col xs={24} md={12}>
                              <DatePickerField
                                label="Visa Expiry Date"
                                name="coapplicantVisaExpiryDate"
                                control={control}
                                error={
                                  errors.coapplicantVisaExpiryDate?.message ??
                                  ''
                                }
                                size="large"
                                placeholder="Select Visa Expiry Date"
                                minDate={dayjs()}
                              />
                            </Col>
                          </>
                        )}
                        <Col xs={24}>
                          <ListOptionsField
                            name="coapplicantLivingTogether"
                            options={AGREE_OPTIONS}
                            control={control}
                            label="Coapplicant Living Together"
                            cols={2}
                            error={
                              errors?.coapplicantLivingTogether?.message ?? ''
                            }
                          />
                        </Col>
                        <Col xs={24}>
                          <div className="form-section-header form-control">
                            <FormFieldHeading title="Coapplicant Income Source" />
                          </div>
                        </Col>
                        <Col xs={24}>
                          <ListOptionsField
                            name="coapplicantIncomeSource"
                            options={INCOME_SOURCE_OPTIONS}
                            control={control}
                            label="Coapplicant Income Source"
                            cols={2}
                            error={
                              errors?.coapplicantIncomeSource?.message ?? ''
                            }
                          />
                        </Col>
                        {watchCoapplicantIncomeSource === 'employee' && (
                          <CoapplicantEmployeeField
                            control={control}
                            errors={errors}
                            watchSalaryCurrency={watchCoapplicantSalaryCurrency}
                            watchAllowanceIncome={
                              watchCoapplicantAllowanceIncome
                            }
                            watchCommissionIncome={
                              watchCoapplicantCommissionIncome
                            }
                            watchAnnualCashBonus={
                              watchCoapplicantAnnualCashBonus
                            }
                            watchStockUnit={watchCoapplicantStockUnit}
                          />
                        )}
                        {watchCoapplicantIncomeSource ===
                          'self_employed_trader_or_contractor' && (
                          <CoapplicantContractorField
                            control={control}
                            errors={errors}
                            watchSalaryCurrency={
                              watchCoapplicantCompanySalaryCurrency
                            }
                            watchAllowanceIncome={
                              watchCoapplicantAllowanceIncome
                            }
                            watchCommissionIncome={
                              watchCoapplicantCommissionIncome
                            }
                            watchAnnualCashBonus={
                              watchCoapplicantAnnualCashBonus
                            }
                            watchStockUnit={watchCoapplicantStockUnit}
                          />
                        )}
                        {watchCoapplicantIncomeSource ===
                          'self_employed_company' && (
                          <CoapplicantCompanyField
                            control={control}
                            errors={errors}
                            watchSalaryCurrency={
                              watchCoapplicantCompanySalaryCurrency
                            }
                            watchAllowanceIncome={
                              watchCoapplicantAllowanceIncome
                            }
                            watchCommissionIncome={
                              watchCoapplicantCommissionIncome
                            }
                            watchAnnualCashBonus={
                              watchCoapplicantAnnualCashBonus
                            }
                            watchStockUnit={watchCoapplicantStockUnit}
                          />
                        )}
                        <Col xs={24}>
                          <div className="form-section-header form-control">
                            <FormFieldHeading
                              title={
                                incomeDetailLabelMapper[
                                  'coapplicantNonPropertyLoan'
                                ]
                              }
                              subTitle="We need these to assess your tax situation to give you the best tax outcome."
                            />

                            <ListOptionsField
                              name="coapplicantNonPropertyLoan"
                              options={NON_PROPERTY_LOAN_OPTIONS}
                              error={
                                errors.coapplicantNonPropertyLoan?.message ?? ''
                              }
                              control={control}
                              cols={5}
                            />
                          </div>
                        </Col>
                        {Array.from(
                          { length: watchCoapplicationNonProperty },
                          (_, index) => {
                            const fieldIndex = index + 1;
                            return (
                              <Col xs={24} key={fieldIndex}>
                                <div className="form-section-header form-control">
                                  <FormFieldHeading
                                    topbarTitle={`Non-property Loan ${fieldIndex} Details`}
                                    title={
                                      incomeDetailLabelMapper[
                                        'nonPropertyLoanType'
                                      ]
                                    }
                                    subTitle="We need these to assess your tax situation to give you the best tax outcome."
                                  />
                                  <ListOptionsField
                                    name={`coapplicantNonPropertyLoanType${fieldIndex}`}
                                    options={LOAN_TYPE_OPTIONS}
                                    error={
                                      (errors as any)[
                                        `coapplicantNonPropertyLoanType${fieldIndex}`
                                      ]?.message ?? ''
                                    }
                                    control={control}
                                    cols={2}
                                  />
                                </div>
                                <Row gutter={30}>
                                  <Col xs={24} md={12}>
                                    <SelectField
                                      options={currencies}
                                      name={`coapplicantNonPropertyLoanCurrency${fieldIndex}`}
                                      control={control}
                                      size="large"
                                      label="Currency"
                                      placeholder="Select currency type"
                                      error={
                                        (errors as any)[
                                          `coapplicantNonPropertyLoanCurrency${fieldIndex}`
                                        ]?.message ?? ''
                                      }
                                    />
                                  </Col>
                                  <Col xs={24} md={12}>
                                    <InputField
                                      label="Loan Balance"
                                      name={`coapplicantNonPropertyLoanBalance${fieldIndex}`}
                                      control={control}
                                      error={
                                        (errors as any)[
                                          `coapplicantNonPropertyLoanBalance${fieldIndex}`
                                        ]?.message ?? ''
                                      }
                                      placeholder="Enter your loan balance"
                                      size="large"
                                      type="number"
                                    />
                                  </Col>
                                  <Col xs={24} md={12}>
                                    <InputField
                                      label="Repayment loan term"
                                      name={`coapplicantNonPropertyLoanRepaymentTerm${fieldIndex}`}
                                      control={control}
                                      error={
                                        (errors as any)[
                                          `coapplicantNonPropertyLoanRepaymentTerm${fieldIndex}`
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
                                      name={`coapplicantNonPropertyLoanRepaymentSum${fieldIndex}`}
                                      control={control}
                                      error={
                                        (errors as any)[
                                          `coapplicantNonPropertyLoanRepaymentSum${fieldIndex}`
                                        ]?.message ?? ''
                                      }
                                      placeholder="Your repayment Sum"
                                      size="large"
                                      type="number"
                                    />
                                  </Col>
                                  <Col xs={24}>
                                    <ListOptionsField
                                      name={`coapplicantNonPropertyLoanRepaymentFrequency${fieldIndex}`}
                                      options={FREQUENCY_OPTIONS}
                                      label="Repayment Frequency"
                                      error={
                                        (errors as any)[
                                          `coapplicantNonPropertyLoanRepaymentFrequency${fieldIndex}`
                                        ]?.message ?? ''
                                      }
                                      control={control}
                                      cols={2}
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            );
                          },
                        )}
                      </Row>
                      <div className="form-section-header form-control">
                        <FormFieldHeading
                          title="Coapplicant Credit Card Details"
                          subTitle="Please share details about coapplicant you think might help us understand your referral source."
                        />
                        <Row gutter={30}>
                          <Col xs={24} md={12}>
                            <SelectField
                              options={currencies}
                              name="coapplicantCreditCardCurrency"
                              control={control}
                              size="large"
                              showSearch={true}
                              label="Credit Card Currency"
                              placeholder="Select currency type"
                              error={
                                errors?.coapplicantCreditCardCurrency
                                  ?.message ?? ''
                              }
                            />
                          </Col>
                          <Col xs={24} md={12}>
                            <InputField
                              label="Credit Card Limit Amount"
                              name="coapplicantCreditCardLimit"
                              control={control}
                              error={
                                errors?.coapplicantCreditCardLimit?.message ??
                                ''
                              }
                              placeholder="Enter your credit card limit"
                              size="large"
                              type="number"
                              prefix={watchCoapplicantCreditCardCurrency ?? ''}
                            />
                          </Col>
                        </Row>
                      </div>
                    </>
                  )}
                </Col>
                <Col xs={24}>
                  <div className="form-section-header form-control">
                    <FormFieldHeading
                      total={total}
                      current={5}
                      title={incomeDetailLabelMapper['whereDidYouHearAboutUs']}
                      subTitle="Please share any additional information you think might help us understand your referral source."
                    />
                    <SelectField
                      name="taxBenefitAwareness"
                      control={control}
                      options={ADDITIONAL_TAX_BENEFITS}
                      label="Are you aware of the tax benefits available to overseas residents with Australian property investments?"
                      error={errors?.taxBenefitAwareness?.message ?? ''}
                      size="large"
                    />

                    <SelectField
                      name="whereDidYouHearAboutUs"
                      control={control}
                      options={WHERE_DID_YOU_HEAR_ABOUT_US_OPTIONS}
                      label="Where did you hear about us?"
                      error={errors?.whereDidYouHearAboutUs?.message ?? ''}
                      size="large"
                    />
                  </div>
                </Col>

                <Col xs={24}>
                  <div className="form-section-header form-control">
                    <FormFieldHeading
                      total={total}
                      current={6}
                      title={incomeDetailLabelMapper['userMessage']}
                      subTitle="If there’s anything else that you’d want us to know kindly write it down in the text-area below"
                    />
                    <TextAreaField
                      name="userMessage"
                      control={control}
                      error={errors?.userMessage?.message ?? ''}
                      placeholder="Type your message here."
                      size="large"
                      rows={4}
                    />
                  </div>
                  <MessageBox style={{ marginTop: '3rem' }}>
                    <Typography.Title level={5} style={{ marginTop: '0' }}>
                      Note: Please ensure you have answered all questions before
                      submitting. The more accurate your answers, the more
                      accurate your assessment.
                    </Typography.Title>
                    <Typography.Paragraph style={{ marginBottom: '0' }}>
                      We are collecting your personal information to assist you
                      with your home loan application or any other ancillary
                      products. By clicking the submit button you have read,
                      consented and agree to be bound by our Privacy
                      Policy & Credit Guide.
                    </Typography.Paragraph>
                  </MessageBox>
                </Col>

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

export default IncomeDetail;
