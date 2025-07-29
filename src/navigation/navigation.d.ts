import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPasswordEmail: undefined;
  SelectLanguage: undefined;
};

export type RootStackNavigationProp<
  T extends keyof RootStackParamList = 'Home',
> = NativeStackNavigationProp<RootStackParamList, T>;

export type RootStackRouteProp<T extends keyof RootStackParamList = 'Home'> =
  RouteProp<RootStackParamList, T>;
