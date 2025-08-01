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
  Share,
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
      <Pressable onPress={onImagePress} style={{ width: '35%' }}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </Pressable>
      <View style={styles.infoContainer}>
        <CustomText style={styles.title} size={16} fontFamily="Gilroy-Bold">
          {title}
        </CustomText>
        <View style={styles.contentContainer}>
          <View>
            <CustomText style={styles.source}>
              Source:{' '}
              <CustomText
                color="#0F62FE"
                text={source}
                style={{ width: 100, flex: 1 }}
              />
            </CustomText>
            <CustomText color="#6B7280" size={12} text={`Date: ${date}`} />
          </View>
          <View style={styles.iconsContainer}>
            <Pressable onPress={onCommentPress}>
              <CommentLogo width={26} height={26} />
            </Pressable>
            <Pressable onPress={onSavePress}>
              {isSaved ? (
                <SaveFilledLogo width={26} height={26} />
              ) : (
                <SaveLogo width={26} height={26} />
              )}
            </Pressable>
            <Pressable onPress={onCommentPress}>
              <Share width={26} height={26} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 80,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  source: {
    fontSize: 12,
    color: '#0F62FE',
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    color: '#6B7280',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  shareLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
});

export default CustomTile;
