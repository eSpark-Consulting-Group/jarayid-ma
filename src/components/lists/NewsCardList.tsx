import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import NewsCard from '../NewsCard';
import VideoPlayer from '../VideoPlayer';
import { YoutubeContent } from '../../types';
import { extractYoutubeId } from '../../utils';
import { NO_THUMBNAIL_URL } from '../../constants';
import api from '../../services/api'; // Axios instance
import { fetchYoutubeContent } from '../../services/homeService';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const NewsCardList: React.FC = () => {
  const [data, setData] = useState<YoutubeContent[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [videoPlayer, setVideoPlayer] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YoutubeContent | null>(null);
  const { selectedCategory } = useSelector((state: RootState) => state.home); 

  const fetchVideos = async () => {
    if (!hasNext || loading) return;
    setLoading(true);
    try {
      const res = await fetchYoutubeContent({page, limit: 10, categoryId: selectedCategory?.id || ''});
      const newContents = res.items;
      setData((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const filteredNew = newContents.filter((item: YoutubeContent) => !existingIds.has(item.id));
        return [...prev, ...filteredNew];
      });
      setHasNext(res.pagination.hasNext);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <NewsCard
            key={item?.id || index}
            onPress={() => {
              setSelectedVideo(item);
              setVideoPlayer(true);
            }}
            imageUrl={item.thumbnailUrl || NO_THUMBNAIL_URL}
            title={item.title || "World News"}
          />
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          loading ? <ActivityIndicator style={styles.loader} /> : null
        }
        onEndReached={fetchVideos}
        onEndReachedThreshold={0.5}
      />

      <VideoPlayer
        visible={videoPlayer}
        onClose={() => setVideoPlayer(false)}
        videoId={extractYoutubeId(selectedVideo?.youtubeUrl || '') ?? undefined}
      />
    </View>
  );
};

export default NewsCardList;

const styles = StyleSheet.create({
  contentContainer: {
    gap: 10,
    paddingHorizontal: 10,
  },
  loader: {
    marginHorizontal: 20,
  },
});
