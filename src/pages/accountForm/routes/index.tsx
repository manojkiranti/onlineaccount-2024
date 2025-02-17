// MobankRoutes.tsx
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import DocumentVerification from './DocumentVerification';

import AccountSignUp from './AccountSignUp';
import OTPVerify from './OTPVerify';
import AddressStep from './AddressStep';
import EmploymentStep from './EmploymentStep';
import DeclarationStep from './DeclarationStep';



export const AccountRoutes: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Routes>
        <Route path="customer-register/:id" element={<AccountSignUp />} />
        <Route path="verify-otp/:ref" element={<OTPVerify />} />
        <Route path="step-two/:token" element={<AddressStep />} />
        <Route path="step-three/:token" element={<EmploymentStep />} />
        <Route path="step-four/:token" element={<DeclarationStep />} />
        <Route path="document-verification/:userId" element={<DocumentVerification />} />

        {/* Redirect any unknown paths to the default route */}
        <Route path="*" element={<Navigate to="." />} />
  </Routes>
  );
};
