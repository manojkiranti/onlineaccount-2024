import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "@/components/Elements";
import {
  Button,
  Col,
  Row,
  message,
  Breadcrumb,
  Card,
  Dropdown,
  Space,
} from "antd";
import { NewDebitCardFormType } from "../types";
import { newDebitCardSchema } from "../schema";
import { InputField, SelectField } from "@/components/Form";
import { BRANCH_LIST } from "@/constant/options";
import { DownOutlined, HomeOutlined } from "@ant-design/icons";
import { useCustomerServiceRequestMutation } from "@/store/apis/coreApi";
import { displayError } from "@/utils/displayMessageUtils";
import { cardMenuItems } from "../constant";
import useOtpModal from "@/hooks/useOtpModal";
import { Link } from "react-router-dom";

const siteKey = import.meta.env.VITE_CAPTCHA_SITE_KEY;

const NewDebitCard = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [serviceRefNumber, setServiceRefNumber] = useState<string | null>(null);
  const [postCustomerRequest, { isLoading }] =
    useCustomerServiceRequestMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewDebitCardFormType>({
    defaultValues: {},
    resolver: yupResolver(newDebitCardSchema),
  });

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const onSubmit = (data: NewDebitCardFormType) => {
    if (!captchaValue) {
      messageApi.error("Please complete the reCAPTCHA to submit the form.");
      return;
    }
    postCustomerRequest({...data, product:'CARD', service_type:'NEW_DEBIT_CARD_REQUEST'}).unwrap()
    .then(response => {
      setServiceId(response.data.service_type)
      setServiceRefNumber(response.data.ref_number)
      showOtpModal();
    }).catch(err => {
      displayError(err);
    })
    
  };

  const handleServiceSubmission = () => {
    navigate('/')
  };

  const { showModal: showOtpModal, OtpModalComponent } = useOtpModal({
    serviceId: serviceId,
    refNumber: serviceRefNumber,
    handleServiceSubmission: handleServiceSubmission
  });

  return (
    <>
      {contextHolder}

      <Container width="sm">
   
        <Row>
          <Col xs={24}>
            <Card title="New Debit Card">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={30}>
                  <Col xs={24} md={8}>
                    <InputField
                      label="Account Number"
                      name="accountNumber"
                      control={control}
                      error={errors.accountNumber?.message ?? ""}
                      placeholder="Enter your registered account number"
                      size="large"
                      required={true}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <InputField
                      label="Mobile Number"
                      name="phone"
                      control={control}
                      error={errors.phone?.message ?? ""}
                      placeholder="Enter you registered mobile number"
                      size="large"
                      required={true}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <InputField
                      label="Account Name"
                      name="accountName"
                      control={control}
                      error={errors.accountName?.message ?? ""}
                      placeholder="Account Name"
                      size="large"
                      required={true}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <SelectField
                      options={BRANCH_LIST}
                      label="Branch"
                      name="branch"
                      control={control}
                      error={errors.branch?.message ?? ""}
                      placeholder="Branch"
                      size="large"
                      required={true}
                      showSearch={true}
                      fieldNames={{
                        label: "branchName",
                        value: "id",
                      }}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <InputField
                      label="Email"
                      name="email"
                      control={control}
                      error={errors.email?.message ?? ""}
                      placeholder="Email"
                      size="large"
                      required={true}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <InputField
                      label="Address"
                      name="address"
                      control={control}
                      error={errors.address?.message ?? ""}
                      placeholder="Address"
                      size="large"
                      required={true}
                    />
                  </Col>
                  <Col xs={24}>
                    <ReCAPTCHA
                      sitekey={siteKey}
                      onChange={handleCaptchaChange}
                    />
                  </Col>
                </Row>
                <Col xs={24} style={{ marginTop: "1rem" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Submit
                  </Button>
                </Col>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
      {OtpModalComponent}
    </>
  );
};

export default NewDebitCard;
