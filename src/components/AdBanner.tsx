import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';

interface AdBannerProps {
  image: any; // Local require(...) or { uri: string }
  link?: string; // Optional URL to open on press
}

const AdBanner: React.FC<AdBannerProps> = ({ image, link }) => {
  const handlePress = () => {
    if (link) {
      Linking.openURL(link).catch(err =>
        console.error('Failed to open ad link:', err),
      );
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={link ? 0.7 : 1}
      onPress={handlePress}
      style={styles.container}
    >
      <Image source={image} style={styles.banner} resizeMode="cover" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  banner: {
    width: '100%',
    height: 100, // Adjust as needed based on layout
    borderRadius: 12,
  },
});

export default AdBanner;
