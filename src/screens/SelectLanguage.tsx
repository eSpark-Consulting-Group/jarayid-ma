import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomSelector, { SelectorOption } from '../components/CustomSelector';
import { useNavigation } from '@react-navigation/native';

import { RootStackNavigationProp } from '../navigation/navigation';
import { CustomText } from '../components';
import useTheme from '../theme/useTheme';
import { HeaderLogo, HeaderLogoDark } from '../assets';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface SelectLanguageProps {}

const SelectLanguageScreen: React.FC<SelectLanguageProps> = ({}) => {
  const navigation = useNavigation<RootStackNavigationProp<'SelectLanguage'>>();
  const { i18n, t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(
    undefined,
  );
  const theme = useTheme();
  const dispatch = useDispatch();
  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  ];

  const languageOptions: SelectorOption[] = languages.map(lang => ({
    value: lang.code,
    label: lang.name,
    subtitle: lang.nativeName,
    icon: 'language',
  }));

  const handleSelect = (option: SelectorOption) => {
    console.log('kia mila option me', option);
    setSelectedLanguage(option.value);
  };

  const getSelectedLanguage = async () => {
    const storedLang = await AsyncStorage.getItem('appLanguage');
    if (storedLang) {
      setSelectedLanguage(storedLang);
    }
  };

  useEffect(() => {
    getSelectedLanguage();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {theme.dark ? (
            <HeaderLogoDark width={210} height={70} style={styles.logo} />
          ) : (
            <HeaderLogo width={210} height={70} style={styles.logo} />
          )}
          <View
            style={[
              styles.formContainer,
              {
                elevation: theme.dark ? 0 : 5,
                borderWidth: theme.dark ? 1 : 0,
                borderColor: '#494949ff',
                backgroundColor: theme.colors.background,
              },
            ]}
          >
            <CustomText fontFamily="Gilroy-Bold" size={28} style={styles.title}>
              {i18n.t('screens.chooseLanguage.title')}
            </CustomText>
            <CustomText
              fontFamily="Gilroy-Regular"
              style={styles.subtitle}
              size={16}
              color={theme.dark ? '#999' : '#666'}
            >
              Add your details below to get back into the app
            </CustomText>

            <CustomSelector
              label={t('screens.chooseLanguage.label')}
              placeholder={t('screens.chooseLanguage.label')}
              options={languageOptions}
              onSelect={handleSelect}
              selectedValue={selectedLanguage}
              searchable={true}
              modalTitle={t('screens.chooseLanguage.label')}
            />
            <CustomButton
              title={t('screens.chooseLanguage.buttonText')}
              disabled={!selectedLanguage}
              onPress={async () => {
                if (selectedLanguage) {
                  setLoading(true);
                  await i18n.changeLanguage(selectedLanguage);
                  await AsyncStorage.setItem('appLanguage', selectedLanguage); // <--- important
                  dispatch(setLanguage(selectedLanguage));
                  setLoading(false);
                  navigation.navigate('Home');
                }
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
    borderRadius: 8,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 32,
    lineHeight: 22,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#666',
  },
  link: {
    color: '#4A90E2',
    fontWeight: '500',
  },
  logo: { marginBottom: 40, alignSelf: 'center' },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  forgotPasswordText: {
    color: '#4A90E2',
    fontWeight: '500',
  },
});

export default SelectLanguageScreen;
