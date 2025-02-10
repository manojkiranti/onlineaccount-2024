import { Route, Routes } from 'react-router-dom';

import Purchase from './Purchase';
import PurchaseDetail from './PurchaseDetail';
import PersonalDetail from './PersonalDetail';
import PropertyDetail from './PropertyDetail';
import IncomeDetail from './IncomeDetail';

export const PurchaseRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Purchase />} />
      <Route path="step/purchase-detail/:id?" element={<PurchaseDetail />} />
      <Route path="step/personal-detail/:id" element={<PersonalDetail />} />
      <Route path="step/property-detail/:id" element={<PropertyDetail />} />
      <Route path="step/income-detail/:id" element={<IncomeDetail />} />
    </Routes>
  );
};
