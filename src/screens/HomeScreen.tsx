import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';

import {
  CategoryCardList,
  CustomTab,
  Divider,
  CustomTile,
  NewsCardList,
} from '../components';
import { TABS_CATEGORIES, TILES_DATA } from '../constants';
import { Theme, useNavigation } from '@react-navigation/native';
import { HomeStackNavigationProp } from '../navigation/navigation';
import CustomImageSlider from '../components/CustomImageSlider';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../services/homeService';
import { AppDispatch } from '../redux/store';
import { RootState } from '../redux/store';
import useTheme from '../theme/useTheme';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation<HomeStackNavigationProp<'Home'>>();

  const user = useSelector((state: RootState) => state.auth);
  const { categories } = useSelector((state: RootState) => state.home);
  console.log('User:', user, 'home', categories);
  const theme = useTheme();
  const [tileStates, setTileStates] = useState<
    Record<string, { isLiked: boolean; isSaved: boolean }>
  >({});
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

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

  const handleTabPress = useCallback((value: any) => {
    console.log('Selected:', value);
  }, []);

  return (
    <SafeAreaView style={styles(theme.navigationTheme).container}>
      <ScrollView
        contentContainerStyle={styles().scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles().tabsContainer}>
          <CustomTab
            data={categories?.map((item: any) => ({
              id: item.id,
              name: item.name,
            }))}
            onTabPress={handleTabPress}
          />
          <Divider color={theme.dark ? '#666666' : undefined} />
          <CustomTab data={TABS_CATEGORIES} onTabPress={handleTabPress} round />
        </View>
        <NewsCardList />
        <CategoryCardList />
        <CustomImageSlider
          images={[
            'https://picsum.photos/200/300.jpg',
            'https://picsum.photos/200/300.jpg',
            'https://picsum.photos/200/300.jpg',
          ]}
          interval={3000}
        />
        <View style={styles().card}>
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
                  onImagePress={() => navigation.navigate('Article')}
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = (theme?: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.colors.background,
    },
    tabsContainer: { alignItems: 'center', gap: 5, paddingHorizontal: 10 },
    scrollContent: {
      gap: 15,
    },
    card: {
      paddingHorizontal: 20,
    },
  });

export default HomeScreen;
