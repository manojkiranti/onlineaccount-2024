import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { PageLoader } from '@/components/Elements';
import { displayError, displaySuccess } from '@/utils/displayMessageUtils';
import { Alert } from 'antd';
import { useVerifyRegisterEmailQuery } from '@/store/apis/authApi';

const VerifyRegisterEmail = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const token = queryParams.token as string | undefined;
  const navigate = useNavigate();

  const {
    data: verifyTokenRes,
    isLoading: verifyTokenLoading,
    isError: verifyTokenError,
    error: verifyTokenErrorMsg,
  } = useVerifyRegisterEmailQuery({ token: token || '' }, { skip: !token });

  useEffect(() => {
    console.log('verifyTokenError', verifyTokenErrorMsg);
    if (verifyTokenError) {
      displayError(verifyTokenErrorMsg);
    }
    if (verifyTokenRes) {
      console.log('verifyTokenRes', verifyTokenRes);
      displaySuccess(verifyTokenRes?.data?.message);
      setTimeout(() => {
        navigate(`/auth`);
      }, 1000);
    }
  }, [verifyTokenError, verifyTokenErrorMsg, navigate, verifyTokenRes]);

  if (verifyTokenError) {
    const errorMessage =
      (verifyTokenErrorMsg as any)?.data?.error || 'An unknown error occurred';
    return <Alert message="Error" description={errorMessage} type="error" />;
  }
  if (verifyTokenLoading) {
    return (
      <>
        <PageLoader isLoading={verifyTokenLoading} />
      </>
    );
  }

  if (!token) {
    return (
      <Alert message="Error" description="No Token Provided" type="error" />
    );
  }

  if (verifyTokenRes) {
    return (
      <div>
        <Alert
          message="Congratulation"
          description={verifyTokenRes?.data?.message ?? 'Email verified'}
          type="success"
        />
      </div>
    );
  }

  return null;
};

export default VerifyRegisterEmail;
