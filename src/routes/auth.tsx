import { lazyImport } from '@/utils/lazyImport';

const { AuthRoutes } = lazyImport(() => import('@/pages/auth'), 'AuthRoutes');

export const authRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
];
