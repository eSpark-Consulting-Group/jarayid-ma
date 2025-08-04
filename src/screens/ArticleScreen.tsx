import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { CustomTile, CustomText } from '../components';
import { TILES_DATA, COMMENTS_DATA, DUMMY_ARTICLE } from '../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import CommentItem from '../components/CommentItem';
import ArticleCard from '../components/ArticleCard';
import AdBanner from '../components/AdBanner';
import useTheme from '../theme/useTheme';
import { HomeStackRouteProp } from '../navigation/navigation';
import { extractFields, getInitials, timeAgo, timeWithAmPm } from '../utils';
import { Article, Comment } from '../types';
import { commentArticle, getArticles } from '../services/articleService';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Send } from '../assets';

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
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<HomeStackRouteProp<'Article'>>();
  const articleData = route.params?.article || DUMMY_ARTICLE;

  const { user } = useSelector((state: RootState) => state.auth);

  const [tileStates, setTileStates] = useState<Record<string, TileState>>({});
  const [articles, setArticles] = useState<Article[]>([]);

  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async (reset = false) => {
    try {
      const data = await getArticles({
        page: 1,
        limit: 2,
      });
      const newItems = data.items || [];
      setArticles(newItems);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const sendComment = async () => {
    try {
      const data = await commentArticle({
        articleId: articleData.id,
        content: comment,
      });
      setComment('');
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const toggleTileState = useCallback((key: string, field: keyof TileState) => {
    setTileStates(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: !prev[key]?.[field],
      },
    }));
  }, []);

  const renderCommentItem = ({ item }: { item: Comment }) => {
    return (
      <CommentItem
        key={item.id}
        avatar={item.user.image}
        message={item.content}
        time={timeAgo(item.createdAt)}
        name={item.user.name}
      />
    );
  };

  const renderTileItem = (tile: Article, idx: number) => {
    const key = `${tile.source}-${idx}`;
    const tileState = tileStates[key] || { isLiked: false, isSaved: false };

    return (
      <View key={key}>
        <CustomTile
          {...tile}
          isSaved={tileState.isSaved}
          onImagePress={() => console.log('Image pressed')}
          onCommentPress={() => console.log('Comment')}
          onSavePress={() => toggleTileState(key, 'isSaved')}
        />
        {idx < TILES_DATA.length - 1 && (
          <View
            style={[
              styles.divider,
              {
                backgroundColor: theme.dark ? 'grey' : '#E5E7EB',
              },
            ]}
          />
        )}
      </View>
    );
  };
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AdBanner
          image={require('../assets/images/ad-banner.png')} // or { uri: 'https://example.com/banner.png' }
          link="https://your-ad-landing-page.com"
        />
        <ArticleCard
          sourceIcon={articleData.rssFeed.logo} // Your SVG Component
          // sourceIcon={<BBCSvg />} // Your SVG Component
          time={timeWithAmPm(articleData.publishedAt)}
          image={articleData.image} // or use a remote URI
          title={
            extractFields(
              articleData.originalContent.scrapedContent.translatedContent
                .englishContent,
            ).title
          }
          summary={
            articleData.summaryEnglish ??
            "Carlos Alcaraz said he had 'no expectations' coming into the grass-court season but he installed himself as a clear favourite to retain his Wimbledon title after beating Jiri Lehecka to win the HSBC Championships."
          }
          notice="Notice: This is an AI-Generated Summary and may be sometimes inaccurate"
          articleLink={articleData.url}
        />
        <AdBanner
          image={require('../assets/images/ad-banner.png')} // or { uri: 'https://example.com/banner.png' }
          link="https://your-ad-landing-page.com"
        />
        <View style={styles.header}>
          <CustomText fontFamily="Gilroy-Bold">Add Comments</CustomText>
          <CustomText fontFamily="Gilroy-Bold" color="#007BFF">
            {articleData.comments.length == 1
              ? articleData.comments.length + ' ' + 'Comment'
              : articleData.comments.length + ' ' + 'Comments'}
          </CustomText>
        </View>

        <View style={styles.addComment}>
          <View style={styles.avatar}>
            <CustomText style={styles.avatarText}>
              {getInitials(user?.name || 'John Doe')}
            </CustomText>
          </View>
          <TextInput
            placeholder="Add a comment..."
            placeholderTextColor={theme.dark ? 'grey' : '#00000064'}
            onChangeText={e => setComment(e)}
            style={[
              styles.commentInput,
              {
                borderColor: theme.dark ? 'grey' : '#E5E7EB',
                color: theme.colors.text,
              },
            ]}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            disabled={comment ? false : true}
            style={[
              styles.sendBtn,
              { backgroundColor: comment ? '#005BBC' : '#aaa' },
            ]}
            onPress={sendComment}
          >
            <Send color={'#fff'} width={30} height={30} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={articleData.comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />

        {articles.length > 0 ? (
          <View style={styles.card}>
            <CustomText fontFamily="Gilroy-Bold">Most Read</CustomText>
            {articles.map(renderTileItem)}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
  },
  addComment: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 10,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#434A54',
    width: 52,
    height: 52,
    borderRadius: 26,
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
  sendBtn: {
    padding: 4,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
    top: 10,
  },
  commentInput: {
    fontFamily: 'Gilroy-Medium',
    borderBottomWidth: 1,
    // borderColor: '#E5E7EB',
    flex: 1,
  },
  divider: {
    height: 1,
    marginVertical: 20,
  },
});

export default ArticleScreen;
