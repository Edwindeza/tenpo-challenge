import type { AuthResponse, LoginCredentials } from '../types/auth.types';
import type { User } from '@/shared/types/user.types';

const FAKE_USER: User = {
  id: `user-${Date.now()}`,
  email: 'admin@tenpo.com',
  name: 'Admin',
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const fakeToken = `fake-token-${Date.now()}-${Math.random().toString(36).substring(7)}-${credentials.email}`;

    return {
      token: fakeToken,
      status: 200,
      user: FAKE_USER,
    };
  },

  logout: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
  },
};

