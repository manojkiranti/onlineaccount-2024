import { Navigate, Route, Routes } from 'react-router-dom';

import { RefinanceRoutes } from './Refinance/routes';
import PreapprovalPage from './Preapproval';
import ExistingMortgagesPage from './Settled';
import PurchaseCalculator from './PurchaseCalculator';

import { PurchaseRoutes } from './Purchase';
import ContainerWrapper from '@/pages/layout/ContainerWrapper';

export const MortgageRoutes = () => {
  return (
    <ContainerWrapper>
      <Routes>
        <Route path="purchase/*" element={<PurchaseRoutes />} />
        <Route path="purchase/calculator" element={<PurchaseCalculator />} />
        <Route path="refinance/*" element={<RefinanceRoutes />} />
        <Route path="preapproval" element={<PreapprovalPage />} />
        <Route path="settled" element={<ExistingMortgagesPage />} />
        <Route path="*" element={<Navigate to="." />} />
      </Routes>
    </ContainerWrapper>
  );
};
