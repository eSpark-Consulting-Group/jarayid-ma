// src/theme/themes.ts
import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    text: '#000000',
    primary: '#0A84FF',
    card: '#f2f2f2',
    border: '#e0e0e0',
    notification: '#ff453a',
  },
};

export const DarkModeTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    text: '#ffffff',
    primary: '#0A84FF',
    card: '#1e1e1e',
    border: '#272727',
    notification: '#ff453a',
  },
};
