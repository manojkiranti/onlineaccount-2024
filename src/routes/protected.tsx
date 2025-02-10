import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
/**
 * * code splitting
 *  This approach reduces the initial load time by loading the component only when it's needed.
 */
import { lazyImport } from '@/utils/lazyImport';

import { MainLayout } from '@/components/Layout';
import { Spinner } from '@/components/Elements';

/**
 * todo: should use lazyImport for code splitting
 */
import { ProfilePage } from '@/pages/profile';
import { MortgageRoutes } from '@/pages/mortgage';
import { TaxRoutes } from '@/pages/tax';
import { FXRoutes } from '@/pages/fx';
import { CalculatorRoutes } from '@/pages/calculators';
import { UsefulPage } from '@/pages/useful';
import { RequireAuth } from '@/components/Auth/RequireAuth';
import Calculator from '@/pages/dashboard/routes/Calculator';

const { DashboardRoutes } = lazyImport(
  () => import('@/pages/dashboard'),
  'DashboardRoutes',
);

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '',
    element: <RequireAuth />,
    children: [
      {
        path: '',
        element: <App />,
        children: [
          { path: 'dashboard/*', element: <DashboardRoutes /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'mortgage/*', element: <MortgageRoutes /> },
          { path: 'tax/*', element: <TaxRoutes /> },
          { path: 'fx/*', element: <FXRoutes /> },
          { path: 'calculators/*', element: <CalculatorRoutes /> },
          { path: 'useful/*', element: <UsefulPage /> },
          { path: '*', element: <Navigate to="." /> },
        ],
      },
    ],
  },
];
