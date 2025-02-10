import { Row, Col, Typography, Button, Card } from 'antd';
import AuthLayout from '../components/AuthLayout';
import LoginBanner from '../components/LoginBanner';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from '../styles/Login.module.scss';
import { FormTitleLabel, InputField } from '@/components/Form';
import { useForgetPasswordMutation } from '@/store/apis/authApi';
import { error } from 'console';
import { displayError, displaySuccess } from '@/utils/displayMessageUtils';

const forgetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('username is required'),
});
type FormData = yup.InferType<typeof forgetPasswordSchema>;
const ForgetPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const [forgetPassword, { isLoading: forgetPasswordLoading }] =
    useForgetPasswordMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    forgetPassword(data)
      .unwrap()
      .then((data) => {
        console.log('Forget Password Response', data);
        displaySuccess(data.message);
      })
      .catch((error) => {
        displayError(error);
      });
  };
  return (
    <AuthLayout banner={<LoginBanner />}>
      <div className={styles.loginTitleContainerStyles}>
        <Typography.Title
          level={2}
          style={{
            color: '#003862',
          }}
        >
          Forget Password
        </Typography.Title>
        <Typography.Paragraph
          style={{
            color: '#475569',
          }}
        >
          Please enter your registered email address to receive a password reset
          link.
        </Typography.Paragraph>
        <Card style={{ width: '100%' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={12}>
              <Col xs={24} md={24}>
                <FormTitleLabel label="Email" />
                <InputField
                  size="large"
                  name="email"
                  control={control}
                  error={errors.email?.message ?? ''}
                />
              </Col>

              <Col xs={24} md={24}>
                <Button
                  type="primary"
                  loading={forgetPasswordLoading}
                  htmlType="submit"
                  size="large"
                  style={{ width: '100%' }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </form>
        </Card>
      </div>
    </AuthLayout>
  );
};

export default ForgetPassword;
