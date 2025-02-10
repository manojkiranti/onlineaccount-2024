import { InputField, SelectField } from '@/components/Form';
import { useCountryOptions } from '@/hooks/useCountryOptions';
import {
  useResendRegisterEmailMutation,
  useUserRegisterMutation,
} from '@/store/apis/authApi';
import { useFetchCountryByIPQuery } from '@/store/apis/coreApi';
import { displayError, displaySuccess } from '@/utils/displayMessageUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Col, Flex, Row, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { getCountryData, ICountryData, TCountryCode } from 'countries-list';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import * as yup from 'yup';

const registerSchema = yup.object().shape({
  fullname: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  password: yup
    .string()
    .required('Password is required')
    .test('password-strength', 'Password does not meet requirements', (value) =>
      passwordRequirements.every((requirement) =>
        requirement.test(value || ''),
      ),
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Repeat password is required'),
  countryCode: yup.string().required('Country is required'),
});

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
type RegisterFormData = yup.InferType<typeof registerSchema>;
const RegisterForm = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const countryOptions = useCountryOptions();
  const [countryDetail, setCountryDetail] = useState<ICountryData | null>(null);
  const [showResend, setShowResend] = useState(false);
  const [userRegister, { isLoading: registerLoading }] =
    useUserRegisterMutation();
  const [
    resendVerificationEmail,
    { isLoading: resendVerificationEmailLoading },
  ] = useResendRegisterEmailMutation();

  const { data: countryData, isLoading } = useFetchCountryByIPQuery();

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const password = watch('password', '');
  const watchResidence = watch('countryCode');

  useEffect(() => {
    if (countryData) {
      setValue('countryCode', countryData.data.country);
    }
  }, [countryData]);

  useEffect(() => {
    if (watchResidence) {
      const countryDetail = getCountryData(watchResidence as TCountryCode);
      setCountryDetail(countryDetail);
    }
  }, [watchResidence]);

  const onSubmit = (data: RegisterFormData) => {
    const payload = {
      email: data.email,
      fullname: data.fullname,
      phone: `+${countryDetail?.phone[0]}${data.phone}`,
      password: data.password,
      country: data.countryCode,
    };
    userRegister({
      body: payload,
      source: params.get('source') || '',
    })
      .unwrap()
      .then((data) => {
        displaySuccess(data.data.message);
        setShowResend(true);
      })
      .catch((err) => {
        displayError(err);
      });
  };

  const handleResendEmail = () => {
    const email = getValues('email');
    resendVerificationEmail({ email })
      .unwrap()
      .then((data) => {
        displaySuccess(data.data.message);
      })
      .catch((err) => {
        console.log(err);
        displayError(err);
      });
  };

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={30}>
            <Col xs={24} md={12}>
              <Label label="Full Name" />
              <InputField
                size="large"
                name="fullname"
                control={control}
                error={errors.fullname?.message ?? ''}
              />
            </Col>
            <Col xs={24} md={12}>
              <Label label="Email" />
              <InputField
                size="large"
                name="email"
                control={control}
                error={errors.email?.message ?? ''}
              />
            </Col>
            <Col xs={24} md={12}>
              <Label label="Country Of Residence" />
              <SelectField
                showSearch={true}
                options={countryOptions}
                name="countryCode"
                disabled={isLoading}
                control={control}
                size="large"
                placeholder="Select your country"
                error={errors.countryCode?.message ?? ''}
                // onBlur={handleBlur}
                required={true}
              />
            </Col>
            <Col xs={24} md={12}>
              <Label label="Phone" />
              <InputField
                size="large"
                prefix={countryDetail ? `+ ${countryDetail.phone[0]}` : ''}
                name="phone"
                control={control}
                error={errors.phone?.message ?? ''}
              />
            </Col>
            <Col xs={24} md={12}>
              <Label label="Password" />
              <InputField
                size="large"
                name="password"
                type="password"
                control={control}
                error={errors.password?.message ?? ''}
              />
            </Col>
            <Col xs={24} md={12}>
              <Label label="Confirm Password" />
              <InputField
                size="large"
                type="password"
                name="confirmPassword"
                control={control}
                error={errors.confirmPassword?.message ?? ''}
              />
            </Col>
            <Col xs={24} md={24}>
              <ul
                style={{
                  margin: '1rem 0',
                  paddingLeft: '0',
                  listStyle: 'none',
                }}
              >
                {passwordRequirements.map((requirement, index) => {
                  const isMet = requirement.test(password);
                  return (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px',
                        color: isMet ? 'green' : 'red',
                        fontWeight: 500,
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          marginRight: '10px',
                        }}
                      >
                        {isMet ? '✅' : '❌'}
                      </span>
                      {requirement.message}
                    </li>
                  );
                })}
              </ul>
            </Col>
            <Col xs={24} md={24}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: '100%' }}
                loading={registerLoading}
                disabled={registerLoading}
              >
                Register
              </Button>
              <Flex justify="center" style={{ marginTop: '1rem' }} gap={10}>
                <Typography>Already have an account? </Typography>{' '}
                <Link to="/auth">Login</Link>
              </Flex>
            </Col>
          </Row>
        </form>
      </Card>
      {showResend && (
        <Flex align="center" justify="center">
          <Paragraph style={{ margin: '0' }}>
            Didn't receive the verification email? Check your spam folder or try
            resending it.
          </Paragraph>
          <Button
            loading={resendVerificationEmailLoading}
            disabled={resendVerificationEmailLoading}
            type="link"
            onClick={handleResendEmail}
          >
            Resend
          </Button>
        </Flex>
      )}
      {showResend && (
        <Paragraph type="warning" style={{ textAlign: 'center' }}>
          You can only resend the verification email once every minute.
        </Paragraph>
      )}
    </>
  );
};

export default RegisterForm;

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
