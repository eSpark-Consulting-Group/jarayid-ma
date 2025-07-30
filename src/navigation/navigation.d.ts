import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Stack Navigation Types
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPasswordEmail: undefined;
  SelectLanguage: undefined;
  Settings: undefined;
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
};

export type MainTabNavigationProp<
  T extends keyof MainTabParamList = 'HomeTab',
> = BottomTabNavigationProp<MainTabParamList, T>;

export type MainTabRouteProp<T extends keyof MainTabParamList = 'HomeTab'> =
  RouteProp<MainTabParamList, T>;

// HomeStackParamList
export type HomeStackParamList = {
  Home: undefined;
  Article: undefined;
};

// Navigation prop
export type HomeStackNavigationProp<
  T extends keyof HomeStackParamList = 'Home',
> = NativeStackNavigationProp<HomeStackParamList, T>;
