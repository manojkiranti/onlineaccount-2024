import { Route, Routes } from 'react-router-dom';
// import LodgeReturn from './routes/LodgeReturn/routes/LodgeReturn';
import { LodgeReturnRoutes } from './routes/LodgeReturn/routes';
import TaxAdvicePage from './routes/TaxAdvice';

export const TaxRoutes = () => {
  return (
    <div style={{ width: '100%', alignSelf: 'baseline' }}>
      <Routes>
        <Route path="lodge-return/*" element={<LodgeReturnRoutes />} />
        <Route path="tax-advice/*" element={<TaxAdvicePage />} />
      </Routes>
    </div>
  );
};
