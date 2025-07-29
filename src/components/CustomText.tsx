import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface CustomTextProps extends TextProps {
  text?: string;
  children?: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({
  text,
  children,
  style,
  ...rest
}) => {
  const content = children ?? text ?? '';

  return (
    <Text style={[styles.defaultText, style]} {...rest}>
      {content}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 16,
    color: '#333', // Default dark gray
  },
});

export default CustomText;
