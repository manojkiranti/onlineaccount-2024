import { useNavigate } from "react-router-dom";
import { Card, Button } from "antd";
import Title from "antd/es/typography/Title";
import AccountFormLayout from "../components/AccountFormLayout";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountSignUpSchema } from "../schema";
import { AccountSignUpType } from "../types";
import { InputField, DatePickerField } from "@/components/Form";

const AccountSignUp = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(accountSignUpSchema),
  });

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
          <InputField
            label="Full name"
            name="fullName"
            control={control}
            error={errors.fullName?.message ?? ""}
            required={true}
        
          />

          <InputField
            label="Email"
            name="email"
            control={control}
            error={errors.email?.message ?? ""}
            required={true}
          />

          <InputField
            label="Mobile Number"
            name="mobileNumber"
            control={control}
            error={errors.mobileNumber?.message ?? ""}
            required={true}
          />
          <DatePickerField
            label="Date of birth"
            name="dob"
            control={control}
            error={errors.dob?.message ?? ""}
            placeholder=""
            required={true}
          />

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
