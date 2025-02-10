// MobankRoutes.tsx
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import DocumentVerification from './DocumentVerification';
import AddressEmployment from './AddressEmployment';
import AccountSignUp from './AccountSignUp';



export const AccountRoutes: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Routes>
        <Route path="customer-register/:id" element={<AccountSignUp />} />
        <Route path="document-verification/:userId" element={<DocumentVerification />} />
        <Route path="address-employment/:userId" element={<AddressEmployment />} />
        {/* Redirect any unknown paths to the default route */}
        <Route path="*" element={<Navigate to="." />} />
  </Routes>
  );
};
