import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderText from './HeaderText';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onCancel}
      onSwipeComplete={onCancel}
      swipeDirection="down"
      style={styles.modalContainer}
      propagateSwipe
    >
      <View
        style={[styles.modal, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.handle} />

        <View style={styles.iconWrapper}>
          <Icon name="information" size={36} color="#fff" />
        </View>

        <HeaderText
          theme={theme}
          fontFamily="Gilroy-Bold"
          style={styles.title}
          color={theme.dark ? theme.colors.text : '#000'}
          size={19}
        >
          {t('screens.logout.title')}
        </HeaderText>
        <HeaderText
          theme={theme}
          fontFamily="Gilroy-SemiBold"
          style={styles.subtitle}
        >
          {t('screens.logout.message')}
        </HeaderText>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.cancelBtn,
              { borderColor: theme.dark ? '#494949ff' : '#333' },
            ]}
            onPress={onCancel}
          >
            <HeaderText
              theme={theme}
              fontFamily="Gilroy-SemiBold"
              style={styles.cancelText}
              size={15}
            >
              {t('screens.logout.cancelButton')}
            </HeaderText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutBtn} onPress={onConfirm}>
            <HeaderText
              theme={theme}
              style={styles.logoutText}
              size={15}
              fontFamily="Gilroy-SemiBold"
            >
              {t('screens.logout.confirmButton')}
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
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
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
    // borderColor: '#000',
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
  cancelText: {},
  logoutText: {
    color: '#fff',
  },
});

export default LogoutConfirmationModal;
