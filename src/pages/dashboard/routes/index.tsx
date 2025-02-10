import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from './Dashboard';
import Calculator from './Calculator';
import Summary from './Summary';
import ContainerWrapper from '@/pages/layout/ContainerWrapper';

export const DashboardRoutes = () => {
  return (
    <ContainerWrapper>
      <Routes>
        <Route path="" element={<DashboardPage />} />
        <Route path="calculators" element={<Calculator />} />
        <Route path="summary" element={<Summary />} />
        <Route path="*" element={<Navigate to="." />} />
      </Routes>
    </ContainerWrapper>
  );
};
