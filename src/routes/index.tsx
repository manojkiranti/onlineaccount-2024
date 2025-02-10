import { useRoutes } from 'react-router-dom';

import { authRoutes } from './auth';
import { publicRoutes } from './public';
import { protectedRoutes } from './protected';

export const AppRoutes = () => {
  /**
   * TODO: Filter procted routes and public routes remaining.
   * TODO: create a hook to verify authenticated user
   */

  const element = useRoutes([
    ...publicRoutes,
    ...authRoutes,
    ...protectedRoutes,
  ]);

  return <>{element}</>;
};
