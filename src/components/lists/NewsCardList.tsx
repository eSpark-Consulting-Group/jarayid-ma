import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import NewsCard from '../NewsCard';
import VideoPlayer from '../VideoPlayer';
import { YoutubeContent } from '../../types';
import { extractYoutubeId } from '../../utils';
import { NO_THUMBNAIL_URL } from '../../constants';

const NewsCardList: React.FC<{ data: YoutubeContent[] }> = ({ data }) => {
  const [videoPlayer, setVideoPlayer] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<YoutubeContent | null>(null);

  console.log('selectedVideo:', selectedVideo);
  return (
    <View>
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={{ gap: 10 }}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={<View style={{ width: 10 }} />}
        ListFooterComponent={<View style={{ width: 10 }} />}
        renderItem={({ item, index }) => (
          <NewsCard
            key={index}
            onPress={() => {
              setSelectedVideo(item);
              setVideoPlayer(true);
            }}
            imageUrl={item.thumbnailUrl || NO_THUMBNAIL_URL}
            title={item.title || "World News"}
          />
        )}
      />
      <VideoPlayer
        visible={videoPlayer}
        onClose={() => setVideoPlayer(!videoPlayer)}
        videoId={extractYoutubeId(selectedVideo?.youtubeUrl || '') ?? undefined}
      />
    </View>
  );
};

export default NewsCardList;

const styles = StyleSheet.create({});
