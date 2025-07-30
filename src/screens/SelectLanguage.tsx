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
} from 'react-native';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import LogoAuth from '../assets/images/LogoAuth.png';
import CustomSelector, { SelectorOption } from '../components/CustomSelector';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigation/navigation';
import { CustomText } from '../components';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface SelectLanguageProps {}

const SelectLanguageScreen: React.FC<SelectLanguageProps> = ({}) => {
  const navigation = useNavigation<RootStackNavigationProp<'SelectLanguage'>>();
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(
    undefined,
  );

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  ];

  const languageOptions: SelectorOption[] = languages.map(lang => ({
    value: lang.code,
    label: lang.name,
    subtitle: lang.nativeName,
    icon: 'language',
  }));

  const handleSelect = (option: SelectorOption) => {
    setSelectedLanguage(option.value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View>
            <Image source={LogoAuth} style={styles.logo} />
          </View>
          <View style={styles.formContainer}>
            <CustomText fontFamily='Gilroy-Bold' style={styles.title}>Choose Language</CustomText>
            <CustomText fontFamily='Gilroy-Regular' style={styles.subtitle}>
              Add your details below to get back into the app
            </CustomText>

            <CustomSelector
              label={'Select Language'}
              placeholder={'Select Language'}
              options={languageOptions}
              onSelect={handleSelect}
              selectedValue={selectedLanguage}
              searchable={true}
              modalTitle="Select Language"
            />
            <CustomButton
              title="Select"
              onPress={() => {
                navigation.navigate('Login');
              }}
              loading={loading}
            />
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  forgotPasswordText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SelectLanguageScreen;
