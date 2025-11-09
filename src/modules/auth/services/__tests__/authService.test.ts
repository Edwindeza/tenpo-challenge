import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { authService } from '../authService';
import type { LoginCredentials } from '../../types/auth.types';

describe('authService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('login', () => {
    it('debe retornar un token y usuario válidos', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const promise = authService.login(credentials);
      vi.advanceTimersByTime(500);
      const response = await promise;

      expect(response).toHaveProperty('token');
      expect(response).toHaveProperty('user');
      expect(response).toHaveProperty('status', 200);
      expect(response.token).toContain('fake-token');
      expect(response.token).toContain(credentials.email);
      expect(response.user.email).toBe('admin@tenpo.com');
      expect(response.user.name).toBe('Admin');
      expect(response.user.id).toContain('user-');
    });

    it('debe generar tokens únicos para cada login', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const promise1 = authService.login(credentials);
      vi.advanceTimersByTime(500);
      const response1 = await promise1;

      vi.advanceTimersByTime(100);

      const promise2 = authService.login(credentials);
      vi.advanceTimersByTime(500);
      const response2 = await promise2;

      expect(response1.token).not.toBe(response2.token);
    });

    it('debe simular un delay de 500ms', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const startTime = Date.now();
      const promise = authService.login(credentials);
      
      vi.advanceTimersByTime(499);
      expect(await Promise.race([promise, Promise.resolve('pending')])).toBe('pending');
      
      vi.advanceTimersByTime(1);
      await promise;
      
      expect(Date.now() - startTime).toBeGreaterThanOrEqual(0);
    });
  });

  describe('logout', () => {
    it('debe completarse sin errores', async () => {
      const promise = authService.logout();
      vi.advanceTimersByTime(200);
      await expect(promise).resolves.toBeUndefined();
    });

    it('debe simular un delay de 200ms', async () => {
      const promise = authService.logout();
      
      vi.advanceTimersByTime(199);
      expect(await Promise.race([promise, Promise.resolve('pending')])).toBe('pending');
      
      vi.advanceTimersByTime(1);
      await promise;
    });
  });
});

