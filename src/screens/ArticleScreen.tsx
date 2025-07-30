import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  TextInput,
} from 'react-native';

import { CustomTile, CustomText } from '../components';
import { TILES_DATA, COMMENTS_DATA } from '../constants';
import { useNavigation } from '@react-navigation/native';
import CommentItem from '../components/CommentItem';

interface ArticleScreenProps {
  navigation: any;
}

type TileState = { isLiked: boolean; isSaved: boolean };
type CommentState = {
  isLiked: boolean;
  isDisliked: boolean;
  likeCount: number;
  dislikeCount: number;
};

const getInitialCommentStates = (): Record<string, CommentState> => {
  const initialState: Record<string, CommentState> = {};
  COMMENTS_DATA.forEach(comment => {
    initialState[comment.id] = {
      isLiked: false,
      isDisliked: false,
      likeCount: comment.likeCount,
      dislikeCount: comment.dislikeCount,
    };
  });
  return initialState;
};

const ArticleScreen: React.FC<ArticleScreenProps> = () => {
  const navigation = useNavigation();
  const [tileStates, setTileStates] = useState<Record<string, TileState>>({});
  const [commentStates, setCommentStates] = useState<
    Record<string, CommentState>
  >({});

  useEffect(() => {
    setCommentStates(getInitialCommentStates());
  }, []);

  const toggleTileState = useCallback((key: string, field: keyof TileState) => {
    setTileStates(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: !prev[key]?.[field],
      },
    }));
  }, []);

  const toggleCommentState = useCallback(
    (key: string, field: 'isLiked' | 'isDisliked') => {
      setCommentStates(prev => {
        const current = prev[key] || {
          isLiked: false,
          isDisliked: false,
          likeCount: 0,
          dislikeCount: 0,
        };

        let { isLiked, isDisliked, likeCount, dislikeCount } = current;

        if (field === 'isLiked') {
          if (isLiked) {
            likeCount -= 1;
            isLiked = false;
          } else {
            likeCount += 1;
            isLiked = true;
            if (isDisliked) {
              dislikeCount -= 1;
              isDisliked = false;
            }
          }
        } else {
          if (isDisliked) {
            dislikeCount -= 1;
            isDisliked = false;
          } else {
            dislikeCount += 1;
            isDisliked = true;
            if (isLiked) {
              likeCount -= 1;
              isLiked = false;
            }
          }
        }

        return {
          ...prev,
          [key]: {
            isLiked,
            isDisliked,
            likeCount,
            dislikeCount,
          },
        };
      });
    },
    [],
  );

  const renderCommentItem = ({ item }: { item: (typeof COMMENTS_DATA)[0] }) => {
    const commentState = commentStates[item.id] || {
      isLiked: false,
      isDisliked: false,
      likeCount: item.likeCount,
      dislikeCount: item.dislikeCount,
    };

    return (
      <CommentItem
        key={item.id}
        initials={item.initials}
        message={item.message}
        time={item.time}
        name={item.name}
        isLiked={commentState.isLiked}
        isDisliked={commentState.isDisliked}
        onLikePress={() => toggleCommentState(item.id, 'isLiked')}
        onDislikePress={() => toggleCommentState(item.id, 'isDisliked')}
        likeCount={commentState.likeCount}
        dislikeCount={commentState.dislikeCount}
      />
    );
  };

  const renderTileItem = (tile: (typeof TILES_DATA)[0], idx: number) => {
    const key = `${tile.source}-${idx}`;
    const tileState = tileStates[key] || { isLiked: false, isSaved: false };

    return (
      <View key={key}>
        <CustomTile
          {...tile}
          isLiked={tileState.isLiked}
          isSaved={tileState.isSaved}
          onImagePress={() => console.log('Image pressed')}
          onCommentPress={() => console.log('Comment')}
          onLikePress={() => toggleTileState(key, 'isLiked')}
          onSavePress={() => toggleTileState(key, 'isSaved')}
          onFacebookPress={() => console.log('Facebook')}
          onWhatsappPress={() => console.log('WhatsApp')}
          onXPress={() => console.log('X')}
          onYoutubePress={() => console.log('YT')}
        />
        {idx < TILES_DATA.length - 1 && <View style={styles.divider} />}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <CustomText fontFamily="Gilroy-Bold">Add Comments</CustomText>
          <CustomText fontFamily="Gilroy-Bold" color="#007BFF">
            50 Comments
          </CustomText>
        </View>

        <View style={styles.addComment}>
          <View style={styles.avatar}>
            <CustomText style={styles.avatarText}>{'BS'}</CustomText>
          </View>
          <TextInput
            placeholder="Add a comment..."
            style={styles.commentInput}
          />
        </View>

        <FlatList
          data={COMMENTS_DATA}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.card}>
          <CustomText fontFamily="Gilroy-Bold">Most Read</CustomText>
          {TILES_DATA.map(renderTileItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
  },
  addComment: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 18,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#434A54',
    width: 52,
    height: 52,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 5,
    borderColor: '#94A3B8',
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  commentInput: {
    fontFamily: 'Gilroy-Medium',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#8F8F8F66',
    marginVertical: 20,
  },
});

export default ArticleScreen;
