import React from 'react';
import { View, StyleSheet } from 'react-native';

type DividerProps = {
  color?: string;
};

const Divider: React.FC<DividerProps> = ({ color = '#E5E7EB' }) => {
  return <View style={[styles.divider, { backgroundColor: color }]} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 8,
  },
});

export default Divider;
