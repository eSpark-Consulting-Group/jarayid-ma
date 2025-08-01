import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import CategoryCard from '../CategoryCard';
import { Category } from '../../types';
import { NO_THUMBNAIL_URL } from '../../constants';

const CategoryCardList: React.FC<{ data: Category[], onPress?: (category: Category) => void }> = ({ data, onPress }) => {
  return (
    <FlatList
      data={data}
      numColumns={2}
      style={{ margin: 10 }}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 10, height: 10 }} />}
      renderItem={({ item, index }) => (
        <CategoryCard
          onPress={() => onPress?.(item)}
          imageUrl={item?.logo || NO_THUMBNAIL_URL}
          categoryName={item?.name || "Unknown"}
        />
      )}
    />
  );
};

export default CategoryCardList;

const styles = StyleSheet.create({});
