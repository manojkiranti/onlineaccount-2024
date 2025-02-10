import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';

import { Button, Col, Row } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { Container, FormFieldHeading } from '@/components/Elements';
import { PersonalDetailFormType } from '../types';
import { useCountryOptions } from '@/hooks/useCountryOptions';
import {
  DatePickerField,
  FormLabel,
  InputField,
  ListOptionsField,
  SelectField,
} from '@/components/Form';

import useUnsavedChangesWarning from '@/hooks/useUnsavedChangesWarning';
import StepperFormLayout from '@/components/Layout/StepperFormLayout';
import {
  personalDetailLabelMapper,
  personalDetailSchema,
} from '../schema/personalDetailSchema';
import {
  AGREE_OPTIONS,
  CITIZENSHIP_OPTIONS,
  FREQUENCY_OPTIONS,
  MARITIAL_STATUS_OPTIONS,
  RESIDENTIAL_STATUS_OPTIONS,
} from '@/constant/options';
import { purchaseFormRoutes } from '../constant/stepperRoutes';
import useScrollToTop from '@/hooks/useScrollTop';
import {
  useGetPurchaseStepDetailQuery,
  usePostPurchaseRequestMutation,
} from '@/pages/mortgage/apis/purchaseAPI';
import { displayError, displaySuccess } from '@/utils/displayMessageUtils';
import { useFetchUserProfileQuery } from '@/store/apis/userApi';
import { stepData } from '../constant/stepData';
import StepProgress from '@/components/StepProgress/StepProgress';

