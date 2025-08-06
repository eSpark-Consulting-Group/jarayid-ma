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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = t('screens.contactUs.nameRequired');
    if (!businessName.trim())
      newErrors.businessName = t('screens.contactUs.businessNameRequired');
    if (!contactNumber.trim() && contactNumber?.length < 5)
      newErrors.contactNumber = t('screens.contactUs.phoneRequired');
    if (!email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = t('screens.contactUs.emailRequired');
    if (!country.trim())
      newErrors.country = t('screens.contactUs.countryRequired');
    if (!message.trim() && message?.length < 10)
      newErrors.message = t('screens.contactUs.messageRequired');

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
      showToast(
        error?.message ?? 'An error occurred while sending your message.',
        'error',
      );
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
          <ScreenTitle title={t('screens.contactUs.title')} />

          <CustomInput
            label={t('screens.contactUs.name')}
            placeholder={t('screens.contactUs.namePlaceholder')}
            value={name}
            onChangeText={setName}
            keyboardType="default"
            autoCapitalize="words"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
            error={errors.name}
          />
          <CustomInput
            label={t('screens.contactUs.businessName')}
            placeholder={t('screens.contactUs.businessNamePlaceholder')}
            value={businessName}
            onChangeText={setBusinessName}
            keyboardType="default"
            autoCapitalize="words"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
            error={errors.businessName}
          />
          <CustomInput
            label={t('screens.contactUs.phone')}
            placeholder={t('screens.contactUs.phonePlaceholder')}
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
            autoCapitalize="none"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
            error={errors.contactNumber}
          />
          <CustomInput
            label={t('screens.contactUs.email')}
            placeholder={t('screens.contactUs.emailPlaceholder')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
            error={errors.email}
          />
          <CustomInput
            label={t('screens.contactUs.country')}
            placeholder={t('screens.contactUs.countryPlaceholder')}
            value={country}
            onChangeText={setCountry}
            keyboardType="default"
            autoCapitalize="words"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
            error={errors.country}
          />
          <CustomInput
            label={t('screens.contactUs.message')}
            placeholder={t('screens.contactUs.messagePlaceholder')}
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
              title={t('screens.contactUs.buttonText')}
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
