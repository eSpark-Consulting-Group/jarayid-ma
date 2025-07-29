import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';

import {
  CategoryCard,
  CategoryCardList,
  CustomCard,
  CustomText,
  CustomTile,
  NewsCard,
  NewsCardList,
} from '../components';
import { PlayBtn } from '../assets';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };
  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <CustomCard>
        <CustomText fontFamily="Inter_24pt-Regular">
          This is inside the custom gray card.
        </CustomText>
      </CustomCard> */}

      <CustomCard style={{ marginTop: 10 }}>
        <CustomTile
          onImagePress={() => console.log('navigate')}
          imageUrl="https://res.cloudinary.com/drnkzxfzu/image/upload/v1753779966/main-sample.png"
          source="CNN"
          title="SCCI finalizes preparations"
          date="02-08-20"
          onCommentPress={() => console.log('Comment')}
          onLikePress={handleLikeToggle}
          onSavePress={handleSaveToggle}
          onFacebookPress={() => console.log('Facebook')}
          onWhatsappPress={() => console.log('WhatsApp')}
          onXPress={() => console.log('X')}
          onYoutubePress={() => console.log('YT')}
          isLiked={isLiked}
          isSaved={isSaved}
        />
      </CustomCard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
});

export default HomeScreen;
