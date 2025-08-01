import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { CustomInput, CustomText, CustomTile } from '../components';
import { SearchTabIcon } from '../assets';
import { TILES_DATA } from '../constants';
import useTheme from '../theme/useTheme';

const SearchScreen: React.FC = () => {
  const theme = useTheme();
  const [searchText, setSearchText] = useState('');

  const filteredTiles = TILES_DATA.filter(
    item =>
      item.source.toLowerCase().includes(searchText.toLowerCase()) ||
      item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <CustomText fontFamily="Gilroy-SemiBold" style={styles.headerText}>
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
        />
        <FlatList
          data={filteredTiles}
          renderItem={({ item, index }) => (
            <CustomTile
              {...item}
              key={index}
              isLiked={true}
              isSaved={true}
              onImagePress={() => console.log('navigate')}
              onCommentPress={() => console.log('Comment')}
              onLikePress={() => {
                console.log('Like');
              }}
              onSavePress={() => {
                console.log('Save');
              }}
              onFacebookPress={() => console.log('Facebook')}
              onWhatsappPress={() => console.log('WhatsApp')}
              onXPress={() => console.log('X')}
              onYoutubePress={() => console.log('YT')}
            />
          )}
          keyExtractor={item => item.title}
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
