// src/theme/useTheme.ts
import { useTheme as useNavigationTheme } from '@react-navigation/native';
import { useThemeContext } from '../context/ThemeContext';

const useTheme = () => {
  const navigationTheme = useNavigationTheme(); // This gives { colors, dark }
  const { toggleTheme, isDark } = useThemeContext();

  return {
    colors: navigationTheme.colors,
    dark: navigationTheme.dark,
    toggleTheme,
    isDark,
  };
};

export default useTheme;
