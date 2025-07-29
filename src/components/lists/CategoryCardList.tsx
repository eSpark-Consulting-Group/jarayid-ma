import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import CategoryCard from '../CategoryCard';

const CategoryCardList: React.FC = () => {
  return (
    <FlatList
      data={Array(4)}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <CategoryCard
          imageUrl="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1HdERX.img?w=640&h=428&m=6"
          categoryName="Gaza"
        />
      )}
    />
  );
};

export default CategoryCardList;

const styles = StyleSheet.create({});