const PersonalDetail = () => {
  const { id } = useParams();
  useUnsavedChangesWarning(true);
  useScrollToTop();
  const countryOptions = useCountryOptions();
  const navigate = useNavigate();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const total = 5;
  const [postPurchaseRequest] = usePostPurchaseRequestMutation();
  const {
    data: personalDetailApiResponse,
    error: fetchPersonalDetailError,
    isLoading: fetchPersonalDetailLoading,
  } = useGetPurchaseStepDetailQuery(
    { application_id: id!, step: 'personal_detail' },
    { skip: !id, refetchOnMountOrArgChange: true },
  );

  const personalDetailData = personalDetailApiResponse?.data
    .data as PersonalDetailFormType;

  const {
    data: userProfileData,
    error: userProfileDataError,
    isLoading: userProfileDataLoading,
  } = useFetchUserProfileQuery(undefined, {
    skip: false,
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PersonalDetailFormType>({
    defaultValues: {},
    resolver: yupResolver(personalDetailSchema),
  });

  useEffect(() => {
    if (personalDetailData) {
      setValue('citizenship', personalDetailData?.citizenship);
      setValue('visaSubClass', personalDetailData?.visaSubClass);
      setValue('visaExpiryDate', personalDetailData?.visaExpiryDate);
      setValue('country', personalDetailData?.country);
      setValue('permanentResident', personalDetailData?.permanentResident);
      setValue(
        'currentResidentalStatus',
        personalDetailData?.currentResidentalStatus,
      );
      setValue(
        'residentalOtherSpecification',
        personalDetailData?.residentalOtherSpecification,
      );
      setValue('maritalStatus', personalDetailData?.maritalStatus);
      setValue('dependentChildren', personalDetailData?.dependentChildren);
      setValue('numberOfDependents', personalDetailData?.numberOfDependents);
      if (personalDetailData.currentResidentalStatus === 'renting') {
        setValue('rentExpense', personalDetailData.rentExpense ?? 0);
        setValue('frequencyOfRent', personalDetailData.frequencyOfRent ?? '');
      }
      if (personalDetailData.currentResidentalStatus === 'live_own_place') {
        setValue(
          'isTheResidentialPlaceMortgaged',
          personalDetailData.isTheResidentialPlaceMortgaged ?? false,
        );
      }
    } else if (userProfileData) {
      const userDetail = userProfileData.data.common_data;
      setValue('citizenship', userDetail.citizenship ?? '');
      setValue('country', userDetail.country ?? '');
      setValue('maritalStatus', userDetail.maritalStatus ?? '');
      setValue('permanentResident', userDetail.permanentResident ?? false);
    }
  }, [personalDetailData, userProfileData]);

  const watchCitizenship = watch('citizenship');
  const watchCurrentResidentalStatus = watch('currentResidentalStatus');
  const watchMaritalStatus = watch('maritalStatus');
  const watchDependentChildren = watch('dependentChildren');

  const onSubmit = (data: PersonalDetailFormType) => {
    postPurchaseRequest({
      data,
      step: 'personal_detail',
      application_id: id,
    })
      .unwrap()
      .then((res) => {
        displaySuccess('Successfully submitted details.');
        navigate(`${purchaseFormRoutes['property_detail']}/${id}`);
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
    navigate(`${purchaseFormRoutes['purchase_detail']}/${id}`);
  };

  const fieldOrder = [
    'citizenship',
    'visaDetails',
    'permanentResident',
    'currentResidentalStatus',
    'residentalDetails',
    'maritalStatus',
    'maritalDetails',
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
            totalSteps={4}
            id={id || ''}
            formId="purchase_detail"
            stepData={stepData}
          />
        </Row>
        <Row>
          <Col xs={24}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row gutter={30}>
                <Col xs={24}>
                  <div
                    className="form-section-header form-control"
                    id="citizenship"
                  >
                    <FormFieldHeading
                      total={total}
                      current={1}
                      title={personalDetailLabelMapper['citizenship']}
                      subTitle="We need these to assess your tax situation to give you the best tax outcome."
                    />

                    <ListOptionsField
                      name="citizenship"
                      options={CITIZENSHIP_OPTIONS}
                      error={errors.citizenship?.message}
                      control={control}
                      cols={2}
                      scrollToNextField={scrollToNextField}
                    />
                  </div>
                </Col>
                {(watchCitizenship === 'australian_pr_visa' ||
                  watchCitizenship === 'australian_tr_visa') && (
                  <>
                    <Col id="visaDetails" xs={24} md={12}>
                      <InputField
                        label="Visa Sub-Class"
                        name="visaSubClass"
                        control={control}
                        error={errors.visaSubClass?.message ?? ''}
                        placeholder="Eg: Skilled Visa"
                        size="large"
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <DatePickerField
                        label="Visa Expiry Date"
                        name="visaExpiryDate"
                        control={control}
                        error={errors.visaExpiryDate?.message ?? ''}
                        size="large"
                        placeholder="Select Visa Expiry Date"
                        minDate={dayjs()}
                      />
                    </Col>
                  </>
                )}

                <Col xs={24}>
                  <div className="form-section-header form-control">
                    <FormFieldHeading
                      total={total}
                      current={2}
                      title={personalDetailLabelMapper['country']}
                      subTitle="Notes/ information that we want to relay to the user about the property type"
                    />

                    <SelectField
                      showSearch={true}
                      options={countryOptions}
                      name="country"
                      filterName="country"
                      control={control}
                      size="large"
                      placeholder="Select your country"
                      error={errors.country?.message ?? ''}
                    />
                  </div>
                </Col>

                <Col xs={24}>
                  <FormLabel
                    style={{ marginBottom: '1rem', fontWeight: 600 }}
                    label={personalDetailLabelMapper['permanentResident']}
                  />
                  <ListOptionsField
                    name="permanentResident"
                    options={AGREE_OPTIONS}
                    error={errors.permanentResident?.message}
                    control={control}
                    cols={2}
                    scrollToNextField={scrollToNextField}
                  />
                </Col>

                <Col xs={24}>
                  <div
                    className="form-section-header form-control"
                    id="currentResidentalStatus"
                  >
                    <FormFieldHeading
                      total={total}
                      current={3}
                      title={
                        personalDetailLabelMapper['currentResidentalStatus']
                      }
                      subTitle="We need these to assess your tax situation to give you the best tax outcome."
                    />

                    <ListOptionsField
                      name="currentResidentalStatus"
                      options={RESIDENTIAL_STATUS_OPTIONS}
                      error={errors.currentResidentalStatus?.message}
                      control={control}
                      cols={2}
                      scrollToNextField={scrollToNextField}
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={[30, 30]} id="residentalDetails">
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
                      error={
                        errors.isTheResidentialPlaceMortgaged?.message ?? ''
                      }
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
              </Row>
              <Row gutter={[30, 30]} id="maritalStatus">
                <Col xs={24}>
                  <div
                    className="form-section-header form-control"
                    id="maritalStatus"
                  >
                    <FormFieldHeading
                      total={total}
                      current={4}
                      title={personalDetailLabelMapper['maritalStatus']}
                      subTitle="We need these to assess your tax situation to give you the best tax outcome."
                    />

                    <ListOptionsField
                      name="maritalStatus"
                      options={MARITIAL_STATUS_OPTIONS}
                      error={errors.maritalStatus?.message}
                      control={control}
                      cols={2}
                      scrollToNextField={scrollToNextField}
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={[30, 30]} id="maritalDetails">
                {watchMaritalStatus !== 'single' &&
                  watchMaritalStatus !== 'unmarried' &&
                  watchMaritalStatus !== undefined && (
                    <Col xs={24}>
                      <div className="form-section-header form-control">
                        <FormFieldHeading
                          total={total}
                          current={5}
                          title={personalDetailLabelMapper['dependentChildren']}
                          subTitle="We need these to assess your tax situation to give you the best tax outcome."
                        />

                        <ListOptionsField
                          name="dependentChildren"
                          options={AGREE_OPTIONS}
                          error={errors.dependentChildren?.message}
                          control={control}
                          cols={2}
                          scrollToNextField={scrollToNextField}
                        />
                      </div>
                    </Col>
                  )}

                {watchDependentChildren && (
                  <Col xs={24}>
                    <InputField
                      label="If Yes How many?"
                      name="numberOfDependents"
                      control={control}
                      error={errors.numberOfDependents?.message ?? ''}
                      placeholder="Eg: 4"
                      size="large"
                      type="number"
                    />
                  </Col>
                )}
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

export default PersonalDetail;
