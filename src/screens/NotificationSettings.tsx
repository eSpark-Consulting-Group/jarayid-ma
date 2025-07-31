import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  CategorySelector,
  CustomButton,
  CustomText,
  ScreenTitle,
} from '../components';

const NotificationSettings: React.FC = () => {
  const [selectedPriority, setSelectedPriority] = useState<string>('Low');

  return (
    <View style={styles.container}>
      <ScreenTitle title="Notification Settings" />
      <CategorySelector />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {['Low', 'Medium', 'High'].map((item, index) => (
          <CustomButton
            key={index}
            style={{
              ...styles.priorityBtn,
              backgroundColor: item == selectedPriority ? '#B4D0EF' : '#EAF4FF',
              borderColor: item == selectedPriority ? '#8DAAC9' : '#D1E5FA',
            }}
            titleColor="#000"
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
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: '#FFF' },
  priorityBtn: {
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
  },
});
