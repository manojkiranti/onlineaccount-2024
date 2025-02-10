import { Container, FormFieldHeading } from '@/components/Elements';
import ApplicationHeading from '@/components/Elements/Heading/ApplicationHeading';
import {
  DatePickerField,
  InputField,
  ListOptionsField,
  SelectField,
} from '@/components/Form';
import StepperFormLayout from '@/components/Layout/StepperFormLayout';
import { Button, Col, Row } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { TAX_INCOME_OPTIONS } from '../constant/optionList';
import { AGREE_OPTIONS } from '@/constant/options';
import { usePostLeadDataMutation } from '@/pages/onboarding/api/onboardAPI';
import { displayError, displaySuccess } from '@/utils/displayMessageUtils';
import { useNavigate, useParams } from 'react-router-dom';
import { LodgeReturnRoutes } from '../constant/routes';
import {
  useGetApplicationDetailQuery,
  usePostLodgeReturnMutation,
  usePutLodgeReturnMutation,
} from '@/pages/tax/apis/lodgeReturnAPI';
import { yupResolver } from '@hookform/resolvers/yup';
import { lodgeReturnApplicationSchema } from '../schema/lodgeReturnApplicationSchema';
import { LodgeReturnApplicationFormType } from '../types';

const LodgeReturnApplication = () => {
  const { id } = useParams();
  const total = 2;
  const navigate = useNavigate();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<LodgeReturnApplicationFormType>({
    resolver: yupResolver(lodgeReturnApplicationSchema),
  });

  const { data: applicationDetail } = useGetApplicationDetailQuery(
    {
      application_id: id!,
    },
    { skip: !id, refetchOnMountOrArgChange: true },
  );

  const [postLodgeReturn, { isLoading: postPurchaseRequestLoading }] =
    usePostLodgeReturnMutation();

  const [putLodgeReturn, { isLoading: putPurchaseRequestLoading }] =
    usePutLodgeReturnMutation();

  const onSubmit = (data: any) => {
    const payload: {
      data: LodgeReturnApplicationFormType;
      tax_year: number;
      application_id?: number;
    } = {
      data,
      tax_year: 2023,
    };
    if (id) {
      payload.application_id = parseInt(id);
      putLodgeReturn(payload)
        .unwrap()
        .then((res) => {
          displaySuccess('Successfully submitted details.');
          navigate('/tax/lodge-return');
        })
        .catch((err) => {
          displayError(err);
        });
    } else {
      postLodgeReturn(payload)
        .unwrap()
        .then((res) => {
          displaySuccess('Successfully submitted details.');
          navigate('/tax/lodge-return');
        })
        .catch((err) => {
          displayError(err);
        });
    }
  };
  const applicationDetailData = applicationDetail?.data
    ?.data as LodgeReturnApplicationFormType;

  useEffect(() => {
    if (applicationDetail) {
      setValue('income', applicationDetailData.income);
      setValue(
        'numberOfRentalProperties',
        applicationDetailData.numberOfRentalProperties,
      );
      setValue(
        'jointlyOwnedProperties',
        applicationDetailData.jointlyOwnedProperties,
      );
      setValue(
        'australianTaxFileNumber',
        applicationDetailData.australianTaxFileNumber,
      );
      setValue('dateOfBirth', applicationDetailData.dateOfBirth);
    }
  }, [applicationDetail]);

  const handleFormSubmit = () => {
    console.log('handle submit');
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };
  return (
    <StepperFormLayout
      showBackButton={false}
      handleSubmit={handleFormSubmit}
      nextBtnText="Submit Application"
    >
      <Container width="md">
        <Row justify="center">
          <Col>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row gutter={30}>
                <Col xs={24}>
                  <div className="form-section-header form-control">
                    <FormFieldHeading
                      total={total}
                      current={1}
                      title="Did you receive any of the following types of income in Australia this financial year?"
                    />
                    <ListOptionsField
                      multiple={true}
                      control={control}
                      cols={2}
                      name="income"
                      options={TAX_INCOME_OPTIONS}
                      error={errors?.income?.message}
                    />
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <InputField
                    name="numberOfRentalProperties"
                    control={control}
                    size="large"
                    label="Number of Rental Properties"
                    placeholder="Enter number of rental properties"
                    error={errors?.numberOfRentalProperties?.message}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <SelectField
                    options={AGREE_OPTIONS}
                    control={control}
                    label="Any Jointly Owned Properties?"
                    name="jointlyOwnedProperties"
                    size="large"
                    placeholder="Select Jointly Owned Properties"
                    error={errors?.jointlyOwnedProperties?.message}
                  />
                </Col>
              </Row>
              <Row gutter={30}>
                <Col xs={24}>
                  <div className="form-section-header form-control">
                    <FormFieldHeading
                      total={total}
                      current={2}
                      title="Your TFN Number and DOB are:"
                      subTitle="Provide us your TFN Number and Date of Birth so that our representatives can better assess and provide best tax service"
                    />
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <InputField
                    name="australianTaxFileNumber"
                    control={control}
                    size="large"
                    label="Australian Tax File Number"
                    error={errors?.australianTaxFileNumber?.message}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <DatePickerField
                    control={control}
                    label="Date of Birth"
                    name="dateOfBirth"
                    size="large"
                    placeholder="Select Date of Birth"
                    error={errors?.dateOfBirth?.message}
                  />
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

export default LodgeReturnApplication;
