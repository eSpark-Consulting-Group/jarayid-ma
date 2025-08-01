// src/theme/themes.ts
import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    text: '#333',
    primary: '#3281CA',
    card: '#EDEDED',
    border: '#e0e0e0',
    notification: '#ff453a',
  },
};

export const DarkModeTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#161616ff',
    text: '#ffffff',
    primary: '#3281CA',
    card: '#1e1e1e',
    border: '#272727',
    notification: '#ff453a',
  },
};
