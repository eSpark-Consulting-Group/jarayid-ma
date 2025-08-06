import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { RootStackNavigationProp } from '../navigation/navigation';
import { CustomText } from '../components';
import { HeaderLogo, HeaderLogoDark } from '../assets';
import { login } from '../services/authService';
import { setUser } from '../redux/slices/authSlice';
import useTheme from '../theme/useTheme';
import { showToast } from '../utils/showToast';
import { useTranslation } from 'react-i18next';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const theme = useTheme();
  const { t } = useTranslation();

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
      newErrors.email = t('screens.login.errors.emptyEmail');
    } else if (!email.includes('@')) {
      newErrors.email = t('screens.login.errors.invalidEmail');
    }

    if (!password) {
      newErrors.password = t('screens.login.errors.emptyPassword');
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
      console.log('res', res);

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
        showToast(t('screens.login.toasts.success'), 'success');
      } else {
        setLoading(false);
        console.error('Login failed:', res?.message);
        showToast(res?.message || t('screens.login.toasts.fail'), 'error');
      }
    } catch (err) {
      setLoading(false);
      console.log('Login error:', err);
      showToast(t('screens.login.toasts.fail'), 'error');
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
          {theme.dark ? (
            <HeaderLogoDark width={210} height={70} style={styles.logo} />
          ) : (
            <HeaderLogo width={210} height={70} style={styles.logo} />
          )}
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
            <CustomText fontFamily="Gilroy-Bold" size={28} style={styles.title}>
              {t('screens.login.title')}
            </CustomText>
            <CustomText
              fontFamily="Gilroy-Regular"
              color={theme.dark ? '#999' : '#666'}
              style={styles.subtitle}
              size={16}
            >
              {t('screens.login.subtitle')}
            </CustomText>
            <CustomInput
              label={t('screens.login.emailLabel')}
              iconName="email"
              placeholder={t('screens.login.emailPlaceholder')}
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              hasError={!!errors.email}
            />
            <CustomInput
              label={t('screens.login.passwordLabel')}
              iconName="lock"
              placeholder={t('screens.login.passwordPlaceholder')}
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
                {t('screens.login.forgotPassword')}
              </CustomText>
            </TouchableOpacity>
            <CustomButton
              title={t('screens.login.buttonText')}
              onPress={handleLogin}
              loading={loading}
            />
            {/* need to handle position change */}
            <View style={styles.linkContainer}>
              <CustomText
                style={styles.linkText}
                color={theme.dark ? '#999' : '#666'}
              >
                {t('screens.login.noAccount')}
              </CustomText>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <CustomText style={styles.link}>
                  {t('screens.login.signupLink')}
                </CustomText>
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
    marginBottom: 8,
  },
  subtitle: {
    // color: ,
    marginBottom: 32,
    lineHeight: 22,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {},
  link: {
    color: '#4A90E2',
    fontWeight: '500',
  },
  logo: { marginBottom: 40, alignSelf: 'center' },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  forgotPasswordText: {
    color: '#4A90E2',
    fontWeight: '500',
  },
});

export default LoginScreen;
