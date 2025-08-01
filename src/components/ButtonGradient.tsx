import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import CustomText from './CustomText';
import HeaderText from './HeaderText';

interface ButtonGradientProps {
  onPress: () => void;
  title: React.ReactNode;
  color?: string[];
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  gradientStyle?: ViewStyle | ViewStyle[];
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  isHeader?: boolean;
  theme?: ReactNavigation.Theme;
}

const ButtonGradient: React.FC<ButtonGradientProps> = ({
  onPress,
  title,
  color = ['#007AFF', '#005DE0'],
  style,
  textStyle,
  gradientStyle,
  disabled = false,
  iconLeft,
  isHeader,
  theme,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.button, style]}
      disabled={disabled}
    >
      <LinearGradient
        colors={color}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, gradientStyle]}
      >
        {isHeader ? (
          <HeaderText style={[styles.buttonText, textStyle]} theme={theme!}>
            {title}
          </HeaderText>
        ) : (
          <CustomText style={[styles.buttonText, textStyle]}>
            {title}
          </CustomText>
        )}
        {iconLeft}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: 8,
    height: 32,
    width: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ButtonGradient;
