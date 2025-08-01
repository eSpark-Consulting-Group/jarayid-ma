import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { CustomText } from '../components';
import useTheme from '../theme/useTheme';

import AccordionItem from '../components/AccordionItem';

const FAQScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <CustomText
          // theme={theme.navigationTheme}
          fontFamily="Gilroy-SemiBold"
          style={{ fontSize: 23, marginBottom: 20 }}
        >
          Frequently Asked Questions
        </CustomText>
        <AccordionItem
          question="Lorem Ipsum is simply dummy text of the printing ?"
          answer="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."
        />
        <AccordionItem
          question="Lorem Ipsum is simply dummy text of the printing ?"
          answer="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."
        />
        <AccordionItem
          question="Lorem Ipsum is simply dummy text of the printing ?"
          answer="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."
        />
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
