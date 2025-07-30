import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
} from 'react-native';

import {
  CategoryCardList,
  CustomCard,
  CustomTab,
  Divider,
  CustomTile,
  NewsCardList,
  Header,
  CustomText,
} from '../components';
import { TABS_COUNTRIES, TABS_CATEGORIES, TILES_DATA } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigationProp } from '../navigation/navigation';
import { SettingsGear, ProfileHead, HeaderLogo } from '../assets';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import {
  Vector0,
  Vector1,
  Vector2,
  Vector3,
  Vector4,
  Vector5,
  Vector6,
  Vector7,
  Vector8,
  Vector9,
  Vector10,
  Vector11,
  Vector12,
  Vector13,
  Vector14,
  Vector15,
  Vector16,
} from '../assets'; // make sure to import all your vector icons

const MenuData = [
  { label: 'Edit Profile', icon: <Vector0 /> },
  { label: 'Setting', icon: <Vector1 /> },
  { label: 'Edit New Source', icon: <Vector2 /> },
  { label: 'Read Late', icon: <Vector3 /> },
  { label: 'Edit Notification', icon: <Vector4 /> },
  { label: 'Jarayid Social Media Accounts', icon: <Vector5 /> },
  { label: 'Advertise here', icon: <Vector6 /> },
  { label: 'Rate Jarayid.com', icon: <Vector7 /> },
  { label: 'Subscription Jarayid Plus', icon: <Vector8 /> },
  { label: 'Share The App', icon: <Vector9 /> },
  { label: 'Dark Mode', icon: <Vector10 /> },
  { label: 'Font Size', icon: <Vector11 /> },
  { label: 'FAQs', icon: <Vector12 /> },
  { label: 'Terms of Use', icon: <Vector13 /> },
  { label: 'Privacy Policy', icon: <Vector14 /> },
  { label: 'Contact Us', icon: <Vector15 /> },
  { label: 'Logout', icon: <Vector16 /> },
];

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation<HomeStackNavigationProp<'Home'>>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          LeftIcon={<SettingsGear />}
          RightIcon={
            <Menu style={{}}>
              <MenuTrigger>{<ProfileHead />}</MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: {
                    width: '75%',
                    maxHeight: '80%', // scrollable height
                    // paddingVertical: 8,
                    marginTop: 32,
                    borderRadius: 20,
                  },
                  optionsWrapper: {
                    maxHeight: '100%', // scrollable height
                  },
                }}
              >
                <CustomText
                  size={20}
                  fontFamily="Gilroy-ExtraBold"
                  style={{ textAlign: 'center', paddingVertical: 10 }}
                  color="#004A99"
                >
                  Other Settings
                </CustomText>
                <FlatList
                  data={MenuData}
                  keyExtractor={(item, index) => `${item.label}-${index}`}
                  renderItem={({ item }) => (
                    <MenuOption onSelect={() => console.log(item.label)}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                        }}
                      >
                        {item.icon}
                        <CustomText>{item.label}</CustomText>
                      </View>
                      <Divider color="#8F8F8F" />
                    </MenuOption>
                  )}
                  showsVerticalScrollIndicator={false}
                />
              </MenuOptions>
            </Menu>
          }
          MainLogo={<HeaderLogo />}
          onLeftPress={() => console.log('open menu 1')}
          onRightPress={() => console.log('open menu 2')}
        />
      ),
    });
  }, [navigation]);

  const [tileStates, setTileStates] = useState<
    Record<string, { isLiked: boolean; isSaved: boolean }>
  >({});

  const toggleTileState = useCallback(
    (key: string, field: 'isLiked' | 'isSaved') => {
      setTileStates(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          [field]: !prev[key]?.[field],
        },
      }));
    },
    [],
  );

  const handleTabPress = useCallback((value: string) => {
    console.log('Selected:', value);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center' }}>
          <CustomTab data={TABS_COUNTRIES} onTabPress={handleTabPress} />
          <Divider />
          <CustomTab data={TABS_CATEGORIES} onTabPress={handleTabPress} round />
        </View>
        <NewsCardList />
        <CategoryCardList />
        <View style={styles.card}>
          <View>
            {TILES_DATA.map((tile, idx) => {
              const key = `${tile.source}-${idx}`;
              const tileState = tileStates[key] || {
                isLiked: false,
                isSaved: false,
              };
              return (
                <View key={key}>
                  <CustomTile
                    {...tile}
                    isLiked={tileState.isLiked}
                    isSaved={tileState.isSaved}
                    onImagePress={() => navigation.navigate('Article')}
                    onCommentPress={() => console.log('Comment')}
                    onLikePress={() => toggleTileState(key, 'isLiked')}
                    onSavePress={() => toggleTileState(key, 'isSaved')}
                    onFacebookPress={() => console.log('Facebook')}
                    onWhatsappPress={() => console.log('WhatsApp')}
                    onXPress={() => console.log('X')}
                    onYoutubePress={() => console.log('YT')}
                  />
                  {idx == TILES_DATA.length - 1 ? null : (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: '#8F8F8F66',
                        marginVertical: 20,
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
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
  scrollContent: {
    // paddingTop: 20,
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
  },
});

export default HomeScreen;
