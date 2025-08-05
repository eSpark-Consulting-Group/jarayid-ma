import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { CustomInput, CustomText, CustomTile } from '../components';
import { SearchTabIcon } from '../assets';
import { Article } from '../types';

import useTheme from '../theme/useTheme';
import { getArticles } from '../services/articleService';

const LIMIT = 6;

const SearchScreen: React.FC = () => {
  const theme = useTheme();
  const [searchText, setSearchText] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <ActivityIndicator style={{ marginBottom: 130 }} color={'#0A84FF'} />
    );
  };

  const fetchFilteredArticles = async (reset = false) => {
    if (loading || isFetchingMore) return;

    if (reset) {
      setLoading(true);
      setPage(1);
    } else {
      setIsFetchingMore(true);
    }

    try {
      const data = await getArticles({
        search: searchText,
        page: reset ? 1 : page,
        limit: LIMIT,
      });

      const newItems = data.items || [];
      setArticles(prev =>
        reset
          ? newItems
          : [
              ...prev,
              ...newItems.filter(
                (item: Article) => !prev.some(p => p.id === item.id),
              ),
            ],
      );
      setHasMore(newItems.length === LIMIT);
      if (!reset) setPage(prev => prev + 1);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchText.trim().length > 0) {
        fetchFilteredArticles(true);
      } else {
        setArticles([]);
        setPage(1);
        setHasMore(true);
      }
    }, 400);

    return () => clearTimeout(debounce);
  }, [searchText]);

  const handleEndReached = () => {
    if (hasMore && !loading && !isFetchingMore) {
      fetchFilteredArticles();
    }
  };
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <CustomText
        fontFamily="Gilroy-SemiBold"
        size={23}
        style={styles.headerText}
      >
        Search
      </CustomText>

      <View style={styles.inputContainer}>
        <CustomInput
          icon={<SearchTabIcon color={'#484C52'} style={styles.iconStyle} />}
          style={styles.inputStyle}
          bgColor={theme.dark ? '#1e1e1e' : '#F2F2F2'}
          iconName="email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={searchText}
          onChangeText={setSearchText}
          // placeholder="Search Here"
        />
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <CustomTile
              {...item}
              data={item}
              isSaved={true}
              onImagePress={() => console.log('navigate')}
              onCommentPress={() => console.log('Comment')}
              onSavePress={() => console.log('Save')}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headerText: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  inputStyle: {
    borderRadius: 7,
  },
  iconStyle: {
    marginRight: 10,
  },
  flatListContent: {
    gap: 20,
  },
});

export default SearchScreen;
