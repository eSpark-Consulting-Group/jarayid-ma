import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import CustomText from './CustomText';

interface CategoryCardProps {
  imageUrl: string;
  categoryName: string;
  onPress?: () => void;
  hide?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  imageUrl,
  categoryName,
  onPress,
  hide,
}) => {
  return (
    <View style={[styles.container, { opacity: hide ? 0 : 1 }]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.imageContainer}
        onPress={onPress}
      >
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </TouchableOpacity>
      <CustomText text={categoryName} size={18} />
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
    margin: 10,
  },
  imageContainer: { width: '100%', height: 120 },
  image: { flex: 1, width: '100%', borderRadius: 10 },
});
