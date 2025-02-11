import { useNavigate } from "react-router-dom";
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
import { useCountryOptions } from "@/hooks/useCountryOptions";

import { useEffect, useState } from "react";
// import { adToBs, bsToAd, calculateAge } from '@sbmdkl/nepali-date-converter';
const AccountSignUp = () => {
  const navigate = useNavigate();
  const countryOptions = useCountryOptions();
  const [date, setDate] = useState<string>("");
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      existingAccount: false,
      currency: "npr",

    },
    resolver: yupResolver(accountSignUpSchema),
  });

  const dateOfBirthBS = watch("dateOfBirthBS");
  const dateOfBirthAD = watch("dateOfBirthAD");
  const saluation = watch("saluation");
  const gender = watch("gender");

  // useEffect(() => {
  //   if (dateOfBirthBS) {
  //     console.log(dateOfBirthBS);
  //     setValue("dateOfBirthAD", dateOfBirthBS.adDate);
  //   }
  // }, [dateOfBirthBS]);

  useEffect(() => {
    if (dateOfBirthAD) {
      console.log(dateOfBirthAD);
 
    }
  }, [dateOfBirthAD]);

   // If saluation is changed to "mr", update gender to "male"
   useEffect(() => {
    if (saluation === "mr") {
      setValue("gender", "male");
    }
    if (saluation === "miss") {
      setValue("gender", "female");
    }
  }, [saluation, gender, setValue]);



  const onSubmit: SubmitHandler<AccountSignUpType> = (data) => {
    console.log(data);
    navigate("/online-apply/document-verification/43");
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
                name="existingAccount"
                control={control}
                error={errors.existingAccount?.message ?? ""}
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
              />
            </Col>
            <Col xs={24} md={12}>
              <InputField
                label="Full name"
                name="fullName"
                control={control}
                error={errors.fullName?.message ?? ""}
                required={true}
              />
            </Col>
            <Col xs={24} md={12}>
              <InputField
                label="Email"
                name="email"
                control={control}
                error={errors.email?.message ?? ""}
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
                options={countryOptions}
                label="Nationality"
                name="nationality"
                control={control}
                size="large"
                placeholder="Select your country"
                error={errors.nationality?.message ?? ""}
                filterName="nationality"
                // onBlur={handleBlur}
                required={true}
              />
            </Col>
            <Col xs={24} md={12}>
              <NepaliDatePickerField
                label="Date of birth (BS)"
                name="dateOfBirthBS"
                control={control}
                error={errors.dateOfBirthBS?.message ?? ""}
                required={true}
              />
            </Col>
            <Col xs={24} md={12}>
              <DatePickerField
                label="Date of birth (AD)"
                name="dateOfBirthAD"
                control={control}
                error={errors.dateOfBirthAD?.message ?? ""}
                placeholder=""
                required={true}
                dateFormat="YYYY-MM-DD"
              />
            </Col>

            <Col xs={24} md={12}>
              <SelectField
                showSearch={true}
                options={[
                  {
                    label: "Mr",
                    value: "mr",
                  },
                  {
                    label: "Miss",
                    value: "miss",
                  },
                  {
                    label: "Minor",
                    value: "minor",
                  },
                ]}
                name="saluation"
                control={control}
                label="Salutation"
                size="large"
                placeholder="Select salutation"
                error={errors.saluation?.message ?? ""}
                required={true}
              />
            </Col>
            <Col xs={24} md={12}>
              <SelectField
                showSearch={true}
                options={[
                  {
                    label: "Male",
                    value: "male",
                  },
                  {
                    label: "Female",
                    value: "female",
                  },
                  {
                    label: "Other",
                    value: "other",
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
                options={[
                  {
                    label: "NPR",
                    value: "npr",
                  },
                  {
                    label: "USD",
                    value: "usd",
                  },
                ]}
                name="currency"
                control={control}
                label="Currency"
                size="large"
                placeholder="Select currency"
                error={errors.currency?.message ?? ""}
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
          >
            Save & Continue
          </Button>
        </form>
      </Card>
    </AccountFormLayout>
  );
};

export default AccountSignUp;
