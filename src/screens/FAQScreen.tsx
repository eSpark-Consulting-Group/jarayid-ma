import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { CustomText } from '../components';
import useTheme from '../theme/useTheme';
import AccordionItem from '../components/AccordionItem';
import { getStaticPage } from '../services/staticServices';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQScreen: React.FC = () => {
  const theme = useTheme();
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFaqs = async () => {
    try {
      const res = await getStaticPage({ page: 'faq' });
      const items = res?.data?.items || [];
      if (items.length > 0 && items[0].content?.faq) {
        setFaqs(items[0].content.faq);
      }
    } catch (err) {
      console.error('Error fetching FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <CustomText
          fontFamily="Gilroy-SemiBold"
          style={{ marginBottom: 20 }}
          size={23}
        >
          Frequently Asked Questions
        </CustomText>

        {!loading &&
          faqs.map(item => (
            <AccordionItem
              key={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FAQScreen;
