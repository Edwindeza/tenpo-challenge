class MemoryStorage {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly TOKEN_EXPIRY_DAYS = 1;

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + this.TOKEN_EXPIRY_DAYS);

      document.cookie = `${this.TOKEN_KEY}=${token}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie =>
        cookie.trim().startsWith(`${this.TOKEN_KEY}=`)
      );

      if (tokenCookie) {
        return tokenCookie.split('=')[1];
      }
    }
    return null;
  }

  clearToken(): void {
    if (typeof window !== 'undefined') {
      document.cookie = `${this.TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }
}

export const memoryStorage = new MemoryStorage();

