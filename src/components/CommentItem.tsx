import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import {
  DislikeFilled,
  DislikeLogo,
  LikeFilledLogo,
  LikeLogo,
} from '../assets';
import useTheme from '../theme/useTheme';

interface CommentItemProps {
  initials: string;
  name: string;
  message: string;
  time: string;
  isLiked: boolean;
  onLikePress: () => void;
  isDisliked: boolean;
  onDislikePress: () => void;
  likeCount?: number;
  dislikeCount?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({
  initials,
  name,
  message,
  time,
  isLiked,
  isDisliked,
  onLikePress,
  onDislikePress,
  likeCount = 65,
  dislikeCount = 35,
}) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      {/* Top Row: Avatar + Message */}
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <CustomText style={styles.avatarText}>{initials}</CustomText>
        </View>
        <View style={styles.messageBlock}>
          <View style={styles.nameRow}>
            <CustomText
              fontFamily="Gilroy-SemiBold"
              color={theme.dark ? 'white' : '#383535'}
              style={[styles.message]}
            >
              @{name}
            </CustomText>
            <CustomText style={styles.time}>{time}</CustomText>
          </View>
          <CustomText
            fontFamily="Gilroy-Medium"
            style={styles.message}
            color={theme.dark ? 'white' : '#383535'}
          >
            {message}
          </CustomText>
        </View>
      </View>

      {/* Like/Dislike Row */}
      <View style={styles.actionRow}>
        <View style={styles.actionGroup}>
          <Pressable onPress={onLikePress}>
            {isLiked ? <LikeFilledLogo /> : <LikeLogo />}
          </Pressable>
          <CustomText style={styles.countText}>{likeCount}</CustomText>
        </View>
        <View style={styles.actionGroup}>
          <Pressable onPress={onDislikePress}>
            {isDisliked ? <DislikeFilled /> : <DislikeLogo />}
          </Pressable>
          <CustomText style={styles.countText}>{dislikeCount}</CustomText>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
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
  messageBlock: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    // color: '#383535',
  },
  time: {
    color: '#9DA3B4',
    fontSize: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  countText: {
    width: 20,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: 12,
  },
});

export default CommentItem;
