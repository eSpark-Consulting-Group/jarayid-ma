import React, { JSX } from 'react';
import { navigate, navigationRef } from '../navigation/RootNavigation';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import { useNavigation, useTheme } from '@react-navigation/native';

import CustomText from './CustomText'; // or wherever it's located
import Divider from './Divider'; // import your divider
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
import { CountryCategories } from '.';

import LogoutConfirmationModal from './LogoutConfirmationModal';
import { useDispatch } from 'react-redux';
import { MainTabNavigationProp } from '../navigation/navigation';
import ExperienceRatingModal from './ExperienceRatingModal';
import { useThemeContext } from '../context/ThemeContext';
import FontSizeModal from './FontSizeModal';
import SocialShareModal from './SocialShareModal';
import SocialMediaModal from './SocialMediaModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../redux/slices/authSlice';

interface HeaderProps {
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  MainLogo: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  isProfileMenu?: boolean;
  isCountryCates?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  LeftIcon,
  RightIcon,
  MainLogo,
  onLeftPress,
  onRightPress,
  isProfileMenu,
  isCountryCates,
}) => {
  const navigation = useNavigation<MainTabNavigationProp<'HomeTab'>>();
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = React.useState(false);
  const [showRate, setShowRate] = React.useState(false);
  const { colors } = useTheme();
  const { toggleTheme, isDark } = useThemeContext();
  const [showFontSizer, setShowFontSizer] = React.useState(false);
  const [showSocialModal, setShowSocialModal] = React.useState(false);
  const [showSocialMedia, setShowSocialMedia] = React.useState(false);

  const MenuData = [
    {
      label: 'Edit Profile',
      icon: <Vector0 />,
      onPress: () => navigation.navigate('ProfileScreen'),
    },
    // { label: 'Setting', icon: <Vector1 /> },
    {
      label: 'Edit New Source',
      icon: <Vector2 />,
      onPress: () => navigation.navigate('EditNewSource'),
    },
    {
      label: 'Read Later',
      icon: <Vector3 />,
      onPress: () => navigation.navigate('ReadLaterScreen'),
    },
    {
      label: 'Edit Notification',
      icon: <Vector4 />,
      onPress: () => navigation.navigate('NotificationSettings'),
    },
    {
      label: 'Jarayid Social Media Accounts',
      icon: <Vector5 />,
      onPress: () => {
        setTimeout(() => {
          setShowSocialMedia(true);
        }, 500);
      },
    },
    {
      label: 'Advertise here',
      icon: <Vector6 />,
      onPress: () => navigation.navigate('AdvertiseHere'),
    },
    {
      label: 'Rate Jarayid.com',
      icon: <Vector7 />,
      onPress: () => {
        setTimeout(() => {
          setShowRate(true);
        }, 500);
      },
    },
    {
      label: 'Subscription Jarayid Plus',
      icon: <Vector8 />,
      onPress: () => navigation.navigate('SubscriptionScreen'),
    },
    {
      label: 'Share The App',
      icon: <Vector9 />,
      onPress: () => {
        setTimeout(() => {
          setShowSocialModal(true);
        }, 500);
      },
    },
    {
      label: isDark ? 'Light Mode' : 'Dark Mode',
      icon: <Vector10 />,
      onPress: toggleTheme,
    },
    {
      label: 'Font Size',
      icon: <Vector11 />,
      onPress: () => setShowFontSizer(true),
    },
    {
      label: 'FAQs',
      icon: <Vector12 />,
      onPress: () => navigation.navigate('FAQScreen'),
    },
    {
      label: 'Terms of Use',
      icon: <Vector13 />,
      onPress: () => navigation.navigate('TermOfUse'),
    },
    {
      label: 'Privacy Policy',
      icon: <Vector14 />,
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      label: 'Contact Us',
      icon: <Vector15 />,
      onPress: () => navigation.navigate('ContactUs'),
    },
    {
      label: 'Logout',
      icon: <Vector16 />,
      onPress: () => {
        setTimeout(() => {
          setShowLogout(true);
        }, 500);
      },
    },
  ];

  const renderMenuOption = ({
    item,
  }: {
    item: { label: string; icon: JSX.Element; onPress?: () => void };
  }) => {
    return (
      <MenuOption
        onSelect={() => {
          item?.onPress?.();
        }}
      >
        <View style={styles.menuItem}>
          {item.icon}
          <CustomText>{item.label}</CustomText>
        </View>
        <Divider color="#8F8F8F" />
      </MenuOption>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {/* {LeftIcon ? (
          <TouchableOpacity onPress={onLeftPress}>{LeftIcon}</TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )} */}
        {isCountryCates && LeftIcon ? (
          <Menu>
            <MenuTrigger>{LeftIcon}</MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  width: '75%',
                  maxHeight: '80%',
                  marginTop: 32,
                  borderRadius: 20,
                  padding: 20,
                },
                optionsWrapper: {
                  maxHeight: '100%',
                },
              }}
            >
              <CountryCategories />
            </MenuOptions>
          </Menu>
        ) : LeftIcon ? (
          <TouchableOpacity onPress={onLeftPress}>{LeftIcon}</TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      <View style={styles.center}>{MainLogo}</View>

      <View style={styles.side}>
        {isProfileMenu && RightIcon ? (
          <Menu>
            <MenuTrigger>{RightIcon}</MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  width: '75%',
                  maxHeight: '80%',
                  marginTop: 32,
                  borderRadius: 20,
                  paddingHorizontal: 10,
                },
                optionsWrapper: {
                  maxHeight: '100%',
                },
              }}
            >
              <CustomText
                size={20}
                fontFamily="Gilroy-ExtraBold"
                style={styles.menuTitle}
                color="#004A99"
              >
                Other Settings
              </CustomText>
              <FlatList
                data={MenuData}
                keyExtractor={(item, index) => `${item.label}-${index}`}
                renderItem={renderMenuOption}
                showsVerticalScrollIndicator={false}
              />
            </MenuOptions>
          </Menu>
        ) : RightIcon ? (
          <TouchableOpacity onPress={onRightPress}>
            {RightIcon}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      <LogoutConfirmationModal
        visible={showLogout}
        onCancel={() => setShowLogout(false)}
        onConfirm={async () => {
          setShowLogout(false);
          await AsyncStorage.removeItem('accessToken');
          dispatch(logout());
          setShowLogout(false);
        }}
      />

      <ExperienceRatingModal
        visible={showRate}
        onClose={() => setShowRate(false)}
        onSelect={() => {
          setShowRate(false);
          // Add your rating submission logic here
        }}
      />

      <FontSizeModal
        visible={showFontSizer}
        onCancel={() => setShowFontSizer(false)}
        onChange={() => {
          setShowFontSizer(false);
        }}
      />
      <SocialShareModal
        visible={showSocialModal}
        onClose={() => setShowSocialModal(false)}
        onShare={() => {
          setShowSocialModal(false);
          // Add your share logic here
        }}
      />

      <SocialMediaModal
        visible={showSocialMedia}
        onClose={() => setShowSocialMedia(false)}
        onShare={() => {
          setShowSocialMedia(false);
          // Add your social media logic here
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  side: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  placeholder: {
    width: 24,
    height: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuTitle: {
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default Header;
