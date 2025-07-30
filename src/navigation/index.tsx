import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordEmail from '../screens/ForgotPasswordEmail';
import SelectLanguageScreen from '../screens/SelectLanguage';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CustomTabBar from '../components/CustomTabBar';
import NotificationScreen from '../screens/NotificationScreen';
import SearchScreen from '../screens/SearchScreen';

import { BackIcon, HeaderLogo, ProfileHead, SettingsGear } from '../assets';
import { Header } from '../components';
import { RootStackParamList } from '../types/navigationParams';
import { SafeAreaView } from 'react-native';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import Ionicon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              LeftIcon={<SettingsGear />}
              RightIcon={<ProfileHead />}
              MainLogo={<HeaderLogo />}
              onLeftPress={() => navigation.navigate('Settings')}
              onRightPress={() => console.log('Profile')}
            />
          ),
        })}
        name="Notification"
        component={NotificationScreen}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              LeftIcon={<SettingsGear />}
              RightIcon={<ProfileHead />}
              MainLogo={<HeaderLogo />}
              onLeftPress={() => navigation.navigate('Settings')}
              onRightPress={() => console.log('Profile')}
            />
          ),
        })}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              LeftIcon={<BackIcon />}
              MainLogo={<HeaderLogo />}
              onLeftPress={() => navigation?.canGoBack?.() && navigation.goBack()}
              onRightPress={() => console.log('Profile')}
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
    </Tab.Navigator>
  );
}

export default function App() {
  return (
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

          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Home" component={MainTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
