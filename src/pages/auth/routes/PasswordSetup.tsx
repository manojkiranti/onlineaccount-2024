import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { Card, Row, Col, Button } from 'antd';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from '@/components/Form';
import { useSetPasswordMutation } from '@/store/apis/authApi';
import { displayError, displaySuccess } from '@/utils/displayMessageUtils';
import AuthLayout from '../components/AuthLayout';
import LoginBanner from '../components/LoginBanner';

const passwordRequirements = [
  {
    test: (password: string) => password && password.length >= 8,
    message: 'Minimum 8 characters',
  },
  {
    test: (password: string) => /[A-Z]/.test(password),
    message: 'At least one uppercase letter',
  },
  {
    test: (password: string) => /[!@#$&*]/.test(password),
    message: 'At least one special character (!@#$&*)',
  },
];

const setPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .test('password-strength', 'Password does not meet requirements', (value) =>
      passwordRequirements.every((requirement) =>
        requirement.test(value || ''),
      ),
    ),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Repeat password is required'),
});

type SetPasswordFormData = yup.InferType<typeof setPasswordSchema>;

const SetPasswordForm: React.FC = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const uid = queryParams.uid as string | undefined;
  const token = queryParams.token as string | undefined;

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SetPasswordFormData>({
    resolver: yupResolver(setPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });

  const password = watch('password', '');

  const [setPassword, { isLoading: setPasswordLoading }] =
    useSetPasswordMutation();

  const onSubmit: SubmitHandler<SetPasswordFormData> = (data) => {
    if (uid && token) {
      setPassword({ uid: uid, token: token, new_password: data.password })
        .unwrap()
        .then((res) => {
          displaySuccess(res.data?.message);
          navigate('/auth');
        })
        .catch((err) => {
          displayError(err);
        });
    } else {
      displayError('Invalid URL');
    }
  };

  return (
    <AuthLayout banner={<LoginBanner />}>
      <Card style={{ marginTop: '1rem', width: '100%' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={12}>
            <Col xs={24} md={24}>
              <Label label="Password" />
              <InputField
                type="password"
                size="large"
                name="password"
                control={control}
                error={errors.password?.message ?? ''}
              />
            </Col>
            <Col xs={24} md={24}>
              <Label label="Repeat Password" />
              <InputField
                type="password"
                size="large"
                name="repeatPassword"
                control={control}
                error={errors.repeatPassword?.message ?? ''}
              />
            </Col>
            <Col xs={24} md={24}>
              <div style={{ margin: '1rem 0' }}>
                {passwordRequirements.map((requirement, index) => {
                  const isMet = requirement.test(password);
                  return (
                    <div key={index} style={{ color: isMet ? 'green' : 'red' }}>
                      {requirement.message}
                    </div>
                  );
                })}
              </div>
            </Col>
            <Col xs={24} md={24}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                disabled={!isValid}
                style={{ width: '100%' }}
                loading={setPasswordLoading}
              >
                Set Password
              </Button>
            </Col>
          </Row>
        </form>
      </Card>
    </AuthLayout>
  );
};
const Label = ({ label }: { label: string }) => {
  return (
    <div className="form-label-wrap">
      <label
        style={{
          fontWeight: 500,
          display: 'inline-block',
          marginBottom: '5px',
        }}
      >
        {label}
      </label>
    </div>
  );
};
export default SetPasswordForm;
