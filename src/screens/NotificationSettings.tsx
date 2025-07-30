import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  CategorySelector,
  CustomButton,
  CustomText,
  ScreenTitle,
} from '../components';

const NotificationSettings: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScreenTitle title="Notification Settings" />
      <CategorySelector />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {['Low', 'Medium', 'High'].map((item, index) => (
          <CustomButton
            key={index}
            style={styles.priorityBtn}
            titleColor="#000"
            title={item}
            onPress={() => true}
          />
        ))}
      </View>
      <View style={{ flexDirection: 'row', marginVertical: 20 }}>
        <CustomText text="You Will Receive" />
        <CustomText
          fontFamily="Gilroy-SemiBold"
          text=" 3 news alerts per day"
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
    borderColor: '#D1E5FA',
    backgroundColor: '#EAF4FF',
    flex: 1,
  },
});
