import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Row, Col } from "antd";

import Title from "antd/es/typography/Title";
import AccountFormLayout from "../components/AccountFormLayout";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountSignUpSchema } from "../schema";
import { AccountSignUpType } from "../types";
import {
  InputField,
  DatePickerField,
  RadioGroupField,
  SelectField,
  NepaliDatePickerField,
} from "@/components/Form";

import { useEffect, useState } from "react";

import { useGetBranchListQuery, useGetPrerequisitQuery } from "@/store/apis/coreApi";
import { usePostStepOneMutation } from "../api/stepAPI";
import { displayError, displayErrorMsg } from "@/utils/displayMessageUtils";
// import { adToBs, bsToAd, calculateAge } from '@sbmdkl/nepali-date-converter';
const AccountSignUp = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>("");
  const {id} = useParams();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isExistingCustomer: "NO",
      currencyId: 1,
      nationality: 149

    },
    resolver: yupResolver(accountSignUpSchema),
  });
  console.log("errors", errors)

  const {data:branchList } = useGetBranchListQuery();
  const {data:preRequisitData } = useGetPrerequisitQuery();
  const [postStepOne, {isLoading:postStepOneLoading}] = usePostStepOneMutation()
  const mappedBranches = branchList?.data?.map((branch:any) => ({
    value: branch.id,
    label: branch.title
  })) ?? [];

  const mappedCountries = preRequisitData?.data?.countries.map((country:any) =>({
    value: country.id,
    label: country.title
  }))

  


  const mappedSalutation = preRequisitData?.data?.salutations.map((salutation:any) =>({
    value: salutation.id,
    label: salutation.title
  }))

  const mappedCurrency = preRequisitData?.data?.currencies.map((item:any) =>({
    value: item.id,
    label: item.code
  }))

  console.log("branchList", branchList)
  console.log("preRequisitData", preRequisitData)
  const dateOfBirthBS = watch("dateOfBirthBs");
  const dateOfBirthAD = watch("dateOfBirth");
  const saluation = watch("salutation");
  const gender = watch("gender");


  useEffect(() => {
    if (dateOfBirthBS) {
      console.log(dateOfBirthBS);
      setValue("dateOfBirth", dateOfBirthBS.adDate);
    }
  }, [dateOfBirthBS]);

  // useEffect(() => {
  //   if (dateOfBirthAD) {
  //     console.log(dateOfBirthAD);
 
  //   }
  // }, [dateOfBirthAD]);

   // If saluation is changed to "mr", update gender to "male"
   useEffect(() => {
    if (saluation === 1) {
      setValue("gender", "Male");
    }
    if (saluation === 2) {
      setValue("gender", "Female");
    }
  }, [saluation, gender, setValue]);



  const onSubmit: SubmitHandler<AccountSignUpType> = (data) => {
    console.log("submit", data);
    const payload = {
      ...data,
      dateOfBirthBs: data.dateOfBirthBs.bsDate,
      schemeId: id,
      accountCategory: "6"
    }

     postStepOne(payload).unwrap()
     .then( res => {
      console.log("res....",res)
      navigate(`/online-apply/verify-otp/${res.data.reference_number}`)
     }).catch(err => {
      
      displayErrorMsg(err?.data?.message)
     })
    // console.log("submit");
  };

  return (
    <AccountFormLayout currentStep={0} currentStepProgress={30}>
      <Card>
        <Title level={4} style={{ marginBottom: "1.5rem" }}>
          Enter the details according to your identification
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={30}>
            <Col xs={24} md={24}>
              <RadioGroupField
                label="Do you have an existing account?"
                name="isExistingCustomer"
                control={control}
                error={errors.isExistingCustomer?.message ?? ""}
                options={[
                  { label: "Yes", value: "YES" },
                  { label: "No", value: "NO" },
                ]}
              />
            </Col>
            <Col xs={24} md={12}>
              <InputField
                label="Full name"
                name="accountName"
                control={control}
                error={errors.accountName?.message ?? ""}
                required={true}
              />
            </Col>
            <Col xs={24} md={12}>
              <InputField
                label="Email"
                name="emailAddress"
                control={control}
                error={errors.emailAddress?.message ?? ""}
                required={true}
              />
            </Col>
            <Col xs={24} md={12}>
              <InputField
                label="Mobile Number"
                name="mobileNumber"
                control={control}
                error={errors.mobileNumber?.message ?? ""}
                required={true}
              />
            </Col>
            <Col xs={24} md={12}>
              <SelectField
                showSearch={true}
                options={mappedCountries}
                label="Nationality"
                name="nationality"
                control={control}
                size="large"
                placeholder="Select your country"
                error={errors.nationality?.message ?? ""}
 
                // onBlur={handleBlur}
                required={true}
              />
            </Col>
            <Col xs={24} md={12}>
              <NepaliDatePickerField
                label="Date of birth (BS)"
                name="dateOfBirthBs"
                control={control}
                error={errors.dateOfBirthBs?.message ?? ""}
                required={true}
              />
            </Col>
            <Col xs={24} md={12}>
              <DatePickerField
                label="Date of birth (AD)"
                name="dateOfBirth"
                control={control}
                error={errors.dateOfBirth?.message ?? ""}
                placeholder=""
                required={true}
                dateFormat="YYYY-MM-DD"
              />
            </Col>

            <Col xs={24} md={12}>
              <SelectField
                showSearch={true}
                options={mappedBranches}
                label="Select your nearest branch"
                name="branch"
                control={control}
                size="large"
                placeholder="Select branch"
                error={errors.branch?.message ?? ""}

 
                // onBlur={handleBlur}
                required={true}
              />
            </Col>

            <Col xs={24} md={12}>
              <SelectField
                showSearch={true}
                options={mappedSalutation}
                name="salutation"
                control={control}
                label="Salutation"
                size="large"
                placeholder="Select salutation"
                error={errors.salutation?.message ?? ""}
                required={true}
              />
            </Col>
            <Col xs={24} md={12}>
              <SelectField
                showSearch={true}
                options={[
                  {
                    label: "Male",
                    value: "Male",
                  },
                  {
                    label: "Female",
                    value: "Female",
                  },
                  {
                    label: "Other",
                    value: "Other",
                  },
                ]}
                name="gender"
                control={control}
                label="Gender"
                size="large"
                placeholder="Select gender"
                error={errors.gender?.message ?? ""}
                required={true}
              />
            </Col>

            <Col xs={24} md={12}>
              <SelectField
                showSearch={true}
                options={mappedCurrency}
                name="currencyId"
                control={control}
                label="currencyId"
                size="large"
                placeholder="Select currency"
                error={errors.currencyId?.message ?? ""}
                required={true}
              />
            </Col>
          </Row>
          <Button
            type="primary"
            block
            size="large"
            htmlType="submit"
            style={{ fontWeight: 700, height: "50px" }}
            loading={postStepOneLoading}
          >
            Save & Continue
          </Button>

        </form>
      </Card>
    </AccountFormLayout>
  );
};

export default AccountSignUp;
