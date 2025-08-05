import React from 'react';
import { View, Image, StyleSheet, Linking } from 'react-native';
import CustomText from './CustomText';
import ButtonGradient from './ButtonGradient';
import useTheme from '../theme/useTheme';

interface ArticleCardProps {
  sourceIcon: string;
  time: string;
  image: any;
  title: string;
  summary: string;
  notice: string;
  articleLink: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  sourceIcon,
  time,
  image,
  title,
  summary,
  notice,
  articleLink,
}) => {
  const theme = useTheme();
  const openLink = React.useCallback(() => {
    Linking.openURL(articleLink).catch(err =>
      console.error('Failed to open URL:', err),
    );
  }, [articleLink]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        {/* {sourceIcon} */}
        <Image
          source={{ uri: sourceIcon }}
          style={{ width: 66, height: 44 }}
          resizeMode="contain"
        />
        <CustomText size={12} color="#6B7280" style={styles.time}>
          {time}
        </CustomText>
      </View>

      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />

      <CustomText size={19} fontFamily="Mondia-ExtraBold" style={styles.title}>
        {title}
      </CustomText>

      <CustomText
        size={15}
        color={theme.dark ? '#d9d9d9' : '#4B5563'}
        style={styles.summary}
      >
        {summary}
      </CustomText>

      <CustomText size={13} fontFamily="Gilroy-Bold" style={styles.notice}>
        {notice}
      </CustomText>

      <ButtonGradient
        title="View Original Article"
        onPress={openLink}
        gradientStyle={styles.viewButton}
        size={13}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 19,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
    width: '88%',
  },
  time: {
    marginLeft: 'auto',
  },
  image: {
    width: '88%',
    height: 180,
    marginBottom: 12,
  },
  title: {
    marginBottom: 6,
    textAlign: 'center',
  },
  summary: {
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 20,
  },
  notice: {
    textAlign: 'center',
    marginBottom: 12,
  },
  viewButton: {
    borderRadius: 6,
    height: 40,
    width: 145,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ArticleCard;
