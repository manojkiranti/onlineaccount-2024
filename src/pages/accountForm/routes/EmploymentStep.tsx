import { useEffect, useState } from "react";
import { Button, Card, Col, Collapse, Input, Row } from "antd";

import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AccountFormLayout from "../components/AccountFormLayout";

import {
  CheckBoxField,
  DatePickerField,
  FormLabel,
  InputField,
  NepaliDatePickerField,
  SelectField,
} from "@/components/Form";
import { OccupationType } from "../types";
import { useGetPrerequisitQuery } from "@/store/apis/coreApi";

import { useNavigate, useParams } from "react-router-dom";
import { displayErrorMsg } from "@/utils/displayMessageUtils";
import { mapObjectKeysToSnakeCase } from "@/utils/mapper";
import { occupationSchema } from "../schema/OccupationSchema";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { usePostStepThreeMutation } from "../api/stepAPI";


const EmploymentStep = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(occupationSchema),
    defaultValues: {
      sonsName: [],
      daughtersName: [],
    },
  });

  const { data: preRequisitData, isLoading: preRequisitLoading } =
    useGetPrerequisitQuery();
  const [postStepThree, { isLoading: postStepThreeLoading }] =
    usePostStepThreeMutation();

  console.log("preRequisitData", preRequisitData);

  const mappedCountries = preRequisitData?.data?.countries.map(
    (country: any) => ({
      value: country.id,
      label: country.title,
    })
  );

  const mappedEmployment = preRequisitData?.data?.employment_types.map(
    (item: any) => ({
      value: item.id,
      label: item.title,
    })
  );
  const mappedOccupation = preRequisitData?.data?.occupation.map(
    (item: any) => ({
      value: item.id,
      label: item.title,
    })
  );

  const mappedPurposeAccount = preRequisitData?.data?.purpose_for_account.map(
    (item: any) => ({
      value: item.id,
      label: item.title,
    })
  );
  const mappedFundSource = preRequisitData?.data?.source_of_fund.map(
    (item: any) => ({
      value: item.id,
      label: item.title,
    })
  );
  const mappedIdentificationType =
    preRequisitData?.data?.identification_documents.map((item: any) => ({
      value: item.id,
      label: item.title,
    }));
  const mappedIdentificationIssuer =
    preRequisitData?.data?.id_issuing_organizations.map((item: any) => ({
      value: item.id,
      label: item.title,
    }));

  const mappedQualification = preRequisitData?.data?.qualification.map(
    (item: any) => ({
      value: item.id,
      label: item.name,
    })
  );

  const mappedMaritialStatus = preRequisitData?.data?.marital_status.map(
    (item: any) => ({
      value: item.id,
      label: item.title,
    })
  );

  const watchEmploymentType = watch("employmentType");
  const watchMaritalStatus = watch("maritalStatus");
  const watchPurposeOfAccount = watch("purposeOfAccount");
  const watchFundSource = watch("sourceOfIncome");

  const {
    fields: sonsFields,
    append: appendSon,
    remove: removeSon,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  } = useFieldArray({
    control,
    // @ts-ignore
    name: "sonsName",
  });

  const {
    fields: daughtersFields,
    append: appendDaughter,
    remove: removeDaughter,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  } = useFieldArray({
    control,
    // @ts-ignore
    name: "daughtersName",
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<OccupationType> = (data) => {
    console.log("submit data", data);
    const occupationDetails = {
      employmentType: data?.employmentType,
      occupation: data.occupation,
      panNo: data.panNo,
      organizationName: data.organizationName,
      organizationAddress: data.organizationAddress,
      organizationContactNumber: data.organizationContactNumber,
      designation: data.designation,
      annualIncome: data.annualIncome,
      annualSalary: data.annualSalary,
      purposeOfAccount: data.purposeOfAccount,
      purposeOfAccount_other: data.purposeOfAccountOther,
      sourceOfIncome: data.sourceOfIncome,
      sourceOfIncomeOther: data.sourceOfIncomeOther,
    };

    const identificationDetail = {
      maxAmountPerTransaction: data.maxAmountPerTransaction,
      numberOfMonthlyTransaction: data.numberOfMonthlyTransaction,
      monthlyAmountTransaction: data.monthlyAmountTransaction,
      numberOfYearlyTransaction: data.numberOfYearlyTransaction,
      yearlyAmountTransaction: data.yearlyAmountTransaction,
      identificationType: data.identificationType,
      identificationDocumentNumber: data.identificationDocumentNumber,
      identificationDocumentIssued_place:
        data.identificationDocumentIssuedPlace,
      identificationIssuedDateInAd: data.identificationIssuedDateInAd,
      identificationIssuedDateInBs: data.identificationIssuedDateInBs.bsDate,
      identificationDocumentExpiry_date: data.identificationDocumentExpiryDate,
      identificationDocumentIssuedOrg: data.identificationDocumentIssuedOrg,
      identificationDocumentIssuedCon: data.identificationDocumentIssuedCon,
      education: data.education,
      grandmotherName: data.grandmotherName,
      grandfatherName: data.grandfatherName,
      fatherName: data.fatherName,
      motherName: data.motherName,
      maritalStatus: data.maritalStatus,
      spouseName: data.spouseName,
      fatherInLawName: data.fatherInLawName,
      motherInLawName: data.motherInLawName,
      daughterInLawName: data.daughterInLawName,
      sonsName: data.sonsName,
      daughtersName: data.daughtersName,
      specifyOthers: data.specifyOthers,
    };

    const payload = {
      occupationDetails: mapObjectKeysToSnakeCase(occupationDetails),
      identificationDetail: mapObjectKeysToSnakeCase(identificationDetail),
    };

    postStepThree({ payload: payload, token: token as string })
      .unwrap()
      .then((res) => {
        console.log(res);
        navigate(`/online-apply/step-four/${res.data.token}`);
      })
      .catch((err) => {
        displayErrorMsg(err?.data?.message);
      });
  };

  console.log(errors);
  return (
    <>
      <AccountFormLayout currentStep={2} currentStepProgress={50}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "1rem" }}>
            <Collapse
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: "Occupation Details",
                  children: (
                    <div style={{ width: "100%" }}>
                      <Row gutter={30}>
                        <Col xs={24} md={12}>
                          <SelectField
                            options={mappedEmployment}
                            label="Employment"
                            name="employmentType"
                            control={control}
                            size="large"
                            placeholder="Select your employment type"
                            error={errors.employmentType?.message ?? ""}
                            loading={preRequisitLoading}
                            disabled={preRequisitLoading}
                            required={true}
                            showSearch={true}
                            filterName="employmentType"
                          />
                        </Col>
                        <Col xs={24} md={12}>
                          <SelectField
                            options={mappedOccupation}
                            label="Occupation"
                            name="occupation"
                            control={control}
                            size="large"
                            placeholder="Select your occupation"
                            error={errors.occupation?.message ?? ""}
                            loading={preRequisitLoading}
                            disabled={preRequisitLoading}
                            required={true}
                          />
                        </Col>

                        {watchEmploymentType !== 4 &&
                          watchEmploymentType !== 5 &&
                          watchEmploymentType !== 3 &&
                          watchEmploymentType !== undefined && (
                            <>
                              <Col xs={24} md={12}>
                                <InputField
                                  label="Organization Name"
                                  name="organizationName"
                                  control={control}
                                  error={errors.organizationName?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={12}>
                                <InputField
                                  label="Organization Address"
                                  name="organizationAddress"
                                  control={control}
                                  error={
                                    errors.organizationAddress?.message ?? ""
                                  }
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={12}>
                                <InputField
                                  label="Organization Contact Number"
                                  name="organizationContactNumber"
                                  control={control}
                                  error={
                                    errors.organizationContactNumber?.message ??
                                    ""
                                  }
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={12}>
                                <InputField
                                  label="Designation"
                                  name="designation"
                                  control={control}
                                  error={errors.designation?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={12}>
                                <InputField
                                  label="Annual Income"
                                  name="annualIncome"
                                  control={control}
                                  error={errors.annualIncome?.message ?? ""}
                                  required={true}
                                  type="number"
                                />
                              </Col>
                              <Col xs={24} md={12}>
                                <InputField
                                  label="Annual Salary"
                                  name="annualSalary"
                                  control={control}
                                  error={errors.annualSalary?.message ?? ""}
                                  required={true}
                                  type="number"
                                />
                              </Col>
                              <Col xs={24} md={12}>
                                <InputField
                                  label="PAN number"
                                  name="panNo"
                                  control={control}
                                  error={errors.panNo?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                            </>
                          )}
                        <Col xs={24} md={12}>
                          <SelectField
                            options={mappedPurposeAccount}
                            label="Purpose of account"
                            name="purposeOfAccount"
                            control={control}
                            size="large"
                            placeholder="Select your purpose of account"
                            error={errors.purposeOfAccount?.message ?? ""}
                            loading={preRequisitLoading}
                            disabled={preRequisitLoading}
                            required={true}
                          />
                        </Col>
                        {watchPurposeOfAccount === 3 && (
                          <Col xs={24} md={12}>
                            <InputField
                              label="Purpose of account other"
                              name="purposeOfAccountOther"
                              control={control}
                              error={
                                errors.purposeOfAccountOther?.message ?? ""
                              }
                              required={true}
                            />
                          </Col>
                        )}
                        <Col xs={24} md={12}>
                          <SelectField
                            options={mappedFundSource}
                            label="Source of income"
                            name="sourceOfIncome"
                            control={control}
                            size="large"
                            placeholder="Select your income source"
                            error={errors.sourceOfIncome?.message ?? ""}
                            loading={preRequisitLoading}
                            disabled={preRequisitLoading}
                            required={true}
                          />
                        </Col>
                        {watchFundSource === 6 && (
                          <Col xs={24} md={12}>
                            <InputField
                              label="Source of income other"
                              name="sourceOfIncomeOther"
                              control={control}
                              error={errors.sourceOfIncomeOther?.message ?? ""}
                              required={true}
                            />
                          </Col>
                        )}
                      </Row>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <Collapse
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: "Identification Details",
                  children: (
                    <div style={{ width: "100%" }}>
                      <Row gutter={30}>
                        <Col xs={24} md={8}>
                          <InputField
                            label="Maximum amount per transaction"
                            name="maxAmountPerTransaction"
                            control={control}
                            error={
                              errors.maxAmountPerTransaction?.message ?? ""
                            }
                            required={true}
                            type="number"
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <InputField
                            label="Monthly amount transaction"
                            name="monthlyAmountTransaction"
                            control={control}
                            error={
                              errors.monthlyAmountTransaction?.message ?? ""
                            }
                            required={true}
                            type="number"
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <InputField
                            label="Number of yearly transaction"
                            name="numberOfYearlyTransaction"
                            control={control}
                            error={
                              errors.numberOfYearlyTransaction?.message ?? ""
                            }
                            required={true}
                            type="number"
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <InputField
                            label="Number of monthly transaction"
                            name="numberOfMonthlyTransaction"
                            control={control}
                            error={
                              errors.numberOfMonthlyTransaction?.message ?? ""
                            }
                            required={true}
                            type="number"
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <InputField
                            label="Yearly amount transaction"
                            name="yearlyAmountTransaction"
                            control={control}
                            error={
                              errors.yearlyAmountTransaction?.message ?? ""
                            }
                            required={true}
                            type="number"
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <SelectField
                            options={mappedIdentificationType}
                            label="Identification Type"
                            name="identificationType"
                            control={control}
                            size="large"
                            placeholder="Select your identification type"
                            error={errors.identificationType?.message ?? ""}
                            loading={preRequisitLoading}
                            disabled={preRequisitLoading}
                            required={true}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <InputField
                            label="Identification document number"
                            name="identificationDocumentNumber"
                            control={control}
                            error={
                              errors.identificationDocumentNumber?.message ?? ""
                            }
                            required={true}
                            type="number"
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <InputField
                            label="Identification issued place"
                            name="identificationDocumentIssuedPlace"
                            control={control}
                            error={
                              errors.identificationDocumentIssuedPlace
                                ?.message ?? ""
                            }
                            required={true}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <NepaliDatePickerField
                            label="Identification issued date (BS)"
                            name="identificationIssuedDateInBs"
                            control={control}
                            error={
                              errors.identificationIssuedDateInBs?.message ?? ""
                            }
                            required={true}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <DatePickerField
                            label="Identification issued date in (AD)"
                            name="identificationIssuedDateInAd"
                            control={control}
                            error={
                              errors.identificationIssuedDateInAd?.message ?? ""
                            }
                            placeholder=""
                            required={true}
                            dateFormat="YYYY-MM-DD"
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <DatePickerField
                            label="Identification expiration date"
                            name="identificationDocumentExpiryDate"
                            control={control}
                            error={
                              errors.identificationDocumentExpiryDate
                                ?.message ?? ""
                            }
                            placeholder=""
                            required={true}
                            dateFormat="YYYY-MM-DD"
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <SelectField
                            options={mappedIdentificationIssuer}
                            label="Identification issued organization"
                            name="identificationDocumentIssuedOrg"
                            control={control}
                            size="large"
                            placeholder="Select your identification issued organization"
                            error={
                              errors.identificationDocumentIssuedOrg?.message ??
                              ""
                            }
                            loading={preRequisitLoading}
                            disabled={preRequisitLoading}
                            required={true}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <SelectField
                            showSearch={true}
                            options={mappedCountries}
                            label="Issued Country"
                            name="identificationDocumentIssuedCon"
                            control={control}
                            size="large"
                            placeholder="Select Issued Country"
                            error={
                              errors.identificationDocumentIssuedCon?.message ??
                              ""
                            }
                            // onBlur={handleBlur}
                            required={true}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <SelectField
                            showSearch={true}
                            options={mappedQualification}
                            label="Education"
                            name="education"
                            control={control}
                            size="large"
                            placeholder="Select education"
                            error={errors.education?.message ?? ""}
                            // onBlur={handleBlur}
                            required={true}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <InputField
                            label="Grand father name"
                            name="grandfatherName"
                            control={control}
                            error={errors.grandfatherName?.message ?? ""}
                            required={true}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <InputField
                            label="Grand mother name"
                            name="grandmotherName"
                            control={control}
                            error={errors.grandmotherName?.message ?? ""}
                            required={true}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <InputField
                            label="Father name"
                            name="fatherName"
                            control={control}
                            error={errors.fatherName?.message ?? ""}
                            required={true}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <InputField
                            label="Mother name"
                            name="motherName"
                            control={control}
                            error={errors.motherName?.message ?? ""}
                            required={true}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <SelectField
                            showSearch={true}
                            options={mappedMaritialStatus}
                            label="Marital status"
                            name="maritalStatus"
                            control={control}
                            size="large"
                            placeholder="Select your maritial status"
                            error={errors.maritalStatus?.message ?? ""}
                            required={true}
                          />
                        </Col>
                        {watchMaritalStatus === 1 && (
                          <>
                            <Col xs={24} md={8}>
                              <InputField
                                label="Spouse name"
                                name="spouseName"
                                control={control}
                                error={errors.spouseName?.message ?? ""}
                                required={true}
                              />
                            </Col>
                            <Col xs={24} md={8}>
                              <InputField
                                label="Father in law name"
                                name="fatherInLawName"
                                control={control}
                                error={errors.fatherInLawName?.message ?? ""}
                                required={true}
                              />
                            </Col>
                            <Col xs={24} md={8}>
                              <InputField
                                label="Mother in law name"
                                name="motherInLawName"
                                control={control}
                                error={errors.motherInLawName?.message ?? ""}
                                required={true}
                              />
                            </Col>
                            <Col xs={24} md={8}>
                              <InputField
                                label="Daughter in law name"
                                name="daughterInLawName"
                                control={control}
                                error={errors.daughterInLawName?.message ?? ""}
                                required={true}
                              />
                            </Col>

                            <Col xs={24} md={8}>
                              <FormLabel label="Sons Name" />
                              {sonsFields.map((item, index) => (
                                <div key={item.id}>
                                  <Controller
                                    name={`sonsName[${index}]` as any}
                                    control={control}
                                    render={({ field }) => (
                                      <Input
                                        {...field}
                                        placeholder={`Son's name ${index + 1}`}
                                      />
                                    )}
                                  />

                                  <Button onClick={() => removeSon(index)}>
                                    Remove
                                  </Button>
                                </div>
                              ))}
                              <Button
                                type="dashed"
                                onClick={() => appendSon("")}
                                icon={<PlusOutlined />}
                              >
                                Add Son's Name
                              </Button>
                            </Col>
                            <Col xs={24} md={8}>
                              <FormLabel label="Daughters Name" />
                              <Row>
                                {daughtersFields.map((field, index) => (
                                  <Col xs={24} md={12} key={field.id}>
                                    <Controller
                                      name={`daughtersName[${index}]` as any}
                                      control={control}
                                      render={({ field }) => (
                                        <Input
                                          {...field}
                                          placeholder={`Daughter's name ${index + 1}`}
                                        />
                                      )}
                                    />
                                    <Button
                                      onClick={() => removeDaughter(index)}
                                    >
                                      Remove
                                    </Button>
                                  </Col>
                                ))}
                              </Row>

                              <Button
                                onClick={() => appendDaughter("")}
                                icon={<PlusOutlined />}
                              >
                                Add Daughter's Name
                              </Button>
                            </Col>
                          </>
                        )}

                        {watchMaritalStatus === 5 && (
                          <Col xs={24} md={8}>
                            <InputField
                              label="Specify Others"
                              name="specifyOthers"
                              control={control}
                              error={errors.specifyOthers?.message ?? ""}
                              required={true}
                            />
                          </Col>
                        )}
                      </Row>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <Row>
            <Col xs={24}>
              <Button
                type="primary"
                block
                size="large"
                htmlType="submit"
                style={{ fontWeight: 700, height: "50px" }}
                loading={postStepThreeLoading}
                disabled={postStepThreeLoading}
              >
                Save & Continue
              </Button>
            </Col>
          </Row>
        </form>
      </AccountFormLayout>
    </>
  );
};

export default EmploymentStep;
