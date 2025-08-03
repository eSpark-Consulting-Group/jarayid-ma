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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setUser } from '../redux/slices/authSlice';
import {
  editUserProfileData,
  getUserProfileData,
} from '../services/profileService';
import { CustomInput } from '../components';
import ButtonGradient from '../components/ButtonGradient';
import { showToast } from '../utils/showToast';

const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [country, setCountry] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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
      showToast('Profile updated successfully.','success')
      console.log('Profile updated successfully.');
    } else {
      showToast('Profile updated successfully.','error')
      console.error('Failed to update profile:', result.error);
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
            label="Name"
            placeholder="Enter your Name"
            onChangeText={text => setName(text)}
            value={name}
            keyboardType="default"
            autoCapitalize="words"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#F5F6FA'}
          />

          <CustomInput
            label="Email"
            placeholder="Enter your Email"
            onChangeText={text => setEmail(text)}
            value={email}
            editable={false}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#F5F6FA'}
          />

          <CustomInput
            label="Mobile Number"
            placeholder="Enter your Mobile Number"
            onChangeText={text => setNumber(text)}
            value={number}
            editable={false}
            keyboardType="phone-pad"
            autoCapitalize="none"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#F5F6FA'}
          />

          <CustomInput
            label="Country"
            placeholder="Enter your Country"
            onChangeText={text => setCountry(text)}
            value={country}
            keyboardType="default"
            autoCapitalize="words"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#F5F6FA'}
          />

          {loading ? (
            <ActivityIndicator
              size="large"
              color={theme.colors.primary}
              style={{ marginTop: 20 }}
            />
          ) : (
            <ButtonGradient
              title="Save Changes"
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
