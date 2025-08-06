import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { CustomText } from '../components';
import useTheme from '../theme/useTheme';
import { getStaticPage } from '../services/staticServices';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: React.FC = () => {
  const theme = useTheme();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const fetchStaticContent = async () => {
    try {
      const res = await getStaticPage({ page: 'privacy-policy' });
      console.log('Static page response:', res);

      const message =
        res?.data?.items?.[0]?.content?.welcomeMessage ||
        'No content available.';
      setContent(message);
    } catch (err) {
      console.error('Error fetching static page:', err);
      setContent('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaticContent();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <CustomText
          fontFamily="Gilroy-SemiBold"
          size={23}
          style={{ marginBottom: 20 }}
        >
          {t('screens.privacyPolicy.title')}
        </CustomText>
        <View style={styles.subContainer}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
          >
            <CustomText
              fontFamily="Gilroy-Regular"
              size={16}
              style={{ lineHeight: 24 }}
            >
              {loading ? 'Loading...' : content}
            </CustomText>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9DBE9',
    marginBottom: 12,
    overflow: 'hidden',
    paddingBottom: 10,
    height: '90%',
  },
});

export default PrivacyPolicy;
