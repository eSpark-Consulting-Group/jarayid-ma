import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { CustomTile } from '../components';
import { TILES_DATA } from '../constants';
import { useTheme } from '@react-navigation/native';

const ReadLaterScreen: React.FC = () => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FlatList
        data={TILES_DATA}
        contentContainerStyle={{ padding: 20, gap: 20 }}
        renderItem={({ item }) => (
          <CustomTile
            {...item}
            isLiked={false}
            isSaved={false}
            onImagePress={() => {}}
            onCommentPress={() => console.log('Comment')}
            onLikePress={() => {}}
            onSavePress={() => {}}
            onFacebookPress={() => console.log('Facebook')}
            onWhatsappPress={() => console.log('WhatsApp')}
            onXPress={() => console.log('X')}
            onYoutubePress={() => console.log('YT')}
          />
        )}
        keyExtractor={item => item?.imageUrl}
        ItemSeparatorComponent={() => (
          <View
            style={{ height: 1, backgroundColor: '#8F8F8F66', marginTop: 20 }}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ReadLaterScreen;
