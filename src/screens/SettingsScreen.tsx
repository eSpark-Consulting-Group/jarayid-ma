import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { CustomText } from '../components';
import {
  Vector0,
  Vector1,
  Vector2,
  Vector3,
  Vector4,
  Vector5,
  Vector6,
  Vector7,
  Vector8,
  Vector9,
  Vector10,
  Vector11,
  Vector12,
  Vector13,
  Vector14,
  Vector15,
  Vector16,
} from '../assets';
import Divider from '../components/Divider';

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CustomText
          size={20}
          fontFamily="Gilroy-ExtraBold"
          style={{ textAlign: 'center', paddingVertical: 10 }}
          color="#004A99"
        >
          Other Settings
        </CustomText>
        {settingsData.map(({ label, icon }, index) => (
          <TouchableOpacity key={index} style={styles.item}>
            <View style={styles.row}>
              {icon}
              <CustomText style={styles.label}>{label}</CustomText>
            </View>
            <Divider color="#8F8F8F" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export const settingsData = [
  { label: 'Edit Profile', icon: <Vector0 /> },
  { label: 'Setting', icon: <Vector1 /> },
  { label: 'Edit New Source', icon: <Vector2 /> },
  { label: 'Read Late', icon: <Vector3 /> },
  { label: 'Edit Notification', icon: <Vector4 /> },
  { label: 'Jarayid Social Media Accounts', icon: <Vector5 /> },
  { label: 'Advertise here', icon: <Vector6 /> },
  { label: 'Rate Jarayid.com', icon: <Vector7 /> },
  { label: 'Subscription Jarayid Plus', icon: <Vector8 /> },
  { label: 'Share The App', icon: <Vector9 /> },
  { label: 'Dark Mode', icon: <Vector10 /> },
  { label: 'Font Size', icon: <Vector11 /> },
  { label: 'FAQs', icon: <Vector12 /> },
  { label: 'Terms of Use', icon: <Vector13 /> },
  { label: 'Privacy Policy', icon: <Vector14 /> },
  { label: 'Contact Us', icon: <Vector15 /> },
  { label: 'Logout', icon: <Vector16 /> },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  item: {
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 10,
  },
});

export default SettingsScreen;
