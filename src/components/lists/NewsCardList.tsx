import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import NewsCard from '../NewsCard';
import VideoPlayer from '../VideoPlayer';

const NewsCardList: React.FC = () => {
  const [videoPlayer, setVideoPlayer] = useState<boolean>(false);
  return (
    <View>
      <FlatList
        data={Array(5)}
        horizontal
        contentContainerStyle={{ gap: 10 }}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={<View style={{ width: 10 }} />}
        ListFooterComponent={<View style={{ width: 10 }} />}
        renderItem={({ item, index }) => (
          <NewsCard
            key={index}
            onPress={() => setVideoPlayer(true)}
            imageUrl="https://www.breakingnewstoday.co.uk/wp-content/uploads/2020/03/shutterstock_1109954519.jpg"
            title="World News"
          />
        )}
      />
      <VideoPlayer
        visible={videoPlayer}
        onClose={() => setVideoPlayer(!videoPlayer)}
      />
    </View>
  );
};

export default NewsCardList;

const styles = StyleSheet.create({});
