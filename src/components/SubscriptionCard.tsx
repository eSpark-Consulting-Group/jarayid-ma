import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from './CustomText';
import { ArrowTopRight } from '../assets';

interface SubscriptionCardProps {
  title: string;
  description: string;
  price: string;
  priceUnit?: string;
  buttonLabel?: string;
  onPress?: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  description,
  price,
  priceUnit = '/ MN',
  buttonLabel = 'Upgrade Now',
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <CustomText fontFamily="Gilroy-SemiBold" size={18} style={styles.title}>
        {title}
      </CustomText>
      <CustomText
        fontFamily="Gilroy-Regular"
        size={13}
        style={styles.description}
      >
        {description}
      </CustomText>

      <View style={styles.priceRow}>
        <CustomText fontFamily="Gilroy-Bold" size={28} style={styles.price}>
          {price}
        </CustomText>
        <CustomText fontFamily="Gilroy-Regular" style={styles.priceUnit}>
          {priceUnit}
        </CustomText>
      </View>

      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        <LinearGradient
          colors={['#007BFF', '#004A99']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <CustomText size={15} style={styles.buttonText}>
            {buttonLabel}
          </CustomText>
          <ArrowTopRight style={{ marginLeft: 6 }} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#53565A',
    borderRadius: 8,
    padding: 16,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 25,
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    color: '#DADADA',
    fontWeight: '400',
    marginBottom: 16,
    lineHeight: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  price: {
    color: '#fff',
    fontWeight: '700',
  },
  priceUnit: {
    color: '#fff',

    fontWeight: '500',
    marginLeft: 6,
    marginBottom: 4,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: 48,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default SubscriptionCard;
