import { Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';
import { useAuthStore } from '@/shared/infrastructure/store/authStore';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  return <>{children}</>;
};

