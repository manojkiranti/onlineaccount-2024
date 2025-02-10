import { Divider, Typography } from 'antd';
import AuthLayout from '../components/AuthLayout';
import RegisterBanner from '../components/RegisterBanner';
import RegisterForm from '../components/RegisterForm';
import styles from '../styles/Register.module.scss';
import { GoogleLoginButton } from '@/components/Elements';
import { setAuthToken, setUserDetails } from '@/store/slices/auth/authSlice';
import { displayError } from '@/utils/displayMessageUtils';
import queryString from 'query-string';
import {
  useFetchGoogleAuthLinkQuery,
  useVerifyGoogleTokenMutation,
} from '@/store/apis/authApi';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/hooks/hooks';
import { useLocation, useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;
  const hasRun = useRef(false);

  const {
    data: googleAuthUrl,
    isLoading: isGoogleAuthUrlLoading,
    isError: isGoogleAuthUrlError,
  } = useFetchGoogleAuthLinkQuery();

  const [verifyGoogleToken, { isSuccess: isVerifyGoogleTokenSuccess }] =
    useVerifyGoogleTokenMutation();

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const queryParams = queryString.parse(location.search);
    const code = queryParams.code;
    if (queryParams && queryParams.code && !isVerifyGoogleTokenSuccess) {
      if (typeof code === 'string') {
        verifyGoogleToken({ code })
          .unwrap()
          .then((response) => {
            dispatch(
              setAuthToken({
                token: response.data.access_token,
                refreshToken: response.data.refresh_token,
              }),
            );
            dispatch(
              setUserDetails({
                email: response.data.email,
                name: response.data.name,
              }),
            );
            navigate('/dashboard');
          })
          .catch((error) => {
            displayError(error);
          });
      } else {
        console.error('Expected code to be a string, received:', typeof code);
      }
    }
  }, [search]);
  const handleLoginWithGoogle = () => {
    if (googleAuthUrl) {
      window.location.replace(googleAuthUrl);
    }
  };
  return (
    <AuthLayout banner={<RegisterBanner />}>
      <div>
        <div className={styles.registerTitleContainerStyles}>
          <Typography.Title
            level={2}
            style={{
              color: '#003862',
            }}
          >
            Create an account
          </Typography.Title>
          <Typography.Paragraph
            style={{
              color: '#475569',
            }}
          >
            Kindly fill in the information to continue.
          </Typography.Paragraph>
        </div>
        <div className={styles.googleButtonContainerStyles}>
          <GoogleLoginButton
            handleButtonClick={handleLoginWithGoogle}
            isLoading={isGoogleAuthUrlLoading}
            isError={isGoogleAuthUrlError}
          />
        </div>
        <div className={styles.googleButtonContainerStyles}></div>
        <Divider
          style={{
            color: 'grey',
          }}
        >
          or
        </Divider>
        <RegisterForm />
      </div>
    </AuthLayout>
  );
};

export default Register;
