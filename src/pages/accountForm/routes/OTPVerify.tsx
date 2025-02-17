import { useForm } from "react-hook-form";
import { Button, Card, Typography, Input, Row, Col, message } from "antd";
import AccountFormLayout from "../components/AccountFormLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyStepOneMutation } from "../api/stepAPI";
import { displayErrorMsg } from "@/utils/displayMessageUtils";

const { Title, Text } = Typography;
type FormValues = {
  otp: string;
};
const OTPVerify = () => {
  const {ref} =   useParams();
  const navigate =  useNavigate();
  const [verifyOTP, {isLoading:verifyOTPLoading}] = useVerifyStepOneMutation();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    if (!data.otp) {
        message.error('Please enter the OTP.');
        return;
      }
      verifyOTP({otpCode: data.otp, referenceNumber: ref}).unwrap()
      .then((res) => {
        navigate(`/online-apply/step-two/${res.data.token}`)
      }).catch((err) => {
        displayErrorMsg(err?.data?.message)
      });
  };
  return (
    <AccountFormLayout currentStep={0} currentStepProgress={30}>
      <Card>
        <Title level={4} style={{ marginBottom: "1.5rem" }}>
          Enter the otp code send to your give mobile number
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row justify="center" gutter={[16, 16]}>
            <Col xs={24}>
              <Input.OTP
                variant="filled"
                size="large"
                style={{

                  textAlign: "center",
                  height: "100px",
                }}
                onChange={(otp: string) => setValue("otp", otp)}
              />
              {errors.otp && (
                <Text
                  type="danger"
                  style={{
                    display: "block",
                    marginTop: "5px",
                    textAlign: "center",
                  }}
                >
                  {errors.otp.message}
                </Text>
              )}
            </Col>

            <Col xs={24}>
              <Button type="primary" htmlType="submit" size="large" disabled={verifyOTPLoading} loading={verifyOTPLoading} >
                Submit
              </Button>
            </Col>
          </Row>
        </form>
      </Card>
    </AccountFormLayout>
  );
};

export default OTPVerify;
