import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { memoryStorage } from '../storage/memoryStorage';
import { useAuthStore } from '../store/authStore';
import { ROUTE_PATHS } from '@/shared/routing/routePaths';

export const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {

      // Interceptor para agregar el token al header de la request.
      const token = memoryStorage.getToken();

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      // Interceptor para manejar el error de autentificación.
      if (error.response?.status === 401) {
        const logout = useAuthStore.getState().logout;
        logout();

        if (typeof window !== 'undefined') {
          window.location.href = ROUTE_PATHS.LOGIN;
        }
      }

      return Promise.reject(error);
    }
  );
};

