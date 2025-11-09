import { Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';
import { useAuthStore } from '@/shared/infrastructure/store/authStore';

type PublicRouteProps = {
  children: React.ReactNode;
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.HOME} replace />;
  }

  return <>{children}</>;
};

