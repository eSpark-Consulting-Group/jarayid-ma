import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB', // Tailwind's gray-200
    width: '100%',
    marginVertical: 8,
  },
});

export default Divider;
