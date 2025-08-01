import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { CustomText } from '../components';
import useTheme from '../theme/useTheme';

const TermOfUse: React.FC = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <CustomText
          fontFamily="Gilroy-SemiBold"
          style={{ fontSize: 23, marginBottom: 20 }}
        >
          Terms of Use
        </CustomText>
        <View
          style={[
            styles.subContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20, flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <CustomText
              fontFamily="Gilroy-Regular"
              style={{ fontSize: 16, lineHeight: 24 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
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
    backgroundColor: '#fff',
    paddingBottom: 10,
    height: '90%',
  },
});

export default TermOfUse;
