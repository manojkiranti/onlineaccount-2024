import { Route, Routes } from 'react-router-dom';
import LodgeReturn from './LodgeReturn';
import LodgeReturnApplication from './LodgeReturnApplication';

export const LodgeReturnRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<LodgeReturn />} />
      <Route path="/application/:id?" element={<LodgeReturnApplication />} />
    </Routes>
  );
};
