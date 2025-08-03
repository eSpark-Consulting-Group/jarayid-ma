import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import LogoAuth from '../assets/images/LogoAuth.png';
import LogoAuthDark from '../assets/images/LogoAuthDark.png';
import { RootStackNavigationProp } from '../navigation/navigation';
import { CustomText } from '../components';
import { HeaderLogo } from '../assets';
import { login } from '../services/authService';
import { setUser } from '../redux/slices/authSlice';
import useTheme from '../theme/useTheme';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const theme = useTheme();

  const navigation = useNavigation<RootStackNavigationProp<'Login'>>();
  const [email, setEmail] = useState('muhammadahsanty@gmail.com');
  const [password, setPassword] = useState('String1234$');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const dispatch = useDispatch();
  const handleEmailChange = (text: string) => {
    setEmail(text);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (text && text.includes('@')) {
        delete newErrors.email;
      }
      return newErrors;
    });
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (text) {
        delete newErrors.password;
      }
      return newErrors;
    });
  };

  const handleLogin = async () => {
    setErrors({});

    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Can't be empty";
    } else if (!email.includes('@')) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Please check again';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await login({
        email: email,
        password: password,
        loginType: 'local',
      });

      if (res?.status == 'success') {
        console.log('res', res);
        dispatch(setUser(res.data));
        await AsyncStorage.setItem('accessToken', res?.data?.token);
        await AsyncStorage.setItem(
          'userDetails',
          JSON.stringify(res?.data?.user),
        );
        navigation.replace('Home');
        setLoading(false);
      } else {
        setLoading(false);
        console.error('Login failed:', res.message);
      }
    } catch (err) {
      setLoading(false);

      console.error('Login error:', err);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.logo}>
            <Image
              source={theme.dark ? LogoAuthDark : LogoAuth}
              style={styles.logo}
            />
          </View>
          <View
            style={[
              styles.formContainer,
              {
                elevation: theme.dark ? 0 : 5,
                borderWidth: theme.dark ? 1 : 0,
                borderColor: '#494949ff',
                backgroundColor: theme.colors.background,
              },
            ]}
          >
            <CustomText fontFamily="Gilroy-Bold" style={styles.title}>
              Login
            </CustomText>
            <CustomText
              fontFamily="Gilroy-Regular"
              color={theme.dark ? '#999' : '#666'}
              style={styles.subtitle}
            >
              Add your details below to get back into the app
            </CustomText>
            <CustomInput
              label="Email address"
              iconName="email"
              placeholder="e.g. alex@email.com"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              hasError={!!errors.email}
            />
            <CustomInput
              label="Password"
              iconName="lock"
              placeholder="Enter your password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
              error={errors.password}
              hasError={!!errors.password}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasswordEmail')}
              style={styles.forgotPasswordContainer}
            >
              <CustomText style={styles.forgotPasswordText}>
                Forgot password?
              </CustomText>
            </TouchableOpacity>
            <CustomButton
              title="Login"
              onPress={handleLogin}
              loading={loading}
            />
            <View style={styles.linkContainer}>
              <CustomText
                style={styles.linkText}
                color={theme.dark ? '#999' : '#666'}
              >
                Don't have an account?{' '}
              </CustomText>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <CustomText style={styles.link}>Create account</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  formContainer: {
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    // backgroundColor: '#FFF',
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    // color: ,
    marginBottom: 32,
    lineHeight: 22,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {
    fontSize: 14,
  },
  link: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  logo: { marginBottom: 40, alignSelf: 'center', height: 70, width: 210 },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  forgotPasswordText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LoginScreen;
