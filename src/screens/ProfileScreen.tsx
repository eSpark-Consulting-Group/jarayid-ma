import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { CustomInput } from '../components';
import ButtonGradient from '../components/ButtonGradient';

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: 'https://picsum.photos/200/200.jpg' }} // Replace with actual
          />

          <CustomInput
            label="Name"
            placeholder="Enter your Name "
            onChangeText={() => {}}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputStyle}
          />

          <CustomInput
            label="Email Account"
            placeholder="Enter your Email"
            onChangeText={() => {}}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputStyle}
          />
          <CustomInput
            label="Mobile Number"
            placeholder="Enter your Mobile num"
            onChangeText={() => {}}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputStyle}
          />
          <CustomInput
            label="Your Country"
            placeholder="Enter you Country Name"
            onChangeText={() => {}}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputStyle}
          />

          <ButtonGradient
            title="Edit"
            style={styles.buttonStyle}
            gradientStyle={styles.gradientStyle}
            onPress={() => console.log('Profile Updated')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    backgroundColor: '#F5F6FA',
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

export default ProfileScreen;
