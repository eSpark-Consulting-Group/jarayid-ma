import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { CustomInput, ScreenTitle } from '../components';
import ButtonGradient from '../components/ButtonGradient';
import useTheme from '../theme/useTheme';
import { contactUs } from '../services/contactusService';
import { showToast } from '../utils/showToast';

const ContactUsScreen: React.FC = () => {
  const theme = useTheme();

  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!contactNumber.trim() && contactNumber?.length < 5) newErrors.contactNumber = 'Contact number must be at least 5 characters long';
    if (!email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Email is invalid';
    if (!country.trim()) newErrors.country = 'Country is required';
    if (!message.trim() && message?.length < 10) newErrors.message = 'Message must be at least 10 characters long';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const payload = {
        name,
        business_name: businessName,
        contact_number: contactNumber,
        contact_email: email,
        country,
        message,
      };

      const result = await contactUs(payload);
      if (result.status === 'success') {
        showToast('Message sent successfully!', 'success');
        setName('');
        setBusinessName('');
        setContactNumber('');
        setEmail('');
        setMessage('');
        setCountry('');
        setErrors({});
      } else {
        showToast('Failed to contact. Please try again later.', 'error');
      }
    } catch (error: any) {
      showToast(error?.message ?? 'An error occurred while sending your message.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}>
          <ScreenTitle title="Contact Us" />

          <CustomInput
            label="Name"
            placeholder="Enter your Name"
            value={name}
            onChangeText={setName}
            keyboardType="default"
            autoCapitalize="words"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
            error={errors.name}
          />
          <CustomInput
            label="Business Name"
            placeholder="Enter your Business Name"
            value={businessName}
            onChangeText={setBusinessName}
            keyboardType="default"
            autoCapitalize="words"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
            error={errors.businessName}
          />
          <CustomInput
            label="Contact"
            placeholder="Enter your Contact"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
            autoCapitalize="none"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
            error={errors.contactNumber}
          />
          <CustomInput
            label="Email"
            placeholder="Enter your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
            error={errors.email}
          />
          <CustomInput
            label="Country"
            placeholder="Enter your Country Name"
            value={country}
            onChangeText={setCountry}
            keyboardType="default"
            autoCapitalize="words"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
            error={errors.country}
          />
          <CustomInput
            label="Message"
            placeholder="Enter your Message Here"
            value={message}
            onChangeText={setMessage}
            keyboardType="default"
            multiline
            autoCapitalize="sentences"
            style={{ height: 150, width: '100%' }}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
            error={errors.message}
          />

          {loading ? (
            <ActivityIndicator
              size="large"
              color={theme.colors.primary}
              style={{ marginTop: 20 }}
            />
          ) : (
            <ButtonGradient
              title="Submit"
              style={styles.buttonStyle}
              gradientStyle={styles.gradientStyle}
              onPress={handleSubmit}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    paddingBottom: 60,
  },
  innerContainer: {
    paddingHorizontal: 20,
    width: '100%',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 10,
  },
  buttonStyle: {
    alignSelf: 'flex-end',
  },
  gradientStyle: {
    width: 138,
    height: 50,
    marginTop: 20,
    borderRadius: 6,
  },
});

export default ContactUsScreen;