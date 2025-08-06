import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import GoogleButton from '../components/GoogleButton';
import { RootStackNavigationProp } from '../navigation/navigation';
import { CustomText } from '../components';
import { HeaderLogo, HeaderLogoDark } from '../assets';
import { signup } from '../services/authService';
import { setUser } from '../redux/slices/authSlice';
import useTheme from '../theme/useTheme';
import { showToast } from '../utils/showToast';
import { useTranslation } from 'react-i18next';

interface SignupScreenProps {}

const SignupScreen: React.FC<SignupScreenProps> = ({}) => {
  const navigation = useNavigation<RootStackNavigationProp<'Signup'>>();
  const [name, setName] = useState('');
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleNameChange = (text: string) => {
    setName(text);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (text) {
        delete newErrors.name;
      }
      return newErrors;
    });
  };

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
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
      if (passwordRegex.test(text)) {
        delete newErrors.password;
      }
      return newErrors;
    });
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (text.length >= 8 && text === password) {
        delete newErrors.confirmPassword;
      }
      return newErrors;
    });
  };

  const handleSignup = async () => {
    setErrors({});

    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name) {
      newErrors.name = t('screens.signup.errors.emptyName');
    }

    if (!email) {
      newErrors.email = t('screens.signup.errors.emptyEmail');
    } else if (!email.includes('@')) {
      newErrors.email = t('screens.signup.errors.invalidEmail');
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!password) {
      newErrors.password = t('screens.signup.errors.emptyPassword');
    } else if (!passwordRegex.test(password)) {
      newErrors.password = t('screens.signup.errors.invalidPassword');
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = t(
        'screens.signup.errors.emptyConfirmPassword',
      );
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t('screens.signup.errors.passwordsDontMatch');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await signup({
        name,
        email,
        password,
        loginType: 'local',
      });

      console.log('res', res);

      if (res?.status == 'success') {
        dispatch(setUser(res.data));
        await AsyncStorage.setItem('accessToken', res?.data?.token);
        navigation.replace('SelectLanguage');
        setLoading(false);
        showToast(t('screens.signup.toasts.success'), 'success');
      } else {
        setLoading(false);
        showToast(res?.message || t('screens.signup.toasts.fail'), 'error');
      }
    } catch (error) {
      setLoading(false);
      showToast(t('screens.signup.toasts.fail'), 'error');
      console.error('Signup error:', error);
    }
  };

  const handleGoogleSignup = () => {
    // Handle Google signup
    console.log('Google signup pressed');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
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
              <CustomText
                fontFamily="Gilroy-Bold"
                size={28}
                style={styles.title}
              >
                {t('screens.signup.title')}
              </CustomText>
              <CustomText
                fontFamily="Gilroy-Regular"
                color={theme.dark ? '#999' : '#666'}
                style={styles.subtitle}
                size={16}
              >
                {t('screens.signup.subtitle')}
              </CustomText>
              <CustomInput
                label={t('screens.signup.nameLabel')}
                iconName="badge"
                placeholder={t('screens.signup.namePlaceholder')}
                value={name}
                onChangeText={handleNameChange}
                keyboardType="name-phone-pad"
                autoCapitalize="none"
                error={errors.name}
                hasError={!!errors.name}
              />
              <CustomInput
                label={t('screens.signup.emailLabel')}
                iconName="email"
                placeholder={t('screens.signup.emailPlaceholder')}
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
                hasError={!!errors.email}
              />
              <CustomInput
                label={t('screens.signup.passwordLabel')}
                iconName="lock"
                placeholder={t('screens.signup.passwordPlaceholder')}
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
                error={errors.password}
                hasError={!!errors.password}
              />
              <CustomInput
                label={t('screens.signup.confirmPasswordLabel')}
                iconName="lock"
                placeholder={t('screens.signup.confirmPasswordPlaceholder')}
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                secureTextEntry
                error={errors.confirmPassword}
                hasError={!!errors.confirmPassword}
              />
              <CustomText
                style={styles.passwordNote}
                size={12}
                color={theme.dark ? '#999' : '#666'}
              >
                {t('screens.signup.passwordNote')}
              </CustomText>
              <CustomButton
                title={t('screens.signup.createAccountButton')}
                onPress={handleSignup}
                loading={loading}
              />
              <GoogleButton onPress={handleGoogleSignup} />
              {/* need to handle position change due to language */}
              <View style={styles.linkContainer}>
                <CustomText size={14} color={theme.dark ? '#999' : '#666'}>
                  {t('screens.signup.alreadyHaveAccount')}
                </CustomText>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <CustomText size={14} style={styles.link}>
                    {t('screens.signup.loginLink')}
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
    borderRadius: 8,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 32,
    lineHeight: 22,
  },
  passwordNote: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  link: {
    color: '#4A90E2',
    fontWeight: '500',
  },
  logo: { marginBottom: 40, alignSelf: 'center' },
});

export default SignupScreen;
