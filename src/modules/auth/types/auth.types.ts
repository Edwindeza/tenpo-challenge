import type { User } from '@/shared/types/user.types';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  status: number;
  user: User;
};

