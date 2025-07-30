import React, { useState, useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';

import {
  CategoryCardList,
  CustomCard,
  CustomTab,
  Divider,
  CustomTile,
  NewsCardList,
} from '../components';
import { TABS_COUNTRIES, TABS_CATEGORIES, TILES_DATA } from '../constants';

interface ArticleScreenProps {
  navigation: any;
}

const ArticleScreen: React.FC<ArticleScreenProps> = () => {
  const [tileStates, setTileStates] = useState<
    Record<string, { isLiked: boolean; isSaved: boolean }>
  >({});

  const toggleTileState = useCallback(
    (key: string, field: 'isLiked' | 'isSaved') => {
      setTileStates(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          [field]: !prev[key]?.[field],
        },
      }));
    },
    [],
  );

  const handleTabPress = useCallback((value: string) => {
    console.log('Selected:', value);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* <View style={{ alignItems: 'center' }}>
          <CustomTab data={TABS_COUNTRIES} onTabPress={handleTabPress} />
          <Divider />
          <CustomTab data={TABS_CATEGORIES} onTabPress={handleTabPress} round />
        </View>
        <NewsCardList />
        <CategoryCardList />
        <View style={styles.card}>
          <View>
            {TILES_DATA.map((tile, idx) => {
              const key = `${tile.source}-${idx}`;
              const tileState = tileStates[key] || {
                isLiked: false,
                isSaved: false,
              };
              return (
                <View key={key}>
                  <CustomTile
                    {...tile}
                    isLiked={tileState.isLiked}
                    isSaved={tileState.isSaved}
                    onImagePress={() => console.log('navigate')}
                    onCommentPress={() => console.log('Comment')}
                    onLikePress={() => toggleTileState(key, 'isLiked')}
                    onSavePress={() => toggleTileState(key, 'isSaved')}
                    onFacebookPress={() => console.log('Facebook')}
                    onWhatsappPress={() => console.log('WhatsApp')}
                    onXPress={() => console.log('X')}
                    onYoutubePress={() => console.log('YT')}
                  />
                  {idx == TILES_DATA.length - 1 ? null : (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: '#8F8F8F66',
                        marginVertical: 20,
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    // paddingTop: 20,
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
  },
});

export default ArticleScreen;
