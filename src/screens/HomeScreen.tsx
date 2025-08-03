import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';

import {
  CategoryCardList,
  CustomTab,
  Divider,
  CustomTile,
  NewsCardList,
} from '../components';
import { TABS_CATEGORIES } from '../constants';
import { Theme, useNavigation } from '@react-navigation/native';
import { HomeStackNavigationProp } from '../navigation/navigation';
import CustomImageSlider from '../components/CustomImageSlider';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories, getArticles } from '../services/homeService';
import { AppDispatch } from '../redux/store';
import { RootState } from '../redux/store';
import useTheme from '../theme/useTheme';
import { setArticles, setSelectedCategory } from '../redux/slices/homeSlice';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation<HomeStackNavigationProp<'Home'>>();

  const user = useSelector((state: RootState) => state.auth);
  const { categories, selectedCategory, articles } = useSelector(
    (state: RootState) => state.home,
  );
  const theme = useTheme();
  const [tileStates, setTileStates] = useState<
    Record<string, { isSaved: boolean }>
  >({});

  const [selectedSubCategory, setSelectedSubCategory] = useState<
    (typeof TABS_CATEGORIES)[0]
  >(TABS_CATEGORIES?.[0]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllCategories());
    fetchArticles();
  }, []);

  const fetchArticles = async (categoryId?: string) => {
    const data = await getArticles({
      categoryId,
    });
    const newItems = data.items || [];
    dispatch(setArticles({ articles: newItems }));
  };

  const toggleTileState = useCallback((key: string, field: 'isSaved') => {
    setTileStates(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: !prev[key]?.[field],
      },
    }));
  }, []);

  const handleTabPress = useCallback(
    (value: any) => {
      dispatch(
        setSelectedCategory(
          categories?.find(item => item.id === value.id) || null,
        ),
      );
      fetchArticles(value.id);
    },
    [categories],
  );

  const handleSubCategoryPress = useCallback(
    (value: any) => {
      setSelectedSubCategory(value);
    },
    [categories],
  );

  return (
    <SafeAreaView style={styles(theme.navigationTheme).container}>
      <ScrollView
        contentContainerStyle={styles().scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles().tabsContainer}>
          <CustomTab
            selectedTab={selectedCategory?.id || categories[0]?.id}
            data={categories?.map((item: any) => ({
              id: item.id,
              name: item.name,
            }))}
            onTabPress={handleTabPress}
          />
          <Divider color={theme.dark ? '#666666' : undefined} />
        </View>
        <CustomTab
          data={TABS_CATEGORIES}
          onTabPress={handleSubCategoryPress}
          round
        />
        {selectedCategory?.youtubeContents &&
        selectedCategory?.youtubeContents?.length > 0 ? (
          <NewsCardList />
        ) : null}
        <CategoryCardList onPress={handleTabPress} data={categories ?? []} />
        <CustomImageSlider
          images={[
            'https://picsum.photos/200/300.jpg',
            'https://picsum.photos/200/300.jpg',
            'https://picsum.photos/200/300.jpg',
          ]}
          interval={3000}
        />
        <View style={styles().card}>
          {articles.map((tile, idx) => {
            const key = `${tile.source}-${idx}`;
            const tileState = tileStates[key] || {
              isSaved: false,
            };
            return (
              <View key={key}>
                <CustomTile
                  {...tile}
                  isSaved={tileState.isSaved}
                  onImagePress={() =>
                    navigation.navigate('Article', { article: tile })
                  }
                  onCommentPress={() => console.log('Comment')}
                  onSavePress={() => toggleTileState(key, 'isSaved')}
                />
                {idx == articles.length - 1 ? null : (
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
      padding: 20,
    },
  });

export default HomeScreen;
