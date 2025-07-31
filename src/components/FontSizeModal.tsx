import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import CustomText from './CustomText';
import ScreenTitle from './ScreenTitle';
import CustomButton from './CustomButton';
import { ChevDown, ChevUp } from '../assets';
import { FONT_SIZES } from '../constants';
import HeaderText from './HeaderText';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onChange: () => void;
  theme: ReactNavigation.Theme;
}

const FontSizeModal: React.FC<Props> = ({
  visible,
  onCancel,
  onChange,
  theme,
}) => {
  const [showSizes, setShowSizes] = useState(false);

  const onBackDropAndSwipe = () => {
    setShowSizes(false);
    onCancel();
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onBackDropAndSwipe}
      onSwipeComplete={onBackDropAndSwipe}
      swipeDirection="down"
      style={styles.modalContainer}
      propagateSwipe
    >
      <View style={styles.modal}>
        <View style={styles.handle} />
        <View style={{ alignItems: 'center' }}>
          <ScreenTitle title="Adjust Font Size" />
          <CustomButton
            style={styles.sizesBtn}
            titleColor="#000"
            title="Select Font Size"
            onPress={() => setShowSizes(!showSizes)}
            iconLeft={showSizes ? <ChevUp /> : <ChevDown />}
            titleStyle={{ fontFamily: 'Gilroy-SemiBold', fontSize: 17 }}
          />
          <FlatList
            data={FONT_SIZES}
            style={[styles.sizesContainer, { opacity: showSizes ? 1 : 0 }]}
            contentContainerStyle={styles.sizesList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={showSizes ? false : true}
                onPress={onChange}
              >
                <HeaderText
                  theme={theme}
                  fontFamily={index == 0 ? 'Gilroy-Regular' : 'Gilroy-Medium'}
                  size={item.size}
                  text={item.name}
                />
              </TouchableOpacity>
            )}
          />
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
  sizesBtn: {
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1E5FA',
    backgroundColor: '#EAF4FF',
  },
  sizesContainer: {
    width: '80%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D1E5FA',
    backgroundColor: '#EAF4FF',
  },
  sizesList: {
    gap: 15,
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

export default FontSizeModal;
