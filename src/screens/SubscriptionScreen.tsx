import React from 'react';
import { View, StyleSheet } from 'react-native';
import SubscriptionCard from '../components/SubscriptionCard';
import { CustomText } from '../components';
import useTheme from '../theme/useTheme';

const SubscriptionScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <CustomText
        fontFamily="Gilroy-SemiBold"
        size={23}
        style={styles.headerText}
      >
        Subscribe Jarayid Plus
      </CustomText>
      <View style={styles.cardsContainer}>
        <SubscriptionCard
          title="Basic Subscription"
          description="Get Ad Free Experience While you are Reading your Favourite articles."
          price="$9.99"
          onPress={() => console.log('Upgrade Now clicked!')}
        />
        <SubscriptionCard
          title="Basic Subscription"
          description="Get Ad Free Experience While you are Reading your Favourite articles."
          price="$9.99"
          onPress={() => console.log('Upgrade Now clicked!')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    marginVertical: 20,
    textAlign: 'left',
    paddingHorizontal: 20,
  },
  cardsContainer: {
    gap: 20,
  },
});

export default SubscriptionScreen;
