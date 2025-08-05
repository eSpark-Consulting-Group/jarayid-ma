import React from 'react';
import { Text, TextProps, StyleSheet, DimensionValue } from 'react-native';
import useTheme from '../theme/useTheme';
import { useFontSize } from '../context/FontSizeContext';

interface HeaderTextProps extends TextProps {
  text?: string;
  children?: React.ReactNode;
  fontFamily?:
    | 'Gilroy-Bold'
    | 'Gilroy-ExtraBold'
    | 'Gilroy-Medium'
    | 'Gilroy-Regular'
    | 'Gilroy-SemiBold'
    | 'Inter_24pt-Regular'
    | 'Mondia-Thin'
    | 'Poppins-Medium'
    | 'Poppins-Regular'
    | 'Poppins-SemiBold';
  size?: number;
  color?: string;
  theme: ReactNavigation.Theme;
}

const HeaderText: React.FC<HeaderTextProps> = ({
  text,
  children,
  style,
  fontFamily = 'Gilroy-Medium',
  size = 14,
  color,
  theme,
  ...rest
}) => {
  const content = children ?? text ?? '';
  const { fontSizeValue } = useFontSize(); // <- use fontSizeValue

  return (
    <Text
      style={[
        styles.defaultText,
        {
          fontSize: size + fontSizeValue,
          fontFamily: fontFamily,
          color: color || (theme && theme.colors.text),
        },
        style,
      ]}
      {...rest}
    >
      {content}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    color: '#333', // Default dark gray
  },
});

export default HeaderText;
