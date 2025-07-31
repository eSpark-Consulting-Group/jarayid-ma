import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import CustomText from './CustomText';
import ButtonGradient from './ButtonGradient';
import Modal from 'react-native-modal';
import HeaderText from './HeaderText';

interface Props {
  visible: boolean;
  onClose: () => void;
  onShare?: () => void;
  theme: ReactNavigation.Theme;
}

const SOCIAL_ICONS = [
  { name: 'Facebook', icon: require('../assets/images/facebook.png') },
  { name: 'Instagram', icon: require('../assets/images/instagram.png') },
  { name: 'Tiktok', icon: require('../assets/images/tiktok.png') },
  { name: 'Thread', icon: require('../assets/images/thread.png') },
  { name: 'Whatsapp', icon: require('../assets/images/whatsapp.png') },
  { name: 'Youtube', icon: require('../assets/images/youtube.png') },
];

const SocialMediaModal: React.FC<Props> = ({
  visible,
  onClose,
  onShare,
  theme,
}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modalContainer}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View
        style={[styles.sheet, { backgroundColor: theme.colors.background }]}
      >
        <View
          style={[
            styles.handle,
            {
              backgroundColor: theme.dark ? '#fff' : '#e5e5e5',
            },
          ]}
        />
        <HeaderText
          theme={theme}
          fontFamily="Gilroy-SemiBold"
          color={theme.dark ? theme.colors.text : '#000'}
          style={styles.title}
        >
          Jarayid Social Media
        </HeaderText>

        <View style={styles.grid}>
          {SOCIAL_ICONS.map((item, index) => (
            <View key={index} style={styles.iconBlock}>
              <Image source={item.icon} style={styles.iconImage} />
              <HeaderText
                theme={theme}
                style={styles.iconLabel}
                color={theme.dark ? theme.colors.text : '#111'}
              >
                {item.name}
              </HeaderText>
            </View>
          ))}
        </View>

        <ButtonGradient
          title="Share"
          onPress={() => {}}
          gradientStyle={styles.shareButton}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 14,
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  iconBlock: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginBottom: 8,
  },
  iconLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  shareButton: {
    height: 50,
    width: Dimensions.get('window').width - 70,
  },
});

export default SocialMediaModal;
