import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  CategorySelector,
  CustomButton,
  CustomText,
  ScreenTitle,
} from '../components';
import useTheme from '../theme/useTheme';

const NotificationSettings: React.FC = () => {
  const [selectedPriority, setSelectedPriority] = useState<string>('Low');
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScreenTitle title="Notification Settings" />
      <CategorySelector />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {['Low', 'Medium', 'High'].map((item, index) => (
          <CustomButton
            key={index}
            style={{
              ...styles.priorityBtn,
              backgroundColor:
                item == selectedPriority
                  ? '#B4D0EF'
                  : theme.dark
                  ? '#333'
                  : '#EAF4FF',
              borderColor:
                item == selectedPriority
                  ? '#8DAAC9'
                  : theme.dark
                  ? '#494949ff'
                  : '#D1E5FA',
            }}
            titleColor={
              theme.dark && item !== selectedPriority ? '#e2e2e2' : '#000'
            }
            title={item}
            onPress={() => setSelectedPriority(item)}
          />
        ))}
      </View>
      <View style={{ flexDirection: 'row', marginVertical: 20, gap: 3 }}>
        <CustomText text="You Will Receive" />
        <CustomText
          fontFamily="Gilroy-SemiBold"
          text={`${
            selectedPriority == 'Low'
              ? 3
              : selectedPriority == 'Medium'
              ? 2
              : selectedPriority == 'High'
              ? 1
              : 3
          } news alerts per day`}
        />
      </View>
    </View>
  );
};

export default NotificationSettings;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  priorityBtn: {
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
  },
});
