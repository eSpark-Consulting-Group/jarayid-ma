import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import HeaderText from './HeaderText';
import ButtonGradient from './ButtonGradient';
import Modal from 'react-native-modal';

interface Props {
  visible: boolean;
  onClose: () => void;
  theme: ReactNavigation.Theme;
  onShare?: () => void;
}

const SOCIAL_ICONS = [
  { name: 'Facebook', icon: require('../assets/images/facebook.png') },
  { name: 'Instagram', icon: require('../assets/images/instagram.png') },
  { name: 'Tiktok', icon: require('../assets/images/tiktok.png') },
  { name: 'Thread', icon: require('../assets/images/thread.png') },
  { name: 'Whatsapp', icon: require('../assets/images/whatsapp.png') },
  { name: 'Youtube', icon: require('../assets/images/youtube.png') },
];

const SocialShareModal: React.FC<Props> = ({
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
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <HeaderText
          theme={theme}
          fontFamily="Gilroy-SemiBold"
          style={styles.title}
        >
          Share Jarayid App
        </HeaderText>

        <View style={styles.grid}>
          {SOCIAL_ICONS.map((item, index) => (
            <View key={index} style={styles.iconBlock}>
              <Image source={item.icon} style={styles.iconImage} />
              <HeaderText theme={theme} style={styles.iconLabel}>
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
    backgroundColor: '#fff',
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
    backgroundColor: '#ccc',
    marginBottom: 14,
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
    marginBottom: 24,
    color: '#000',
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
    color: '#111',
    fontWeight: '500',
  },
  shareButton: {
    height: 50,
    width: Dimensions.get('window').width - 70,
  },
});

export default SocialShareModal;
