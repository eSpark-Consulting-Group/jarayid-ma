import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "./CustomText";


interface ButtonGradientProps {
  onPress: () => void;
  title: React.ReactNode;
  color?: string[];
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  gradientStyle?: ViewStyle | ViewStyle[];
  disabled?: boolean;
}

const ButtonGradient: React.FC<ButtonGradientProps> = ({
  onPress,
  title,
  color = ["#007AFF", "#005DE0"],
  style,
  textStyle,
  gradientStyle,
  disabled = false,
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
        <CustomText style={[styles.buttonText, textStyle]}>{title}</CustomText>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    overflow: "hidden",
  },
  gradient: {
    borderRadius: 8,
    height: 32,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ButtonGradient;