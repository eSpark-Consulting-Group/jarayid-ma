import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderText from './HeaderText';
import useTheme from '../theme/useTheme';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  theme: ReactNavigation.Theme;
}

const LogoutConfirmationModal: React.FC<Props> = ({
  visible,
  onCancel,
  onConfirm,
  theme,
}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onCancel}
      onSwipeComplete={onCancel}
      swipeDirection="down"
      style={styles.modalContainer}
      propagateSwipe
    >
      <View style={styles.modal}>
        <View style={styles.handle} />

        <View style={styles.iconWrapper}>
          <Icon name="information" size={36} color="#fff" />
        </View>

        <HeaderText theme={theme} fontFamily="Gilroy-Bold" style={styles.title}>
          Are you sure you want to Logout?
        </HeaderText>
        <HeaderText
          theme={theme}
          fontFamily="Gilroy-SemiBold"
          style={styles.subtitle}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard
        </HeaderText>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <HeaderText theme={theme} style={styles.cancelText}>
              Cancel
            </HeaderText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutBtn} onPress={onConfirm}>
            <HeaderText theme={theme} style={styles.logoutText}>
              Logout
            </HeaderText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  iconWrapper: {
    backgroundColor: '#DF1C41',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  logoutBtn: {
    flex: 1,
    backgroundColor: '#DF1C41',
    borderRadius: 10,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },
  logoutText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default LogoutConfirmationModal;
