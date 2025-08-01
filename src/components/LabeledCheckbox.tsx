import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';

import CustomText from './CustomText';
import { Checkbox } from '../assets';
import useTheme from '../theme/useTheme';

type LabeledCheckboxProps = {
  label: string;
  size?: number;
  labelColor?: string;
  labelFontfamily?:
    | 'Gilroy-Bold'
    | 'Gilroy-ExtraBold'
    | 'Gilroy-Medium'
    | 'Gilroy-Regular'
    | 'Gilroy-SemiBold'
    | 'Inter_24pt-Regular'
    | 'Mondia-Thin'
    | 'Poppins-Medium'
    | 'Poppins-Regular'
    | 'Poppins-SemiBold';
  labelSize?: number;
  imageURL?: string;
};

const LabeledCheckbox: React.FC<LabeledCheckboxProps> = ({
  label,
  size = 18,
  labelColor = '#6C727F',
  labelFontfamily,
  labelSize,
  imageURL,
}) => {
  const theme = useTheme();
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <Pressable style={styles.container} onPress={() => setChecked(!checked)}>
      <View style={styles.boxAndLabel}>
        <Checkbox
          width={size}
          height={size}
          color={checked ? '#004A99' : '#D7D8DB'}
        />
        <CustomText
          fontFamily={labelFontfamily}
          size={labelSize}
          text={label}
          color={theme.dark ? '#D7D8DB' : labelColor}
        />
      </View>
      {imageURL ? (
        <Image style={styles.image} source={{ uri: imageURL }} />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  boxAndLabel: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  image: { width: 80, height: 55, borderRadius: 10 },
});

export default LabeledCheckbox;
