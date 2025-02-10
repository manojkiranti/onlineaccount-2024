import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ThankYou from './ThankYou';
export const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="thank-you" element={<ThankYou />} />
      <Route path="" element={<Home />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
