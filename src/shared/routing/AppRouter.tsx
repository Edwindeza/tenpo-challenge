import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicLayout } from '@/shared/layouts/PublicLayout';
import { PrivateLayout } from '@/shared/layouts/PrivateLayout';
import { LoginPage } from '@/modules/auth/pages/LoginPage';
import { PhotoListContainer } from '@/modules/home/containers/PhotoListContainer';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTE_PATHS.LOGIN} replace />} />

        <Route
          path={ROUTE_PATHS.LOGIN}
          element={
            <PublicRoute>
              <PublicLayout>
                <LoginPage />
              </PublicLayout>
            </PublicRoute>
          }
        />

        <Route
          path={ROUTE_PATHS.HOME}
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <PhotoListContainer />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={ROUTE_PATHS.LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

