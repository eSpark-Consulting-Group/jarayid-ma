import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { BackIcon, HeaderLogo, ProfileHead, SettingsGear } from '../assets';
import { Header } from '../components';

const Stack = createNativeStackNavigator();

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
          options={{
            headerShown: true,
            header: () => (
              <Header
                LeftIcon={<SettingsGear width={24} height={24} />}
                RightIcon={<ProfileHead width={24} height={24} />}
                MainLogo={<HeaderLogo />}
                onLeftPress={() => console.log('Back')}
                onRightPress={() => console.log('Profile')}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
