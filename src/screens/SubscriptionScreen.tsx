import React from 'react';
import { View, StyleSheet } from 'react-native';
import SubscriptionCard from '../components/SubscriptionCard';
import { CustomText } from '../components';
import useTheme from '../theme/useTheme';
import { useTranslation } from 'react-i18next';

const SubscriptionScreen: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <CustomText
        fontFamily="Gilroy-SemiBold"
        size={23}
        style={styles.headerText}
      >
        {t('screens.subscription.title')}
      </CustomText>
      <View style={styles.cardsContainer}>
        <SubscriptionCard
          title={t('screens.subscription.cardTitle')}
          description={t('screens.subscription.cardDescription')}
          price="$9.99"
          onPress={() => console.log('Upgrade Now clicked!')}
          buttonLabel={t('screens.subscription.buttonLabel')}
        />
        <SubscriptionCard
          title={t('screens.subscription.cardTitle')}
          description={t('screens.subscription.cardDescription')}
          price="$9.99"
          buttonLabel={t('screens.subscription.buttonLabel')}
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
