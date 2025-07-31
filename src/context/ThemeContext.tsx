// src/theme/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightTheme, DarkModeTheme } from '../theme/theme'; // update path if needed

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  toggleTheme: () => {},
  isDark: false,
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from storage on mount
  const loadTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('@theme');
      if (value === 'dark') {
        setIsDark(true);
      } else {
        setIsDark(false); // default is light
      }
    } catch (e) {
      console.error('Failed to load theme', e);
    } finally {
      setIsLoaded(true);
    }
  };
  useEffect(() => {
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newIsDark = !isDark;
      setIsDark(newIsDark);
      await AsyncStorage.setItem('@theme', newIsDark ? 'dark' : 'light');
    } catch (e) {
      console.error('Failed to save theme', e);
    }
  };

  const theme = isDark ? DarkModeTheme : LightTheme;

  // Prevent rendering before theme is loaded
  if (!isLoaded) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
