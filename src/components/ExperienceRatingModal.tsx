import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import CustomText from './CustomText';
import Modal from 'react-native-modal';
interface Props {
  visible: boolean;
  onSelect: (rating: number) => void;
  onClose: () => void;
}

const emojis = ['😖', '😒', '😐', '🙂', '😍'];

const ExperienceRatingModal: React.FC<Props> = ({ visible, onSelect, onClose }) => {
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
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <CustomText fontFamily='Gilroy-Bold' style={styles.title}>How’s your{'\n'}experience so far?</CustomText>
          <CustomText fontFamily='Gilroy-SemiBold' style={styles.subtitle}>We’d love to know!</CustomText>
          <View style={styles.emojiRow}>
            {emojis.map((emoji, index) => (
              <TouchableOpacity
                key={index}
                style={styles.emojiWrapper}
                onPress={() => onSelect(index + 1)}
              >
                <CustomText style={styles.emoji}>{emoji}</CustomText>
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
    backgroundColor: '#fff',
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
    backgroundColor: '#ccc',
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    lineHeight: 28,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
    color: '#9098A3',
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
    backgroundColor: '#F0F2F7',
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
