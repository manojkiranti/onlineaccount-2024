
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from "@/components/Elements";
import { Button, Col, Row, message, Breadcrumb, Card, Dropdown, Space } from "antd";
import {  ChequeRequestType, ChequeStopPaymentType } from "../types";
import {  chequeRequestSchema, chequeStopPaymentSchema } from "../schema";
import { InputField, RadioGroupField, SelectField } from "@/components/Form";

import { DownOutlined, HomeOutlined } from "@ant-design/icons";
import { useCustomerServiceRequestMutation } from "@/store/apis/coreApi";
import { displayError } from "@/utils/displayMessageUtils";
import { customerSericesMenu } from "../constant";
import { BRANCH_LIST } from "@/constant/options";
import { Link } from "react-router-dom";
import useOtpModal from "@/hooks/useOtpModal";

const siteKey = import.meta.env.VITE_CAPTCHA_SITE_KEY;

const ChequeStopRequest = () => {
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
  } = useForm<ChequeStopPaymentType>({
    defaultValues: {
        
    },
    resolver: yupResolver(chequeStopPaymentSchema),
  });

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const onSubmit = (data: ChequeStopPaymentType) => {
    if (!captchaValue) {
        messageApi.error("Please complete the reCAPTCHA to submit the form.")
        return;
      }
      postCustomerRequest({accountName: data.accountName, accountNumber: data.accountNumber, phone: data.phone,
        prop_values:{...data}, product:'CUSTOMER_SERVICE', service_type:'CHEQUE_STOP'}).unwrap()
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
         <Card title="Cheque Stop Payment">
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
                      label="Account Name"
                      name="accountName"
                      control={control}
                      error={errors.accountName?.message ?? ""}
                      placeholder="Enter your name"
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
                      placeholder="Enter your mobile number"
                      size="large"
                      required={true}
                    />
                  </Col>
                  
            

               
                  <Col xs={24} md={8}>
                    <SelectField
                        options={[
                            {label: "Court Order", value: "court_order"},
                            {label: "Dispute", value: "dispute"},
                            {label: "Cheque Reported As Lost", value: "cheque_reported_lost"},
                            {label: "Cheque Reported As Misplaced", value: "cheque_reported_misplaced"},
                            {label: "Stop Payment Request Over Telephone", value: "stop_payment_telephone"},
                            {label: "Cheque Reported As Stolen", value: "cheque_reported_stolen"},
                            {label: "Stop Payment Reported Due To Other Reason", value: "other_reason"},
                            {label: "Wrongly Delivered", value: "wrongly_delivered"}
                        ]}
                        label="Reason"
                        name="reason"
                        control={control}
                        error={errors.reason?.message ?? ""}
                        placeholder="Reason"
                        size="large"
                        required={true}
                        showSearch={true}
                        
                        />
                  </Col>
                 
                  <Col xs={24} md={8}>
                    <InputField
                      label="Amount"
                      name="amount"    
                      type="number"        
                      control={control}
                      error={errors.amount?.message ?? ""}
                      placeholder="Amount"
                      size="large"
                      required={true}
                    />
                  </Col>
                  
                  <Col xs={24} md={8}>
                    <InputField
                      label="Cheque Number"
                      name="chequeNumber"         
                      control={control}
                      error={errors.chequeNumber?.message ?? ""}
                      placeholder="Cheque Number"
                      size="large"
                      required={true}
                    />
                  </Col>
                 
                 
                  <Col xs={24}>
                    <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaChange} />
                  </Col>
                  
                </Row>
                <Col xs={24} style={{marginTop:"1rem"}}>
                  <Button type="primary" htmlType="submit" size="large" loading={isLoading} disabled={isLoading}>
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

export default ChequeStopRequest;
