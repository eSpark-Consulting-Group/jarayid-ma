import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import NewsCard from '../NewsCard';

const NewsCardList: React.FC = () => {
  return (
    <View>
      <FlatList
        data={Array(5)}
        horizontal
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={<View style={{ width: 10 }} />}
        ListFooterComponent={<View style={{ width: 10 }} />}
        renderItem={({ item, index }) => (
          <NewsCard
            key={index}
            imageUrl="https://www.breakingnewstoday.co.uk/wp-content/uploads/2020/03/shutterstock_1109954519.jpg"
            title="World News"
          />
        )}
      />
    </View>
  );
};

export default NewsCardList;

const styles = StyleSheet.create({});
