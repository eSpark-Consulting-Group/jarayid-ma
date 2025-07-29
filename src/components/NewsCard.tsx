import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { PlayBtn } from '../assets';

interface NewsCardProps {
  imageUrl: string;
  title: string;
  onPress?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ imageUrl, title, onPress }) => {
  return (
    <View style={styles.container}>
      <CustomText text={title} size={18} />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.imageContainer}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{ borderRadius: 15, width: 150, height: 220 }}
        />
        <View style={styles.imageShade} />
        <PlayBtn style={{ position: 'absolute' }} />
      </TouchableOpacity>
    </View>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 10, marginVertical: 10 },
  imageContainer: { alignItems: 'center', justifyContent: 'center' },
  imageShade: {
    position: 'absolute',
    backgroundColor: '#000',
    width: 150,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.3,
    borderRadius: 15,
  },
});
