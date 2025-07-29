import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ViewStyle,
} from 'react-native';
import {
  CommentLogo,
  FBLogo,
  LikeFilledLogo,
  LikeLogo,
  SaveFilledLogo,
  SaveLogo,
  WhatsappLogo,
  XLogo,
  YoutubeLogo,
} from '../assets';
import CustomText from './CustomText';
// import { FontAwesome, MaterialCommunityIcons, Feather, AntDesign, Entypo } from '@expo/vector-icons';

interface CustomTileProps {
  imageUrl: string;
  source: string;
  title: string;
  date: string;
  onCommentPress: () => void;
  onLikePress: () => void;
  onFacebookPress: () => void;
  onWhatsappPress: () => void;
  onSavePress: () => void;
  onXPress: () => void;
  onYoutubePress: () => void;
  onImagePress: () => void;
  isLiked: boolean;
  isSaved: boolean;
  style?: ViewStyle;
}

const CustomTile: React.FC<CustomTileProps> = ({
  imageUrl,
  source,
  title,
  date,
  onCommentPress,
  onLikePress,
  onFacebookPress,
  onWhatsappPress,
  onSavePress,
  onXPress,
  onYoutubePress,
  onImagePress,
  isLiked,
  isSaved,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={onImagePress}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </Pressable>
      <View style={styles.infoContainer}>
        <CustomText style={styles.source}>
          Source: <Text style={{ color: '#0F62FE' }}>{source}</Text>
        </CustomText>
        <CustomText style={styles.title} fontFamily="Gilroy-Bold">
          {title}
        </CustomText>
        <CustomText style={styles.date}>Date: {date}</CustomText>
        <View style={styles.iconsContainer}>
          <Pressable onPress={onCommentPress}>
            <CommentLogo />
          </Pressable>
          <Pressable onPress={onLikePress}>
            {isLiked ? <LikeFilledLogo /> : <LikeLogo />}
          </Pressable>
          <Pressable onPress={onSavePress}>
            {isSaved ? <SaveFilledLogo /> : <SaveLogo />}
          </Pressable>
          <Pressable onPress={onXPress}>
            <XLogo />
          </Pressable>
          <Pressable onPress={onFacebookPress}>
            <FBLogo />
          </Pressable>
          <Pressable onPress={onWhatsappPress}>
            <WhatsappLogo />
          </Pressable>
          <Pressable onPress={onYoutubePress}>
            <YoutubeLogo />
          </Pressable>
        </View>
        <Text style={styles.shareLabel}>Share the news</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    aspectRatio: 1,
    width: 100,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'flex-end',
  },
  source: {
    fontSize: 12,
    color: '#0F62FE',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 4,
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 6,
  },
  shareLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
});

export default CustomTile;
