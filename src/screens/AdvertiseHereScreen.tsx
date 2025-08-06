import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { CustomInput, ScreenTitle } from '../components';
import ButtonGradient from '../components/ButtonGradient';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const AdvertiseHereScreen: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}>
          <ScreenTitle title={t('screens.advertiseHere.title')} />
          <CustomInput
            label={t('screens.advertiseHere.name')}
            placeholder={t('screens.advertiseHere.namePlaceholder')}
            onChangeText={() => {}}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
          />

          <CustomInput
            label={t('screens.advertiseHere.businessName')}
            placeholder={t('screens.advertiseHere.businessNamePlaceholder')}
            onChangeText={() => {}}
            keyboardType="default"
            autoCapitalize="none"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
          />
          <CustomInput
            label={t('screens.advertiseHere.website')}
            placeholder={t('screens.advertiseHere.websitePlaceholder')}
            onChangeText={() => {}}
            keyboardType="default"
            autoCapitalize="none"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
          />
          <CustomInput
            label={t('screens.advertiseHere.email')}
            placeholder={t('screens.advertiseHere.emailPlaceholder')}
            onChangeText={() => {}}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
          />
          <CustomInput
            label={t('screens.advertiseHere.phone')}
            placeholder={t('screens.advertiseHere.phonePlaceholder')}
            onChangeText={() => {}}
            keyboardType="number-pad"
            autoCapitalize="none"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
          />
          <CustomInput
            label={t('screens.advertiseHere.country')}
            placeholder={t('screens.advertiseHere.countryPlaceholder')}
            onChangeText={() => {}}
            keyboardType="default"
            autoCapitalize="none"
            style={styles.inputStyle}
            bgColor={theme.dark ? '#1e1e1e' : '#EAF4FF'}
          />

          <ButtonGradient
            title={t('screens.advertiseHere.buttonText')}
            style={styles.buttonStyle}
            gradientStyle={styles.gradientStyle}
            onPress={() => console.log('AdvertiseHere Updated')}
          />
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
  AdvertiseHereImage: {
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
    width: 138,
    height: 50,
    marginTop: 20,
    borderRadius: 6,
  },
});

export default AdvertiseHereScreen;
