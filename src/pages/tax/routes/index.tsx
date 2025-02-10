import { Navigate, Route, Routes } from 'react-router-dom';

import TaxAdvicePage from './TaxAdvice';
import LodgeReturn from './LodgeReturn/routes/LodgeReturn';
import ContainerWrapper from '@/pages/layout/ContainerWrapper';

export const TaxRoutes = () => {
  return (
    <ContainerWrapper>
      <Routes>
        <Route path="lodge-return" element={<LodgeReturn />} />
        <Route path="tax-advice" element={<TaxAdvicePage />} />
      </Routes>
    </ContainerWrapper>
  );
};
