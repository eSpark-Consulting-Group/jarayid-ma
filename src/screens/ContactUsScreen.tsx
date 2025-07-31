import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { CustomInput, ScreenTitle } from '../components';
import ButtonGradient from '../components/ButtonGradient';

const ContactUsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}>
          <ScreenTitle title="Contact Us" />
          <CustomInput
            label="Name"
            placeholder="Enter your Name "
            onChangeText={() => {}}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputStyle}
          />

          <CustomInput
            label="Business Name"
            placeholder="Enter your Business Name"
            onChangeText={() => {}}
            keyboardType="default"
            autoCapitalize="none"
            style={styles.inputStyle}
          />
          <CustomInput
            label="Contact"
            placeholder="Enter your Contact"
            onChangeText={() => {}}
            keyboardType="number-pad"
            autoCapitalize="none"
            style={styles.inputStyle}
          />
          <CustomInput
            label="Email"
            placeholder="Enter your Email"
            onChangeText={() => {}}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputStyle}
          />
          <CustomInput
            label="Country"
            placeholder="Enter you Country Name"
            onChangeText={() => {}}
            keyboardType="default"
            autoCapitalize="none"
            style={styles.inputStyle}
          />
          <CustomInput
            label="Message"
            placeholder="Enter you Message Here"
            onChangeText={() => {}}
            keyboardType="default"
            autoCapitalize="none"
            style={{ height: 150, width: '100%', backgroundColor: '#EAF4FF' }}
            multiline
          />

          <ButtonGradient
            title="Submit"
            style={styles.buttonStyle}
            gradientStyle={styles.gradientStyle}
            onPress={() => console.log('ContactUs Updated')}
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
  ContactUsImage: {
    width: 145,
    height: 145,
    borderRadius: 100,
    marginVertical: 20,
  },
  inputStyle: {
    width: '100%',
    backgroundColor: '#EAF4FF',
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
