import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Appearance, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = '@app:theme';

function getSystemTheme(): Theme {
  return 'dark'; // Default to dark for Hemp Ramps
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const { setColorScheme } = useNativeWindColorScheme();

  const applyTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      setColorScheme(newTheme);

      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    },
    [setColorScheme],
  );

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
          applyTheme(stored);
        } else {
          applyTheme(getSystemTheme());
        }
      } catch {
        applyTheme(getSystemTheme());
      }
    };
    loadTheme();
  }, [applyTheme]);

  const setTheme = useCallback(
    async (newTheme: Theme) => {
      try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
        applyTheme(newTheme);
      } catch {
        // handle silently
      }
    },
    [applyTheme],
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
