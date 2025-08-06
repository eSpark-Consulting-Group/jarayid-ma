import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import googleIcon from '../assets/images/google.png';
import useTheme from '../theme/useTheme';
import CustomText from './CustomText';
import { useTranslation } from 'react-i18next';
interface GoogleButtonProps {
  onPress: () => void;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onPress }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { borderColor: theme.dark ? '#494949ff' : '#E0E0E0' },
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Image source={googleIcon} style={styles.icon} />
        <CustomText size={16} style={styles.text}>
          {t('screens.signup.googleSignupButton')}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontWeight: '500',
  },
});

export default GoogleButton;
