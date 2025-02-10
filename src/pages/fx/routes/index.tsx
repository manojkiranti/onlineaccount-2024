import { Navigate, Route, Routes } from 'react-router-dom';

import OfxPage from './Ofx';
import TorfxPage from './Torfx';
import ContainerWrapper from '@/pages/layout/ContainerWrapper';

export const FXRoutes = () => {
  return (
    <ContainerWrapper>
      <Routes>
        <Route path="ofx" element={<OfxPage />} />
        <Route path="torfx" element={<TorfxPage />} />
      </Routes>
    </ContainerWrapper>
  );
};
