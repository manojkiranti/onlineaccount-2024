import { Navigate, Route, Routes } from 'react-router-dom';
import CustomerRegister from './CustomerRegister';
import ThankYou from './ThankYou';
export const OnboardingRoutes = () => {
  return (
    <Routes>
      <Route path="thank-you" element={<ThankYou />} />
      <Route path="" element={<CustomerRegister />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
