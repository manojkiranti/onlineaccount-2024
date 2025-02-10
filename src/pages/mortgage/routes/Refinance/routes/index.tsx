import { Route, Routes } from 'react-router-dom';

import Refinance from './Refinance';
import PersonalDetail from './PersonalDetail';
import PropertyDetail from './PropertyDetail';
import IncomeDetail from './IncomeDetail';

export const RefinanceRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Refinance />} />
      <Route path="step/personal-detail/:id?" element={<PersonalDetail />} />
      <Route path="step/property-detail/:id" element={<PropertyDetail />} />
      <Route path="step/income-detail/:id" element={<IncomeDetail />} />
    </Routes>
  );
};
