/**
 * * code splitting
 *  This approach reduces the initial load time by loading the component only when it's needed.
 */
import { Spinner } from '@/components/Elements';
import { PublicLayout } from '@/components/Layout';
import ThankYou from '@/pages/onboarding/routes/ThankYou';
import { lazyImport } from '@/utils/lazyImport';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Dynamically imports the `OnboardingRoutes` component using the `lazyImport` function.
 *
 * This approach helps to:
 * - Improve application performance by reducing the initial bundle size.
 * - Load the `OnboardingRoutes` component only when it is actually needed,
 *   thereby enabling code splitting.
 */
const { HomeRoutes } = lazyImport(
  () => import('@/pages/home'),
  'HomeRoutes',
);

const { AccountRoutes } = lazyImport(
  () => import('@/pages/accountForm'),
  'AccountRoutes',
);



const App = () => {
  return (

      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
   
  );
};
export const publicRoutes = [
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomeRoutes />,
      },
      {
        path: 'online-apply/*',
        element: <AccountRoutes />,
      },
      {
        path: 'thank-you',
        element: <ThankYou />,
      },
    ],
  },
];
