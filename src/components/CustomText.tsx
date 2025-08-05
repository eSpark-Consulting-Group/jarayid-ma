import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import useTheme from '../theme/useTheme';
import { useFontSize } from '../context/FontSizeContext'; // <- import this

interface CustomTextProps extends TextProps {
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
    | 'Mondia-ExtraBold'
    | 'Poppins-Medium'
    | 'Poppins-Regular'
    | 'Poppins-SemiBold';
  size?: number;
  color?: string;
}

const CustomText: React.FC<CustomTextProps> = ({
  text,
  children,
  style,
  fontFamily = 'Gilroy-Medium',
  size = 14,
  color,
  ...rest
}) => {
  const { colors } = useTheme();
  const { fontSizeValue } = useFontSize();
  const content = children ?? text ?? '';

  return (
    <Text
      style={[
        styles.defaultText,
        {
          fontSize: size + fontSizeValue, // apply adjustment
          fontFamily,
          color: color || colors.text,
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
    color: '#333',
  },
});

export default CustomText;
