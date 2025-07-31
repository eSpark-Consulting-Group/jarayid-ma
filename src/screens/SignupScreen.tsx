import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import GoogleButton from '../components/GoogleButton';
import LogoAuth from '../assets/images/LogoAuth.png';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigation/navigation';
import { CustomText } from '../components';
import useTheme from '../theme/useTheme';

interface SignupScreenProps {}

const SignupScreen: React.FC<SignupScreenProps> = ({}) => {
  const navigation = useNavigation<RootStackNavigationProp<'Signup'>>();
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleSignup = async () => {
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
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleGoogleSignup = () => {
    // Handle Google signup
    console.log('Google signup pressed');
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View>
              <Image source={LogoAuth} style={styles.logo} />
            </View>
            <View style={styles.formContainer}>
              <CustomText fontFamily="Gilroy-Bold" style={styles.title}>
                Create account
              </CustomText>
              <CustomText fontFamily="Gilroy-Regular" style={styles.subtitle}>
                Let's get you started sharing your links!
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
              <CustomText style={styles.passwordNote}>
                Password must contain at least 8 characters
              </CustomText>
              <CustomButton
                title="Create new account"
                onPress={handleSignup}
                loading={loading}
              />
              <GoogleButton onPress={handleGoogleSignup} />
              <View style={styles.linkContainer}>
                <CustomText style={styles.linkText}>
                  Already have an account?{' '}
                </CustomText>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <CustomText style={styles.link}>Login</CustomText>
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
    elevation: 5,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    lineHeight: 22,
  },
  passwordNote: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
    // textAlign: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {
    fontSize: 14,
    color: '#666',
  },
  link: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  logo: { marginBottom: 40, alignSelf: 'center', height: 70, width: 210 },
});

export default SignupScreen;
