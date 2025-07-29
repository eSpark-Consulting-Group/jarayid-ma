import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { HeaderLogo, ProfileHead, SettingsGear } from '../assets';
import { Header } from '../components';
import { RootStackParamList } from '../types/navigationParams';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
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
          name="Home"
          component={HomeScreen}
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
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
