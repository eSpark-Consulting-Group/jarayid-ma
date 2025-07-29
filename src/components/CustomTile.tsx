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
  LikeLogo,
  SaveLogo,
  WhatsappLogo,
  XLogo,
  YoutubeLogo,
} from '../assets';
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
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.source}>
          Source: <Text style={{ color: '#0F62FE' }}>{source}</Text>
        </Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>Date: {date}</Text>
        <View style={styles.iconsContainer}>
          <Pressable onPress={onCommentPress}>
            <CommentLogo />
          </Pressable>
          <Pressable onPress={onLikePress}>
            <LikeLogo />
          </Pressable>
          <Pressable onPress={onSavePress}>
            <SaveLogo />
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
    backgroundColor: '#F3F4F6', // light gray
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
    width: 100,
    height: 70,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  source: {
    fontSize: 12,
    color: '#6B7280',
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
    marginTop: 6,
    gap: 10,
  },
  shareLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
});

export default CustomTile;
