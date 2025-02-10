import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';

import { useVerify2FAMutation } from '@/store/apis/authApi';
import { displayError } from '@/utils/displayMessageUtils';
import { Button, Flex, Input } from 'antd';
import {
  setAuthToken,
  setUserDetails,
  clearTempToken,
} from '@/store/slices/auth/authSlice';

interface Verify2faCodeProps {
  handeVerifySuccess: () => void;
}

const Verify2faCode: FC<Verify2faCodeProps> = ({ handeVerifySuccess }) => {
  const [verifyTwoFactorAuth, { isLoading: verify2faLoading }] =
    useVerify2FAMutation();
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  useEffect(() => {
    setCode('');
  }, []);

  const verifyCode = () => {
    verifyTwoFactorAuth({
      code: Number(code),
      temp_token: authState.tempToken as string,
    })
      .unwrap()
      .then((res) => {
        dispatch(
          setAuthToken({
            token: res.access_token,
            refreshToken: res.refresh_token,
          }),
        );
        dispatch(
          setUserDetails({
            email: res.email,
            name: res.fullname,
            isAdmin: res.is_admin,
            is2FAEnabled: res.is_2fa_enabled,
          }),
        );
        dispatch(clearTempToken());
        handeVerifySuccess();
      })
      .catch((err) => {
        displayError(err);
      });
  };

  return (
    <>
      <div style={{ padding: '1rem' }}>
        <Input.OTP
          id="code"
          value={code}
          onChange={(e) => setCode(e)}
          length={6}
          size="large"
        />
        <Flex justify="flex-end" style={{ marginTop: '2rem' }}>
          <Button
            onClick={verifyCode}
            disabled={code.length < 6}
            type="primary"
            size="large"
            loading={verify2faLoading}
          >
            Verify now
          </Button>
        </Flex>
      </div>
    </>
  );
};

export default Verify2faCode;
