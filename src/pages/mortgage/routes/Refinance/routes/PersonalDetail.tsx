import { useEffect, useRef } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Button, Col, Row } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { Container, FormFieldHeading } from '@/components/Elements';
import { PersonalDetailFormType } from '../types';
import { useCountryOptions } from '@/hooks/useCountryOptions';
import {
  DatePickerField,
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
import { refinanceFormRoutes } from '../constant/refinanceStepperRoutes';
import useScrollToTop from '@/hooks/useScrollTop';
import { useFetchUserProfileQuery } from '@/store/apis/userApi';
import { displayError, displaySuccess } from '@/utils/displayMessageUtils';
import { REFINANCE_PRIORITY_OPTIONS } from '../constant/optionList';
import {
  usePostRefinanceRequestMutation,
  useGetRefinanceStepDetailQuery,
} from '@/pages/mortgage/apis/refinanceAPI';
import StepProgress from '@/components/StepProgress/StepProgress';
import { stepData } from '../constant/stepData';

const PersonalDetail = () => {
  const { id } = useParams();
  useUnsavedChangesWarning(true);
  useScrollToTop();
  const countryOptions = useCountryOptions();
  const navigate = useNavigate();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const total = 5;
  const [postRefinanceRequest] = usePostRefinanceRequestMutation();

  const {
    data: userProfileData,
    // error: userProfileDataError,
    // isLoading: userProfileDataLoading,
  } = useFetchUserProfileQuery(undefined, {
    skip: !!id,
  });

  const {
    data: personalDetailApiResponse,
    // error: fetchPersonalDetailError,
    // isLoading: fetchPersonalDetailLoading,
  } = useGetRefinanceStepDetailQuery(
    { application_id: id!, step: 'personal_detail' },
    { skip: !id, refetchOnMountOrArgChange: true },
  );
  const personalDetailData = personalDetailApiResponse?.data.data as any;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    unregister,
    formState: { errors },
  } = useForm<PersonalDetailFormType>({
    defaultValues: {
      refinancePriority: [],
    },
    resolver: yupResolver(personalDetailSchema),
  });

  useEffect(() => {
    if (id && personalDetailData) {
      setValue('refinancePriority', personalDetailData?.refinancePriority);
      setValue('citizenship', personalDetailData?.citizenship);
      if (
        personalDetailData?.citizenship === 'australian_pr_visa' ||
        personalDetailData?.citizenship === 'australian_tr_visa'
      ) {
        setValue('visaSubClass', personalDetailData?.visaSubClass);
        setValue('visaExpiryDate', personalDetailData?.visaExpiryDate);
      }
      setValue(
        'currentResidentalStatus',
        personalDetailData?.currentResidentalStatus,
      );
      setValue('country', personalDetailData?.country);
      setValue(
        'currentResidentalStatus',
        personalDetailData?.currentResidentalStatus,
      );
      setValue('maritalStatus', personalDetailData?.maritalStatus);
      setValue('dependentChildren', personalDetailData?.dependentChildren);
      setValue('numberOfDependents', personalDetailData?.numberOfDependents);
      if (personalDetailData?.currentResidentalStatus === 'renting') {
        setValue('rentExpense', personalDetailData?.rentExpense);
        setValue('frequencyOfRent', personalDetailData?.frequencyOfRent);
      }
      if (personalDetailData?.currentResidentalStatus === 'live_own_place') {
        setValue(
          'isTheResidentialPlaceMortgaged',
          personalDetailData?.isTheResidentialPlaceMortgaged,
        );
      }
    } else if (!id && userProfileData) {
      const userDetail = userProfileData.data.common_data;
      setValue('citizenship', userDetail?.citizenship ?? '');
      setValue('country', userDetail?.country ?? '');
      setValue(
        'currentResidentalStatus',
        userDetail?.currentResidentalStatus ?? '',
      );
      setValue('maritalStatus', userDetail?.maritalStatus ?? '');
      setValue('refinancePriority', userDetail?.refinancePriority ?? []);
    }
  }, [id, setValue, userProfileData, personalDetailData]);

  const watchCitizenship = watch('citizenship');
  const watchCurrentResidentalStatus = watch('currentResidentalStatus');
  const watchMaritalStatus = watch('maritalStatus');
  const watchDependentChildren = watch('dependentChildren');
  // useEffect(() => {
  //   unregister('rentExpense');
  //   unregister('frequencyOfRent');
  // }, [watchCurrentResidentalStatus]);

  // useEffect(() => {
  //   unregister('visaExpiryDate');
  //   unregister('visaSubClass');
  // }, [watchCitizenship]);

  const onSubmit = async (data: PersonalDetailFormType) => {
    try {
      const res = await postRefinanceRequest({
        data,
        step: 'personal_detail',
        application_id: id,
      });

      // Check if the application ID is available
      const applicationId = res?.data?.data?.application_id;

      if (applicationId) {
        displaySuccess('Successfully submitted details.');
        navigate(`${refinanceFormRoutes['property_detail']}/${applicationId}`);
      } else {
        throw new Error('Application ID not found in response');
      }
    } catch (err) {
      displayError(err);
    }
  };

  const handleFormSubmit = () => {
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };

  const fieldOrder = [
    'citizenship',
    'citizenshipDetails',
    'currentResidentalStatus',
    'currentResidentalStatusDetails',
    'maritalStatus',
    'maritalStatusDetails',
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
      handleSubmit={handleFormSubmit}
      showBackButton={false}
      nextBtnText="Next: Mortgage Details"
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
                  formId="personal_detail"
                  id={id || ''}
                  completedStep={0}
                  totalSteps={total}
                  stepData={stepData}
                />
              </Row>
              <Row gutter={30}>
                <Col xs={24} md={24}>
                  <div className="form-control form-section-header">
                    <FormFieldHeading
                      total={total}
                      current={1}
                      title={personalDetailLabelMapper['refinancePriority']}
                      subTitle="We need these to assess your situation to give you the best refinance outcome. You can choose multiple options."
                    />
                    <ListOptionsField
                      control={control}
                      name="refinancePriority"
                      cols={2}
                      options={REFINANCE_PRIORITY_OPTIONS}
                      error={errors.refinancePriority?.message}
                      multiple={true}
                    />
                  </div>
                </Col>
                <Col xs={24}>
                  <div
                    className="form-control form-section-header"
                    id="citizenship"
                  >
                    <FormFieldHeading
                      total={total}
                      current={2}
                      title={personalDetailLabelMapper['citizenship']}
                      subTitle="We need these to assess your situation to give you the best refinance outcome. You can choose multiple options."
                    />
                    <ListOptionsField
                      control={control}
                      name="citizenship"
                      cols={2}
                      options={CITIZENSHIP_OPTIONS}
                      error={errors.citizenship?.message}
                      scrollToNextField={scrollToNextField}
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={30} id="citizenshipDetails">
                {(watchCitizenship === 'australian_pr_visa' ||
                  watchCitizenship === 'australian_tr_visa') && (
                  <>
                    <Col xs={24} md={12}>
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
                        placeholder="Select Visa Expiry Date"
                        minDate={dayjs()}
                        size="large"
                      />
                    </Col>
                  </>
                )}
              </Row>
              <Row gutter={30}>
                <Col xs={24}>
                  <div className="form-control form-section-header">
                    <FormFieldHeading
                      total={total}
                      current={3}
                      title={personalDetailLabelMapper['country']}
                      subTitle="We need these to assess your situation to give you the best refinance outcome. You can choose multiple options."
                    />
                    <SelectField
                      showSearch={true}
                      options={countryOptions}
                      name="country"
                      control={control}
                      label="Which country do you currently reside in?"
                      placeholder="Select your country"
                      error={errors.country?.message ?? ''}
                      size="large"
                    />
                  </div>
                </Col>
                <Col xs={24}>
                  <div
                    className="form-control form-section-header"
                    id="currentResidentalStatus"
                  >
                    <FormFieldHeading
                      total={total}
                      current={4}
                      title={
                        personalDetailLabelMapper['currentResidentalStatus']
                      }
                      subTitle="We need these to assess your situation to give you the best refinance outcome. You can choose multiple options."
                    />
                    <ListOptionsField
                      control={control}
                      name="currentResidentalStatus"
                      cols={2}
                      options={RESIDENTIAL_STATUS_OPTIONS}
                      error={errors.currentResidentalStatus?.message}
                      scrollToNextField={scrollToNextField}
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={30} id="currentResidentalStatusDetails">
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
                  <Col xs={24} md={12}>
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
              <Row gutter={30} id="maritalStatus">
                <Col xs={24}>
                  <div className="form-control form-section-header">
                    <FormFieldHeading
                      total={total}
                      current={5}
                      title={personalDetailLabelMapper['maritalStatus']}
                      subTitle="We need these to assess your situation to give you the best refinance outcome. You can choose multiple options."
                    />
                    <ListOptionsField
                      control={control}
                      name="maritalStatus"
                      cols={2}
                      options={MARITIAL_STATUS_OPTIONS}
                      error={errors.maritalStatus?.message}
                      scrollToNextField={scrollToNextField}
                    />
                  </div>
                </Col>
              </Row>
              <Row id="maritalStatusDetails">
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
