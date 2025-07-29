import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import CustomCard from '../components/CustomCard';
import CustomTile from '../components/CustomTile';
interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomCard>
        <Text>This is inside the custom gray card.</Text>
      </CustomCard>
      <CustomTile
        imageUrl="https://example.com/image.jpg"
        source="CNN"
        title="SCCI finalizes preparations"
        date="02-08-20"
        onCommentPress={() => console.log('Comment')}
        onLikePress={() => console.log('Like')}
        onFacebookPress={() => console.log('Facebook')}
        onWhatsappPress={() => console.log('WhatsApp')}
        onSavePress={() => console.log('Save')}
        onXPress={() => console.log('X')}
        onYoutubePress={() => console.log('YT')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
