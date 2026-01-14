import { useEffect, useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  // Try to get theme from store first, then fallback to localStorage
  const storeTheme = useAppStore((state) => state.settings.theme);
  const [theme, setTheme] = useState<Theme>(() => {
    // Priority: store > localStorage > system
    if (storeTheme) return storeTheme;
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  });

  // Sync with store theme
  useEffect(() => {
    if (storeTheme && storeTheme !== theme) {
      setTheme(storeTheme);
    }
  }, [storeTheme]);

  useEffect(() => {
    // Update resolved theme when theme changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      };
      
      updateTheme(mediaQuery);
      mediaQuery.addEventListener('change', updateTheme);
      
      return () => {
        mediaQuery.removeEventListener('change', updateTheme);
      };
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  const setThemeAndSave = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return {
    theme,
    resolvedTheme,
    setTheme: setThemeAndSave,
  };
}
