import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { GoogleLoginButton, PageLoader } from '@/components/Elements';
import {
  setAuthToken,
  setUserDetails,
  setTempToken,
} from '@/store/slices/auth/authSlice';
import {
  useFetchGoogleAuthLinkQuery,
  useVerifyGoogleTokenMutation,
} from '@/store/apis/authApi';
import { useAppDispatch } from '@/hooks/hooks';
import { displayError, displaySuccess } from '@/utils/displayMessageUtils';
import LoginForm from '../components/LoginForm';
import { Divider, Modal, Typography } from 'antd';

import styles from '../styles/Login.module.scss';
import AuthLayout from '../components/AuthLayout';
import LoginBanner from '../components/LoginBanner';
import Verify2faCode from '../components/Verify2faCode';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;
  const hasRun = useRef(false);
  const [openCodeVerifyModel, setOpenCodeVerifyModel] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const {
    data: googleAuthUrl,
    isLoading: isGoogleAuthUrlLoading,
    isError: isGoogleAuthUrlError,
  } = useFetchGoogleAuthLinkQuery();

  const [
    verifyGoogleToken,
    {
      isSuccess: isVerifyGoogleTokenSuccess,
      isLoading: verifyGoogleTokenLoading,
    },
  ] = useVerifyGoogleTokenMutation();

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
            if (response?.data.two_factor_required) {
              dispatch(
                setTempToken({
                  tempToken: response?.data.temp_token as string,
                }),
              );
              setOpenCodeVerifyModel(true);
            } else {
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
              if (response.data.message) {
                displaySuccess(response.data.message);
              }

              navigate(from, { replace: true });
            }
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

  const handleCloseVerifyModel = () => {
    setOpenCodeVerifyModel(false);
  };

  const handeVerifySuccess = () => {
    navigate(from, { replace: true });
  };

  return (
    <>
      <AuthLayout banner={<LoginBanner />}>
        <div>
          <div className={styles.loginTitleContainerStyles}>
            <Typography.Title
              level={2}
              style={{
                color: '#003862',
              }}
            >
              Login
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
          <Divider
            style={{
              color: 'grey',
            }}
          >
            or
          </Divider>
          <LoginForm />
        </div>
        <div className={styles.regsiterLink}>
          Don't have an account? <Link to="/auth/register">Create Account</Link>
        </div>
      </AuthLayout>
      <PageLoader
        isLoading={isGoogleAuthUrlLoading || verifyGoogleTokenLoading}
      />
      <Modal
        title="Two-factor authentication (2FA) has been enabled for your account. Please enter the verification code to proceed"
        open={openCodeVerifyModel}
        onCancel={handleCloseVerifyModel}
        footer={null}
      >
        <Verify2faCode handeVerifySuccess={handeVerifySuccess} />
      </Modal>
    </>
  );
};

export default Login;
