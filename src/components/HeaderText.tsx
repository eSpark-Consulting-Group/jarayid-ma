import React from 'react';
import { Text, TextProps, StyleSheet, DimensionValue } from 'react-native';
import useTheme from '../theme/useTheme';

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
  size,
  color,
  theme,
  ...rest
}) => {
  const content = children ?? text ?? '';

  return (
    <Text
      style={[
        styles.defaultText,
        {
          fontSize: size || 14,
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
