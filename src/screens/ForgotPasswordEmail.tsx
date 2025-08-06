import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

import { RootStackNavigationProp } from '../navigation/navigation';
import { CustomText } from '../components';
import useTheme from '../theme/useTheme';
import { HeaderLogo, HeaderLogoDark } from '../assets';
import { forgotPassword } from '../services/authService';
import { useTranslation } from 'react-i18next';

interface ForgotPasswordEmailProps {}

const ForgotPasswordEmail: React.FC<ForgotPasswordEmailProps> = ({}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const navigation =
    useNavigation<RootStackNavigationProp<'ForgotPasswordEmail'>>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    forgot?: string;
  }>({});

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

  const handleForgot = async () => {
    setErrors({});

    const newErrors: { email?: string } = {};

    if (!email) {
      newErrors.email = t('screens.forgotPassword.errors.emptyEmail');
    } else if (!email.includes('@')) {
      newErrors.email = t('screens.forgotPassword.errors.invalidEmail');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await forgotPassword({ email });
      console.log('nkdnskdnsds', response);

      if (response?.status?.toLowerCase() === 'success') {
        navigation.navigate('Login');
      } else {
        setErrors(prev => ({
          ...prev,
          email:
            response.message ||
            t('screens.forgotPassword.errors.somethingWrong'),
        }));
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        t('screens.forgotPassword.errors.generic');
      setErrors(prev => ({ ...prev, email: message }));
    } finally {
      setLoading(false);
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
              {t('screens.forgotPassword.title')}
            </CustomText>
            <CustomText
              fontFamily="Gilroy-Regular"
              color={theme.dark ? '#999' : '#666'}
              style={styles.subtitle}
              size={16}
            >
              {t('screens.forgotPassword.subtitle')}
            </CustomText>

            <CustomInput
              label={t('screens.forgotPassword.emailLabel')}
              iconName="email"
              placeholder={t('screens.forgotPassword.emailPlaceholder')}
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              hasError={!!errors.email}
            />

            <CustomButton
              title={t('screens.forgotPassword.button')}
              onPress={handleForgot}
              loading={loading}
            />

            <View style={styles.linkContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <CustomText
                  style={styles.linkText}
                  color={theme.dark ? '#999' : '#666'}
                >
                  {t('screens.forgotPassword.tryAnotherWay')}
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
    backgroundColor: '#FFF',
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

export default ForgotPasswordEmail;
