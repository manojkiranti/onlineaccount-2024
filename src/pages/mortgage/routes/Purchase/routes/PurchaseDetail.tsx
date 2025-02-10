import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Button, Col, Row } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, FormFieldHeading } from '@/components/Elements';
import {
  purchaseDetailLabelMapper,
  purchaseDetailSchema,
} from '../schema/purchaseDetailSchema';
import { PurchaseDetailFormType } from '../types';

import { ListOptionsField } from '@/components/Form';
import {
  PROPERTY_PURPOSE_OPTIONS,
  PROPERTY_TIMEFRAME_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PURCHASING_UNDER_OPTIONS,
} from '../constant/optionList';

import useUnsavedChangesWarning from '@/hooks/useUnsavedChangesWarning';
import StepperFormLayout from '@/components/Layout/StepperFormLayout';

import Man from '@/assets/images/icons/man.svg';
import JointProperty from '@/assets/images/icons/property-joint.svg';
import Trust from '@/assets/images/icons/trust.svg';
import NonTrading from '@/assets/images/icons/property-non-trading.svg';
import House from '@/assets/images/icons/house.svg';
import Building from '@/assets/images/icons/building.svg';
import Apartment from '@/assets/images/icons/apartment.svg';
import OffApartment from '@/assets/images/icons/offAppartment.svg';
import Map from '@/assets/images/icons/map.svg';
import { purchaseFormRoutes } from '../constant/stepperRoutes';
import useScrollToTop from '@/hooks/useScrollTop';
import {
  useGetPurchaseStepDetailQuery,
  usePostPurchaseRequestMutation,
} from '@/pages/mortgage/apis/purchaseAPI';
import { PurchaseRequestPayload } from '@/pages/mortgage/types/Purchase';
import { displayError, displaySuccess } from '@/utils/displayMessageUtils';
import { useAppDispatch } from '@/hooks/hooks';
import { setLoading } from '@/store/slices/common/commonSlice';
import StepProgress from '@/components/StepProgress/StepProgress';
import { stepData } from '../constant/stepData';
import { useFetchUserProfileQuery } from '@/store/apis/userApi';

const iconMapper = {
  man: Man,
  jointProperty: JointProperty,
  trust: Trust,
  nonTrading: NonTrading,
  house: House,
  building: Building,
  apartment: Apartment,
  offApartment: OffApartment,
  map: Map,
};

