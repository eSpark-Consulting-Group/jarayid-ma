import React, { useState, useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';

import { CustomCard, CustomTile } from '../components';
import CustomTab from '../components/CustomTab';
import Divider from '../components/Divider';
import { TABS_COUNTRIES, TABS_CATEGORIES, TILES_DATA } from '../constants';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CustomTab data={TABS_COUNTRIES} onTabPress={handleTabPress} />
        <Divider />
        <CustomTab data={TABS_CATEGORIES} onTabPress={handleTabPress} round />
        <CustomCard style={styles.card}>
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
                <View style={{ height: 10 }} />
              </View>
            );
          })}
        </CustomCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  scrollContent: {
    // paddingTop: 20,
  },
  card: {
    marginTop: 10,
  },
});

export default HomeScreen;
