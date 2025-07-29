import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.rssText}>RSS ملخص</Text>
      <View style={styles.brandContainer}>
        <Text style={styles.brandText}>JARAYID</Text>
        <Text style={styles.brandDomain}>.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 40,
  },
  rssText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  brandText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  brandDomain: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
});

export default Header;