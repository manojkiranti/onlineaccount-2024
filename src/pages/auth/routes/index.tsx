import { Route, Routes } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import VerifyEmail from './VerifyEmail';
import PasswordSetup from './PasswordSetup';
import { AuthWrapper } from '@/components/Layout';
import ForgetPassword from './ForgetPassword';
import VerifyRegisterEmail from './VerifyRegisterEmail';

export const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route
          path="verify-email"
          element={
            <AuthWrapper>
              <VerifyEmail />
            </AuthWrapper>
          }
        />
        <Route
          path="verify-register-email"
          element={
            <AuthWrapper>
              <VerifyRegisterEmail />
            </AuthWrapper>
          }
        />
        <Route path="password-setup" element={<PasswordSetup />} />
      </Routes>
    </>
  );
};
