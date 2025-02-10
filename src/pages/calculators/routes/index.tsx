import { Navigate, Route, Routes } from 'react-router-dom';

import CalculatorsPage from './Main';
import MortgageCalculators from './Mortgage';
import ContainerWrapper from '@/pages/layout/ContainerWrapper';

export const CalculatorRoutes = () => {
  return (
    <ContainerWrapper>
      <Routes>
        <Route path="" element={<CalculatorsPage />} />
        <Route path="calculators/mortgage" element={<MortgageCalculators />} />
        <Route path="*" element={<Navigate to="." />} />
      </Routes>
    </ContainerWrapper>
  );
};
