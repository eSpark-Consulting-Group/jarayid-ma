import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CustomCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const CustomCard: React.FC<CustomCardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EDEDED', // Tailwind's gray-200
    padding: 12,
    elevation: 3,
  },
});

export default CustomCard;
