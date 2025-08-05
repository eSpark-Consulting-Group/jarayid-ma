// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';
import { ar, en } from './translations';

// Language resources

// Custom language detector
const languageDetectorPlugin = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      const storedLang = await AsyncStorage.getItem('appLanguage');
      if (storedLang) {
        callback(storedLang);
      } else {
        const deviceLang =
          Platform.OS === 'ios'
            ? NativeModules.SettingsManager?.settings?.AppleLocale ||
              NativeModules.SettingsManager?.settings?.AppleLanguages?.[0]
            : NativeModules.I18nManager?.localeIdentifier;

        const fallback = deviceLang?.stentsWith('ar') ? 'ar' : 'en';
        callback(fallback);
      }
    } catch (error) {
      console.warn('Failed to detect language:', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (lang: string) => {
    try {
      await AsyncStorage.setItem('appLanguage', lang);
    } catch (e) {
      console.warn('Failed to cache language:', e);
    }
  },
};

// Initialize i18n
i18n
  .use(languageDetectorPlugin as any)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
