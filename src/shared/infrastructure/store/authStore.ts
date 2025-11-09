import { create } from 'zustand';
import { memoryStorage } from '../storage/memoryStorage';
import { queryClient } from '../query/queryClient';
import type { User } from '@/shared/types/user.types';

type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user?: User) => void;
  logout: () => void;
  initialize: () => void;
};

// Funcion que me permite inicializar el estado de autenticacion desde las cookies
const initializeAuth = (): { token: string | null; isAuthenticated: boolean } => {
  const token = memoryStorage.getToken();
  return {
    token,
    isAuthenticated: !!token,
  };
};

export const useAuthStore = create<AuthState>((set) => {

  // Zustand tiene un middleware persis que se encarga de inicializar el estado de la store al iniciar la app.
  // Sin embargo, "persist" no soporta cookies.
  // Por lo tanto, tenemos que inicializar el estado de autenticacion manualmente, ya que estoy usando cookies 
  // Porque quiero que el token expire en 1 dia como medida de seguridad para el challenge.

  const initialAuth = initializeAuth();

  return {
    token: initialAuth.token,
    user: null,
    isAuthenticated: initialAuth.isAuthenticated,

    login: (token: string, user?: User) => {
      memoryStorage.setToken(token);
      set({
        token,
        user: user || null,
        isAuthenticated: true,
      });
    },

    logout: () => {
      memoryStorage.clearToken();
      queryClient.clear();
      set({
        token: null,
        user: null,
        isAuthenticated: false,
      });
    },

    initialize: () => {
      const auth = initializeAuth();
      set({
        token: auth.token,
        isAuthenticated: auth.isAuthenticated,
      });
    },
  };
});

