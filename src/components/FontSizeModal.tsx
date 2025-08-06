import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import ScreenTitle from './ScreenTitle';
import CustomButton from './CustomButton';
import { ChevDown, ChevUp } from '../assets';
import HeaderText from './HeaderText';
import { useFontSize } from '../context/FontSizeContext';
import { useTranslation } from 'react-i18next';

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
  const { setFontSizeValue } = useFontSize(); // <- use setter
  const { t } = useTranslation();

  const handleFontSizeChange = (value: number) => {
    setFontSizeValue(value); // <- set global font size adjustment
    setShowSizes(false);
    onChange(); // optionally do more
    onCancel(); // optionally close modal
  };

  const onBackDropAndSwipe = () => {
    setShowSizes(false);
    onCancel();
  };
  const FONT_SIZES = [
    { name: t('screens.fontSizeModal.small'), size: 14, value: -2 },
    { name: t('screens.fontSizeModal.medium'), size: 17, value: 0 },
    { name: t('screens.fontSizeModal.large'), size: 20, value: 2 },
  ];

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onBackDropAndSwipe}
      onSwipeComplete={onBackDropAndSwipe}
      swipeDirection="down"
      style={styles.modalContainer}
      propagateSwipe
    >
      <View
        style={[styles.modal, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.handle} />
        <View style={{ alignItems: 'center' }}>
          <ScreenTitle title={t('screens.fontSizeModal.title')} />
          <CustomButton
            style={[
              styles.sizesBtn,
              {
                backgroundColor: theme.dark ? '#333' : '#EAF4FF',
                borderColor: theme.dark ? '#494949ff' : '#D1E5FA',
              },
            ]}
            titleColor={theme.dark ? '#e2e2e2' : '#000'}
            title={t('screens.fontSizeModal.label')}
            onPress={() => setShowSizes(!showSizes)}
            iconLeft={showSizes ? <ChevUp /> : <ChevDown />}
            titleStyle={{ fontFamily: 'Gilroy-SemiBold' }}
            size={17}
          />
          <FlatList
            data={FONT_SIZES}
            style={[
              styles.sizesContainer,
              {
                opacity: showSizes ? 1 : 0,
                backgroundColor: theme.dark ? '#333' : '#EAF4FF',
                borderColor: theme.dark ? '#494949ff' : '#D1E5FA',
              },
            ]}
            contentContainerStyle={[styles.sizesList]}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={showSizes ? false : true}
                onPress={() => handleFontSizeChange(item.value)}
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
});

export default FontSizeModal;
