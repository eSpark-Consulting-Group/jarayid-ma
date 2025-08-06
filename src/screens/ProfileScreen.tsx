import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { setUser } from '../redux/slices/authSlice';
import {
  editUserProfileData,
  getUserProfileData,
} from '../services/profileService';
import { CustomInput } from '../components';
import ButtonGradient from '../components/ButtonGradient';
import { showToast } from '../utils/showToast';
import { useTranslation } from 'react-i18next';

const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [country, setCountry] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    country?: string;
    number?: string;
  }>({});
  const { t } = useTranslation();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const result = await getUserProfileData();
    console.log('Profile updated successfully:', result.data.user);
    if (result.success && result?.data?.user) {
      dispatch(setUser(result.data.user));
      setName(result.data.user.name || '');
      setEmail(result.data.user.email || '');
      setNumber(result.data.user.phoneNumber || '');
      setCountry(result.data.user.country || '');
      setImage(result.data.user.image || null);
    } else {
      console.error('Failed to fetch user profile:', result.error);
    }
  };

  const handleEditProfile = async () => {
    // Validation for required fields
    const newErrors: { name?: string; country?: string; number?: string } = {};
    if (!name) newErrors.name = t('screens.editProfile.nameRequired');
    if (!country) newErrors.country = t('screens.editProfile.countryRequired');
    // if (!number) newErrors.number = "Mobile Number can't be empty";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);
    const result = await editUserProfileData({
      name,
      email,
      phoneNumber: number,
      country,
      image,
    });
    setLoading(false);

    if (result.success && result.data) {
      showToast(t('screens.editProfile.toastSuccess'), 'success');
      console.log('Profile updated successfully.');
    } else {
      showToast(
        result?.error?.message || t('screens.editProfile.toastFailure'),
        'error',
      );
      console.log('Failed to update profile screen:', result);
    }
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        setImage(response.assets[0]);
      }
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={styles.profileImage}
              source={
                image?.uri
                  ? { uri: image.uri }
                  : typeof image === 'string'
                  ? { uri: image }
                  : { uri: 'https://picsum.photos/200/200.jpg' }
              }
            />
          </TouchableOpacity>

          <CustomInput
            label={t('screens.editProfile.name')}
            placeholder={t('screens.editProfile.namePlaceholder')}
            onChangeText={text => {
              setName(text);
              if (errors.name && text)
                setErrors(prev => ({ ...prev, name: undefined }));
            }}
            value={name}
            keyboardType="default"
            autoCapitalize="words"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#F5F6FA'}
            error={errors.name}
            hasError={!!errors.name}
          />

          <CustomInput
            label={t('screens.editProfile.email')}
            placeholder={t('screens.editProfile.emailPlaceholder')}
            onChangeText={text => setEmail(text)}
            value={email}
            editable={false}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#F5F6FA'}
          />

          <CustomInput
            label={t('screens.editProfile.phone')}
            placeholder={t('screens.editProfile.phonePlaceholder')}
            onChangeText={text => {
              setNumber(text);
              if (errors.number && text)
                setErrors(prev => ({ ...prev, number: undefined }));
            }}
            value={number}
            editable={false}
            keyboardType="phone-pad"
            autoCapitalize="none"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#F5F6FA'}
            // error={errors.number}
            // hasError={!!errors.number}
          />

          <CustomInput
            label={t('screens.editProfile.country')}
            placeholder={t('screens.editProfile.countryPlaceholder')}
            onChangeText={text => {
              setCountry(text);
              if (errors.country && text)
                setErrors(prev => ({ ...prev, country: undefined }));
            }}
            value={country}
            keyboardType="default"
            autoCapitalize="words"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#F5F6FA'}
            error={errors.country}
            hasError={!!errors.country}
          />

          {loading ? (
            <ActivityIndicator
              size="large"
              color={theme.colors.primary}
              style={{ marginTop: 20 }}
            />
          ) : (
            <ButtonGradient
              title={t('screens.editProfile.buttonText')}
              style={styles.buttonStyle}
              gradientStyle={styles.gradientStyle}
              onPress={handleEditProfile}
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
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    paddingBottom: 60,
  },
  innerContainer: {
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  profileImage: {
    width: 145,
    height: 145,
    borderRadius: 100,
    marginVertical: 20,
  },
  inputStyle: {
    width: '100%',
  },
  buttonStyle: {
    alignSelf: 'flex-end',
  },
  gradientStyle: {
    width: 160,
    height: 50,
    marginTop: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
