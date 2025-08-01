import React from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import HeaderText from './HeaderText';
import Modal from 'react-native-modal';
interface Props {
  visible: boolean;
  onSelect: (rating: number) => void;
  onClose: () => void;
  theme: ReactNavigation.Theme;
}

const emojis = ['😖', '😒', '😐', '🙂', '😍'];

const ExperienceRatingModal: React.FC<Props> = ({
  visible,
  onSelect,
  onClose,
  theme,
}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modalContainer}
      propagateSwipe
    >
      <View style={styles.overlay}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />
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
            fontFamily="Gilroy-Bold"
            color={theme.dark ? theme.colors.text : '#000'}
            style={styles.title}
          >
            How’s your{'\n'}experience so far?
          </HeaderText>
          <HeaderText
            theme={theme}
            fontFamily="Gilroy-SemiBold"
            color={theme.dark ? theme.colors.text : '#9098A3'}
            style={styles.subtitle}
          >
            We’d love to know!
          </HeaderText>
          <View style={styles.emojiRow}>
            {emojis.map((emoji, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.emojiWrapper,
                  { backgroundColor: theme.dark ? '#434343ff' : '#F0F2F7' },
                ]}
                onPress={() => onSelect(index + 1)}
              >
                <HeaderText theme={theme} style={[styles.emoji]}>
                  {emoji}
                </HeaderText>
              </TouchableOpacity>
            ))}
          </View>
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
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'rgba(22,22,22,0.5)',
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    alignItems: 'center',
  },
  handle: {
    width: 50,
    height: 5,
    borderRadius: 3,
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 28,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 15,
    lineHeight: 28,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginVertical: 20,
  },
  emojiWrapper: {
    borderRadius: 30,
    padding: 12,
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
});

export default ExperienceRatingModal;
