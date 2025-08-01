import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { CustomInput, CustomText, CustomTile } from '../components';
import { SearchTabIcon } from '../assets';
import { TILES_DATA } from '../constants';
import { searchArticles } from '../services/searchService';
import { Article } from '../types';

const SearchScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFilteredArticles = async () => {
    try {
      setLoading(true);
      const data = await searchArticles({ search: searchText });
      setArticles(data.items || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchText.trim().length > 0) {
        fetchFilteredArticles();
      } else {
        setArticles([]);
      }
    }, 400);

    return () => clearTimeout(debounce);
  }, [searchText]);
  return (
    <SafeAreaView style={styles.container}>
      <CustomText fontFamily="Gilroy-SemiBold" style={styles.headerText}>
        Search
      </CustomText>

      <View style={styles.inputContainer}>
        <CustomInput
          icon={<SearchTabIcon color={'#484C52'} style={styles.iconStyle} />}
          style={styles.inputStyle}
          iconName="email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          data={articles}
          renderItem={({ item, index }) => (
            <CustomTile
              date={item.publishedAt.split('T')[0]}
              imageUrl={item.image}
              source={item.source}
              title={item.title}
              isLiked={true}
              isSaved={true}
              onImagePress={() => console.log('navigate')}
              onCommentPress={() => console.log('Comment')}
              onLikePress={() => console.log('Like')}
              onSavePress={() => console.log('Save')}
              onFacebookPress={() => console.log('Facebook')}
              onWhatsappPress={() => console.log('WhatsApp')}
              onXPress={() => console.log('X')}
              onYoutubePress={() => console.log('YT')}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 23,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  inputStyle: {
    backgroundColor: '#F2F2F2',
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
