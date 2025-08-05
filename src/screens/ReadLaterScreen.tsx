import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { LegendList } from '@legendapp/list';

import { CustomText, CustomTile } from '../components';
import {
  fetchAllReadLaterArticles,
  readLater,
  ReadLaterServiceItem,
} from '../services/readLaterService';

const ReadLaterScreen: React.FC = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [readLaterItems, setReadLaterItems] = useState<ReadLaterServiceItem[]>(
    [],
  );

  useFocusEffect(
    useCallback(() => {
      getAllReadLater();
    }, []),
  );

  const getAllReadLater = async () => {
    setLoading(true);
    try {
      const response = await fetchAllReadLaterArticles();
      setLoading(false);
      console.log('Read later response Agaya:', JSON.stringify(response));
      if (response.success && response.data) {
        const readLaterItemsList = response.data.filter(
          item => item._count.readLater > 0,
        );
        if (readLaterItemsList.length === 0) {
          setError('No saved articles found.');
        } else {
          setReadLaterItems(readLaterItemsList);
        }
      } else {
        console.error(
          'Action failed:',
          response?.error?.message || 'Unknown error',
        );
      }
    } catch (error) {
      setLoading(false);
      console.error('Error toggling read later:', error);
    }
  };

  const handleReadLater = async (articleId: string) => {
    try {
      const response = await readLater(articleId);
      console.log('Read later response:', JSON.stringify(response));
      if (response?.status === 'success') {
        setReadLaterItems(prevItems => {
          const exists = prevItems.some(item => item.id === articleId);
          if (!exists) return prevItems;
          return prevItems.filter(item => item.id !== articleId);
        });
        if (readLaterItems.length === 0) {
          setError('No saved articles found.');
        }
      } else {
        console.error('Action failed:', response?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error toggling read later:', error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : readLaterItems && readLaterItems.length > 0 ? (
        <LegendList
          data={readLaterItems}
          estimatedItemSize={250}
          renderItem={({ item }) => (
            <CustomTile
              {...item}
              isSaved={true}
              onImagePress={() => {}}
              onCommentPress={() => console.log('Comment')}
              onSavePress={() => handleReadLater(item.id)}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => (
            <View
              style={{ height: 1, backgroundColor: '#8F8F8F66', marginTop: 20 }}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, gap: 20 }}
        />
      ) : (
        <View style={styles.errorContainer}>
          <CustomText style={{ color: theme.colors.text }}>{error}</CustomText>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default ReadLaterScreen;