const PurchaseDetail = () => {
  const { id } = useParams();
  useUnsavedChangesWarning(true);
  useScrollToTop();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const total = 4;

  const [postPurchaseRequest, { isLoading: postPurchaseRequestLoading }] =
    usePostPurchaseRequestMutation();
  const {
    data: userProfileData,
    error: userProfileDataError,
    isLoading: userProfileDataLoading,
  } = useFetchUserProfileQuery(undefined, {
    skip: !!id,
  });

  const {
    data: purchaseDetailApiResponse,
    error: fetchPurchaseDetailError,
    isLoading: fetchPurchaseDetailLoading,
  } = useGetPurchaseStepDetailQuery(
    { application_id: id!, step: 'purchase_detail' },
    { skip: !id, refetchOnMountOrArgChange: true },
  );

  const purchaseDetailData = purchaseDetailApiResponse?.data
    .data as PurchaseDetailFormType;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PurchaseDetailFormType>({
    defaultValues: {},
    resolver: yupResolver(purchaseDetailSchema),
  });

  useEffect(() => {
    if (purchaseDetailData) {
      setValue('purchasingUnder', purchaseDetailData.purchasingUnder);
      setValue('propertyType', purchaseDetailData.propertyType);
      setValue('propertyPurpose', purchaseDetailData.propertyPurpose);
      setValue('propertyTimeframe', purchaseDetailData.propertyTimeframe);
    }
  }, [purchaseDetailData]);

  const onSubmit = (data: PurchaseDetailFormType) => {
    const payload: PurchaseRequestPayload = {
      data,
      step: 'purchase_detail',
      ...(id ? { application_id: id } : {}),
    };
    postPurchaseRequest(payload)
      .unwrap()
      .then((res) => {
        displaySuccess('Successfully submitted details.');
        navigate(
          `${purchaseFormRoutes['personal_detail']}/${res.data.application_id}`,
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

  const fieldRefs = useRef<Array<HTMLDivElement | null>>([]);

  const formRef = useRef<HTMLFormElement>(null);

  const fieldOrder = [
    'purchasingUnder',
    'propertyType',
    'propertyPurpose',
    'propertyTimeframe',
  ];

  const scrollToNextField = (currentField: string) => {
    const currentIndex = fieldOrder.indexOf(currentField);
    if (currentIndex !== -1 && currentIndex < fieldOrder.length - 1) {
      const nextField = fieldOrder[currentIndex + 1];
      const nextFieldElement = document.getElementById(nextField);
      nextFieldElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollToField = (fieldId: string) => {
    const targetField = document.getElementById(fieldId);
    if (targetField) {
      targetField.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <StepperFormLayout
      showBackButton={false}
      handleSubmit={handleFormSubmit}
      nextBtnText="Next: Personal Details"
      isSubmitLoading={postPurchaseRequestLoading}
    >
      <Row
        style={{
          marginBottom: '20px',
          paddingBottom: '20px',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <StepProgress
          completedStep={0}
          totalSteps={4}
          formId="purchase_detail"
          stepData={stepData}
          id={id || ''}
        />
      </Row>
      <Container width="md">
        <Row>
          <Col xs={24}>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
              <Row gutter={30}>
                <Col xs={24}>
                  <div
                    className="form-section-header form-control"
                    id="purchasingUnder"
                  >
                    <FormFieldHeading
                      total={total}
                      current={1}
                      title={purchaseDetailLabelMapper['purchasingUnder']}
                      subTitle="We need these to assess your tax situation to give you the best tax outcome."
                    />

                    <ListOptionsField
                      name="purchasingUnder"
                      options={PURCHASING_UNDER_OPTIONS}
                      error={errors.purchasingUnder?.message}
                      control={control}
                      iconMapper={iconMapper}
                      cols={1}
                      scrollToNextField={scrollToNextField}
                    />
                  </div>
                </Col>

                <Col xs={24}>
                  <div
                    className="form-section-header form-control"
                    id="propertyType"
                  >
                    <FormFieldHeading
                      total={total}
                      current={2}
                      title={purchaseDetailLabelMapper['propertyType']}
                      subTitle="Notes/ information that we want to relay to the user about the property type"
                    />

                    <ListOptionsField
                      name="propertyType"
                      options={PROPERTY_TYPE_OPTIONS}
                      error={errors.propertyType?.message}
                      control={control}
                      iconMapper={iconMapper}
                      cols={2}
                      scrollToNextField={scrollToNextField}
                    />
                  </div>
                </Col>

                <Col xs={24}>
                  <div
                    className="form-section-header form-control"
                    id="propertyPurpose"
                  >
                    <FormFieldHeading
                      total={total}
                      current={3}
                      title={purchaseDetailLabelMapper['propertyPurpose']}
                      subTitle="We need these to assess your tax situation to give you the best tax outcome"
                    />

                    <ListOptionsField
                      name="propertyPurpose"
                      options={PROPERTY_PURPOSE_OPTIONS}
                      error={errors.propertyPurpose?.message}
                      control={control}
                      cols={2}
                      scrollToNextField={scrollToNextField}
                    />
                  </div>
                </Col>

                <Col xs={24}>
                  <div
                    className="form-section-header form-control"
                    id="propertyTimeframe"
                  >
                    <FormFieldHeading
                      total={total}
                      current={4}
                      title={purchaseDetailLabelMapper['propertyTimeframe']}
                      subTitle="We need these to assess your tax situation to give you the best tax outcome."
                    />

                    <ListOptionsField
                      name="propertyTimeframe"
                      options={PROPERTY_TIMEFRAME_OPTIONS}
                      error={errors.propertyTimeframe?.message}
                      control={control}
                      cols={2}
                      scrollToNextField={scrollToNextField}
                    />
                  </div>
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

export default PurchaseDetail;
