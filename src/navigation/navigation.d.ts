import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Article } from '../types';

// Stack Navigation Types
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPasswordEmail: undefined;
  SelectLanguage: undefined;
  NotificationSettings: undefined;
  EditNewSource: undefined;
};

export type RootStackNavigationProp<
  T extends keyof RootStackParamList = 'Home',
> = NativeStackNavigationProp<RootStackParamList, T>;

export type RootStackRouteProp<T extends keyof RootStackParamList = 'Home'> =
  RouteProp<RootStackParamList, T>;

// Main Tab Navigation Types
export type MainTabParamList = {
  HomeTab: undefined;
  NotificationTab: undefined;
  ChatbotTab: undefined;
  SubscriptionScreen: undefined;
  NotificationSettings: undefined;
  EditNewSource: undefined;
  FAQScreen: undefined;
  ProfileScreen: undefined;
  TermOfUse: undefined;
  PrivacyPolicy: undefined;
  ReadLaterScreen: undefined;
  AdvertiseHere: undefined;
  ContactUs: undefined;
};

export type MainTabNavigationProp<
  T extends keyof MainTabParamList = 'HomeTab',
> = BottomTabNavigationProp<MainTabParamList, T>;

export type MainTabRouteProp<T extends keyof MainTabParamList = 'HomeTab'> =
  RouteProp<MainTabParamList, T>;

// HomeStackParamList
export type HomeStackParamList = {
  Home: undefined;
  Article: { article: Article };
};

// Navigation prop
export type HomeStackNavigationProp<
  T extends keyof HomeStackParamList = 'Home',
> = NativeStackNavigationProp<HomeStackParamList, T>;

// Navigation prop
export type HomeStackRouteProp<T extends keyof HomeStackParamList = 'Home'> =
  RouteProp<HomeStackParamList, T>;
