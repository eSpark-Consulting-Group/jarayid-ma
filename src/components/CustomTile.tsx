import React from 'react';
import { View, Image, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { CommentLogo, SaveFilledLogo, SaveLogo, Share } from '../assets';
import CustomText from './CustomText';
import useTheme from '../theme/useTheme';

interface CustomTileProps {
  image: string;
  source: string;
  title: string;
  publishedAt: string;
  onCommentPress: () => void;
  onSavePress: () => void;
  onImagePress: () => void;
  isSaved: boolean;
  style?: ViewStyle;
}

const CustomTile: React.FC<CustomTileProps> = ({
  image,
  source,
  title,
  publishedAt,
  onCommentPress,
  onSavePress,
  onImagePress,
  isSaved,
  style,
}) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
        style,
      ]}
    >
      <Pressable onPress={onImagePress} style={{ width: '35%' }}>
        <Image
          source={{
            uri: image,
          }}
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
            <CustomText style={styles.source} size={12}>
              Source:{' '}
              <CustomText
                color="#0F62FE"
                text={source}
                style={{ width: 100, flex: 1 }}
              />
            </CustomText>
            <CustomText
              color="#6B7280"
              size={12}
              text={`Date: ${publishedAt?.slice(0, 10)}`}
            />
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
    // backgroundColor: '#FFFFFF',
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
});

export default CustomTile;
