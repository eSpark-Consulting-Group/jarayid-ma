import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FONT_SIZE_KEY = 'app_font_size';

interface FontSizeContextType {
  fontSizeValue: number;
  setFontSizeValue: (value: number) => void;
}

const FontSizeContext = createContext<FontSizeContextType>({
  fontSizeValue: 0,
  setFontSizeValue: () => {},
});

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  const [fontSizeValue, setFontSizeValueState] = useState(0);

  // Load from AsyncStorage on mount
  const loadFontSize = async () => {
    try {
      const storedValue = await AsyncStorage.getItem(FONT_SIZE_KEY);
      if (storedValue !== null) {
        setFontSizeValueState(Number(storedValue));
      }
    } catch (error) {
      console.error('Failed to load font size:', error);
    }
  };

  useEffect(() => {
    loadFontSize();
  }, []);

  useEffect(() => {
    console.log(`Font size value loaded: ${fontSizeValue}`);
  }, [fontSizeValue]);

  // Save to AsyncStorage and update state
  const setFontSizeValue = async (value: number) => {
    try {
      await AsyncStorage.setItem(FONT_SIZE_KEY, value.toString());
      setFontSizeValueState(value);
    } catch (error) {
      console.error('Failed to save font size:', error);
    }
  };

  return (
    <FontSizeContext.Provider value={{ fontSizeValue, setFontSizeValue }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => useContext(FontSizeContext);
