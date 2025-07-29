import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import GoogleButton from '../components/GoogleButton';
import Logo from '../assets/images/Logo.png';

interface SignupScreenProps {
  navigation: any;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string; confirmPassword?: string}>({});

  const handleSignup = async () => {
    // Reset errors
    setErrors({});
    
    // Validation
    const newErrors: {email?: string; password?: string; confirmPassword?: string} = {};
    
    if (!email) {
      newErrors.email = "Can't be empty";
    } else if (!email.includes('@')) {
      newErrors.email = "Invalid email format";
    }
    
    if (!password) {
      newErrors.password = "At least 8 characters";
    } else if (password.length < 8) {
      newErrors.password = "At least 8 characters";
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "At least 8 characters";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Handle signup success/failure
    }, 2000);
  };

  const handleGoogleSignup = () => {
    // Handle Google signup
    console.log('Google signup pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.logo}>
            <Image source={Logo} />
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Let's get you started sharing your links!</Text>
            
            <CustomInput
              label="Email address"
              iconName="email"
              placeholder="e.g. alex@email.com"
              value={email}
              onChangeText={setEmail}
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
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
              hasError={!!errors.password}
            />
            
            <CustomInput
              label="Confirm password"
              iconName="lock"
              placeholder="At least 8 characters"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              error={errors.confirmPassword}
              hasError={!!errors.confirmPassword}
            />
            
            <Text style={styles.passwordNote}>
              Password must contain at least 8 characters
            </Text>
            
            <CustomButton
              title="Create new account"
              onPress={handleSignup}
              loading={loading}
            />
            
            <GoogleButton onPress={handleGoogleSignup} />
            
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Login</Text>
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
    flex: 1,
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
    textAlign: 'center',
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
  logo: {marginBottom: 40, alignSelf: 'center'}
});

export default SignupScreen;