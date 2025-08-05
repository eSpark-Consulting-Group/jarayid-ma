import React, { JSX } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  Language,
} from '../assets'; // make sure to import all your vector icons
import { CountryCategories } from '.';

import LogoutConfirmationModal from './LogoutConfirmationModal';
import { MainTabNavigationProp } from '../navigation/navigation';
import ExperienceRatingModal from './ExperienceRatingModal';
import FontSizeModal from './FontSizeModal';
import SocialShareModal from './SocialShareModal';
import SocialMediaModal from './SocialMediaModal';
import { logout } from '../redux/slices/authSlice';
import useTheme from '../theme/useTheme';
import HeaderText from './HeaderText';
import { useTranslation } from 'react-i18next';

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
  const theme = useTheme();
  const [showFontSizer, setShowFontSizer] = React.useState(false);
  const [showSocialModal, setShowSocialModal] = React.useState(false);
  const [showSocialMedia, setShowSocialMedia] = React.useState(false);
  const { t, i18n } = useTranslation();

  const MenuData = [
    {
      label: t('header.menu.editProfile'),
      icon: <Vector0 />,
      onPress: () => navigation.navigate('ProfileScreen'),
    },
    {
      label: t('header.menu.editNewSource'),
      icon: <Vector2 />,
      onPress: () => navigation.navigate('EditNewSource'),
    },
    {
      label: t('header.menu.readLater'),
      icon: <Vector3 />,
      onPress: () => navigation.navigate('ReadLaterScreen'),
    },
    {
      label: t('header.menu.editNotification'),
      icon: <Vector4 />,
      onPress: () => navigation.navigate('NotificationSettings'),
    },
    {
      label: t('header.menu.socialAccounts'),
      icon: <Vector5 />,
      onPress: () => setTimeout(() => setShowSocialMedia(true), 500),
    },
    {
      label: t('header.menu.advertiseHere'),
      icon: <Vector6 />,
      onPress: () => navigation.navigate('AdvertiseHere'),
    },
    {
      label: t('header.menu.rateApp'),
      icon: <Vector7 />,
      onPress: () => setTimeout(() => setShowRate(true), 500),
    },
    {
      label: t('header.menu.subscribe'),
      icon: <Vector8 />,
      onPress: () => navigation.navigate('SubscriptionScreen'),
    },
    {
      label: t('header.menu.shareApp'),
      icon: <Vector9 />,
      onPress: () => setTimeout(() => setShowSocialModal(true), 500),
    },
    {
      label: t(theme.dark ? 'header.menu.lightMode' : 'header.menu.darkMode'),
      icon: <Vector10 />,
      // onPress: () => i18n.changeLanguage('en'),
      onPress: theme.toggleTheme,
    },
    {
      label: t('header.menu.fontSize'),
      icon: <Vector11 />,
      onPress: () => setShowFontSizer(true),
    },
    {
      label: t('header.menu.selectLang'),
      icon: <Language />,
      onPress: () => navigation.navigate('SelectLanguage'),
    },
    {
      label: t('header.menu.faqs'),
      icon: <Vector12 />,
      onPress: () => navigation.navigate('FAQScreen'),
    },
    {
      label: t('header.menu.termsOfUse'),
      icon: <Vector13 />,
      onPress: () => navigation.navigate('TermOfUse'),
    },
    {
      label: t('header.menu.privacyPolicy'),
      icon: <Vector14 />,
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      label: t('header.menu.contactUs'),
      icon: <Vector15 />,
      onPress: () => navigation.navigate('ContactUs'),
    },
    {
      label: t('header.menu.logout'),
      icon: <Vector16 />,
      onPress: () => setTimeout(() => setShowLogout(true), 500),
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
        <View
          style={[
            styles.menuItem,
            { backgroundColor: theme.navigationTheme.colors.background },
          ]}
        >
          {item.icon}
          <HeaderText theme={theme.navigationTheme}>{item.label}</HeaderText>
        </View>
      </MenuOption>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
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
                  padding: 15,
                  backgroundColor: theme.navigationTheme.colors.background,
                },
                optionsWrapper: {
                  maxHeight: '100%',
                  backgroundColor: theme.navigationTheme.colors.background,
                },
              }}
            >
              <CountryCategories theme={theme.navigationTheme} />
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
                  padding: 15,
                  backgroundColor: theme.navigationTheme.colors.background,
                },
                optionsWrapper: {
                  maxHeight: '100%',
                  backgroundColor: theme.navigationTheme.colors.background,
                },
              }}
            >
              <HeaderText
                size={20}
                fontFamily="Gilroy-ExtraBold"
                style={styles.menuTitle}
                color="#004A99"
                theme={theme.navigationTheme}
              >
                {t('header.otherSettings')}
              </HeaderText>

              <FlatList
                data={MenuData}
                keyExtractor={(item, index) => `${item.label}-${index}`}
                ItemSeparatorComponent={() => <Divider color="#8F8F8F" />}
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
        theme={theme.navigationTheme}
      />

      <ExperienceRatingModal
        visible={showRate}
        onClose={() => setShowRate(false)}
        onSelect={() => {
          setShowRate(false);
          // Add your rating submission logic here
        }}
        theme={theme.navigationTheme}
      />

      <FontSizeModal
        visible={showFontSizer}
        onCancel={() => setShowFontSizer(false)}
        onChange={() => {
          setShowFontSizer(false);
        }}
        theme={theme.navigationTheme}
      />
      <SocialShareModal
        visible={showSocialModal}
        onClose={() => setShowSocialModal(false)}
        onShare={() => {
          setShowSocialModal(false);
          // Add your share logic here
        }}
        theme={theme.navigationTheme}
      />

      <SocialMediaModal
        visible={showSocialMedia}
        onClose={() => setShowSocialMedia(false)}
        onShare={() => {
          setShowSocialMedia(false);
          // Add your social media logic here
        }}
        theme={theme.navigationTheme}
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
