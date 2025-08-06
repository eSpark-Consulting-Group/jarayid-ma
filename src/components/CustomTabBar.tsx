import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  HomeIcon,
  NotificationIcon,
  SearchIcon,
  SearchTabIcon,
} from '../assets';
import CustomText from './CustomText';
import useTheme from '../theme/useTheme';
import { useTranslation } from 'react-i18next';

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const getTabConfig = (routeName: string) => {
    switch (routeName) {
      case 'Notification':
        return {
          iconName: 'notifications',
          label: t('tabBar.notifications'),
        };
      case 'Home':
        return {
          iconName: 'home',
          label: t('tabBar.home'),
        };
      case 'Search':
        return {
          iconName: 'chat',
          label: t('tabBar.search'),
        };
      default:
        return {
          iconName: 'help-outline',
          label: routeName,
        };
    }
  };

  const renderIcon = (iconName: string, isFocused: boolean) => {
    // #484C52
    if (iconName === 'home') {
      return <HomeIcon height={28} width={28} />;
    }
    if (iconName === 'notifications') {
      return (
        <NotificationIcon
          height={24}
          width={24}
          color={isFocused ? '#005BBC' : theme.dark ? '#b6b3b3ff' : '#484C52'}
        />
      );
    }
    if (iconName === 'chat') {
      return (
        <SearchTabIcon
          height={24}
          width={24}
          color={isFocused ? '#005BBC' : theme.dark ? '#b6b3b3ff' : '#484C52'}
        />
      );
    }
    return (
      <Icon
        name={iconName}
        size={24}
        color={isFocused ? '#005BBC' : theme.dark ? '#b6b3b3ff' : '#555555'}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.dark ? '#000000ff' : '#EDEDED' },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        if (!['Notification', 'Home', 'Search'].includes(route.name))
          return null;
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const { iconName, label } = getTabConfig(route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const isCenter = route.name === 'Home';

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={[styles.tabButton, isCenter && styles.centerTabButton]}
            activeOpacity={0.8}
          >
            <View
              style={
                isCenter
                  ? {
                      ...styles.centerIconWrapper,
                      backgroundColor:
                        isFocused ||
                        !['Notification', 'Search'].includes(route.name)
                          ? '#005BBC'
                          : '#484C52',
                    }
                  : styles.defaultIconWrapper
              }
            >
              {renderIcon(iconName, isFocused)}
            </View>
            {!isCenter && (
              <CustomText
                fontFamily="Poppins-Medium"
                style={[
                  styles.label,
                  {
                    color: isFocused
                      ? '#005BBC'
                      : theme.dark
                      ? '#b6b3b3ff'
                      : '#555555',
                  },
                ]}
                size={12}
              >
                {label}
              </CustomText>
            )}
            {isCenter && (
              <CustomText
                fontFamily="Poppins-Medium"
                style={[
                  styles.centerLabel,
                  { color: theme.dark ? '#b6b3b3ff' : '#222' },
                ]}
                size={12}
              >
                {label}
              </CustomText>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // backgroundColor: '#EDEDED',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    // height: Platform.OS === 'ios' ? 80 : 70,
    paddingTop: 15,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  defaultIconWrapper: {
    marginBottom: 2,
  },
  centerTabButton: {
    // marginBottom: 10,
  },
  centerIconWrapper: {
    backgroundColor: '#005BBC',
    width: 50,
    height: 50,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
  label: {
    fontWeight: '500',
  },
  activeLabel: {
    color: '#005BBC',
  },
  inactiveLabel: {
    color: '#555555',
  },
  centerLabel: {
    fontWeight: '500',
    marginTop: 4,
  },
});

export default CustomTabBar;
