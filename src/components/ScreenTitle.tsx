import React from 'react';
import { StyleSheet } from 'react-native';
import CustomText from './CustomText';

type ScreenTitleProps = {
  title?: string;
};

const ScreenTitle: React.FC<ScreenTitleProps> = ({ title }) => {
  return (
    <CustomText
      fontFamily="Gilroy-SemiBold"
      size={24}
      text={title}
      style={styles.title}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
  },
});

export default ScreenTitle;
