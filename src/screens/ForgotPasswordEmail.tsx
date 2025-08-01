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
import LogoAuth from '../assets/images/LogoAuth.png';
import LogoAuthDark from '../assets/images/LogoAuthDark.png';

import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigation/navigation';
import { CustomText } from '../components';
import useTheme from '../theme/useTheme';
import { Image } from 'react-native';

interface ForgotPasswordEmailProps {}

const ForgotPasswordEmail: React.FC<ForgotPasswordEmailProps> = ({}) => {
  const theme = useTheme();

  const navigation =
    useNavigation<RootStackNavigationProp<'ForgotPasswordEmail'>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
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

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (text.length >= 8) {
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

  const handleForgot = async () => {
    if (!codeSent) {
      setCodeSent(true);
    } else {
      navigation.navigate('SelectLanguage');
    }
    return;

    setErrors({});

    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!email) {
      newErrors.email = "Can't be empty";
    } else if (!email.includes('@')) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'At least 8 characters';
    } else if (password.length < 8) {
      newErrors.password = 'At least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'At least 8 characters';
    } else if (password !== confirmPassword) {
      newErrors;

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 2000);
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
          <View>
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
              },
            ]}
          >
            <CustomText fontFamily="Gilroy-Bold" style={styles.title}>
              Forgot Password
            </CustomText>
            <CustomText
              fontFamily="Gilroy-Regular"
              color={theme.dark ? '#999' : '#666'}
              style={styles.subtitle}
            >
              Let’s get you started sharing your links!
            </CustomText>

            {!codeSent ? (
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
            ) : (
              <>
                <CustomInput
                  label="Create password"
                  iconName="lock"
                  placeholder="At least 8 characters"
                  value={password}
                  onChangeText={handlePasswordChange}
                  secureTextEntry
                  error={errors.password}
                  hasError={!!errors.password}
                />
                <CustomInput
                  label="Confirm password"
                  iconName="lock"
                  placeholder="At least 8 characters"
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  secureTextEntry
                  error={errors.confirmPassword}
                  hasError={!!errors.confirmPassword}
                />
              </>
            )}

            <CustomButton
              title={!codeSent ? 'Send Code' : 'Save'}
              onPress={handleForgot}
              loading={loading}
            />

            {!codeSent && (
              <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <CustomText
                    style={styles.linkText}
                    color={theme.dark ? '#999' : '#666'}
                  >
                    Try Another way?
                  </CustomText>
                </TouchableOpacity>
              </View>
            )}
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
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
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

export default ForgotPasswordEmail;
