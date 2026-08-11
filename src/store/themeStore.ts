import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => {
          if (state.theme === 'light') return { theme: 'dark' };
          if (state.theme === 'dark') return { theme: 'light' };
          
          // If system, check actual system preference and toggle to the opposite
          const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
          return { theme: prefersDark ? 'light' : 'dark' };
        }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
