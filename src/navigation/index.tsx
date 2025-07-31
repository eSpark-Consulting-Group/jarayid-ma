import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MenuProvider } from 'react-native-popup-menu';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordEmail from '../screens/ForgotPasswordEmail';
import SelectLanguageScreen from '../screens/SelectLanguage';
import HomeScreen from '../screens/HomeScreen';
import CustomTabBar from '../components/CustomTabBar';
import NotificationScreen from '../screens/NotificationScreen';
import SearchScreen from '../screens/SearchScreen';
import ArticleScreen from '../screens/ArticleScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { HomeStackParamList, RootStackParamList } from './navigation';

import {
  BackIcon,
  HeaderLogo,
  ProfileHead,
  RedirectSign,
  SettingsGear,
} from '../assets';
import { Header } from '../components';
import NotificationSettings from '../screens/NotificationSettings';
import EditNewSource from '../screens/EditNewSource';
import { SafeAreaView } from 'react-native';
import FAQScreen from '../screens/FAQScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TermOfUse from '../screens/TermOfUse';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import ReadLaterScreen from '../screens/ReadLaterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="Home"
    >
      <Tab.Screen
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              LeftIcon={<SettingsGear />}
              RightIcon={<ProfileHead />}
              MainLogo={<HeaderLogo />}
              onLeftPress={() => navigation.navigate('Home')}
              onRightPress={() => console.log('Profile')}
              isProfileMenu
            />
          ),
        })}
        name="Notification"
        component={NotificationScreen}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              LeftIcon={<BackIcon />}
              MainLogo={<HeaderLogo />}
              onLeftPress={() =>
                navigation?.canGoBack?.() && navigation.goBack()
              }
            />
          ),
        })}
        name="Search"
        component={SearchScreen}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              LeftIcon={<BackIcon />}
              RightIcon={<Ionicon name="share-outline" size={25} />}
              MainLogo={<HeaderLogo />}
              onLeftPress={() =>
                navigation?.canGoBack?.() && navigation.goBack()
              }
              onRightPress={() => console.log('Profile')}
            />
          ),
        })}
        name="SubscriptionScreen"
        component={SubscriptionScreen}
      />

      <Tab.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              LeftIcon={<SettingsGear />}
              RightIcon={<ProfileHead />}
              MainLogo={<HeaderLogo />}
              onLeftPress={() => console.log('Settings')}
              onRightPress={() => console.log('Profile')}
              isProfileMenu
            />
          ),
        })}
      />

      <Tab.Screen
        name="EditNewSource"
        component={EditNewSource}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              LeftIcon={<SettingsGear />}
              RightIcon={<ProfileHead />}
              MainLogo={<HeaderLogo />}
              onLeftPress={() => console.log('Settings')}
              onRightPress={() => console.log('Profile')}
              isProfileMenu
            />
          ),
        })}
      />
      
      <Tab.Screen
        name="FAQScreen"
        component={FAQScreen}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              LeftIcon={<SettingsGear />}
              RightIcon={<ProfileHead />}
              MainLogo={<HeaderLogo />}
              onLeftPress={() => console.log('Settings')}
              onRightPress={() => console.log('Profile')}
              isProfileMenu
            />
          ),
        })}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              LeftIcon={<SettingsGear />}
              RightIcon={<ProfileHead />}
              MainLogo={<HeaderLogo />}
              onLeftPress={() => console.log('Settings')}
              onRightPress={() => console.log('Profile')}
              isProfileMenu
            />
          ),
        })}
      />
      <Tab.Screen
        name="TermOfUse"
        component={TermOfUse}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              LeftIcon={<SettingsGear />}
              RightIcon={<ProfileHead />}
              MainLogo={<HeaderLogo />}
              onLeftPress={() => console.log('Settings')}
              onRightPress={() => console.log('Profile')}
              isProfileMenu
            />
          ),
        })}
      />
      <Tab.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              LeftIcon={<SettingsGear />}
              RightIcon={<ProfileHead />}
              MainLogo={<HeaderLogo />}
              onLeftPress={() => console.log('Settings')}
              onRightPress={() => console.log('Profile')}
              isProfileMenu
            />
          ),
        })}
      />
     
      <Tab.Screen
        name="ReadLaterScreen"
        component={ReadLaterScreen}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              LeftIcon={<SettingsGear />}
              RightIcon={<ProfileHead />}
              MainLogo={<HeaderLogo />}
              onLeftPress={() => console.log('Settings')}
              onRightPress={() => console.log('Profile')}
              isProfileMenu
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              LeftIcon={<SettingsGear />}
              RightIcon={<ProfileHead />}
              MainLogo={<HeaderLogo />}
              onLeftPress={() => console.log('open menu 1')}
              onRightPress={() => console.log('open menu 2')}
              isProfileMenu
            />
          ),
        })}
      />
      <HomeStack.Screen
        name="Article"
        component={ArticleScreen}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              LeftIcon={<BackIcon />}
              RightIcon={<RedirectSign />}
              MainLogo={<HeaderLogo />}
              onLeftPress={() => console.log('open menu 1')}
              onRightPress={() => console.log('open menu 2')}
            />
          ),
        })}
      />

    </HomeStack.Navigator>
  );
};

export default function App() {
  return (
    <MenuProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="ForgotPasswordEmail"
              component={ForgotPasswordEmail}
            />
            <Stack.Screen
              name="SelectLanguage"
              component={SelectLanguageScreen}
            />

            <Stack.Screen name="Home" component={MainTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </MenuProvider>
  );
}
