import { create } from 'zustand';

type Theme = 'dark' | 'light';

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'dark',

  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    }));
  },

  setTheme: (theme: Theme) => {
    set({ theme });
  },
}));

