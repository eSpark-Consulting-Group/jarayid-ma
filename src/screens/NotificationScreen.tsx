import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { CustomText } from '../components';
import useTheme from '../theme/useTheme';

import NotificationItem from '../components/NotificationItem';

const NotificationScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <CustomText
        fontFamily="Gilroy-Bold"
        size={23}
        style={{ marginBottom: 10, paddingHorizontal: 20 }}
      >
        Notifications
      </CustomText>

      <FlatList
        data={Array.from({ length: 10 }, (_, i) => ({
          id: i.toString(),
          initials: 'AB',
          message: 'Lorem Ipsum is simply dummy text of the printing',
          time: '15h',
        }))}
        renderItem={({ item }) => (
          <NotificationItem
            key={item?.id}
            initials={item.initials}
            message={item.message}
            time={item.time}
            onViewPress={() => console.log('View pressed')}
            onOptionsPress={() => console.log('Options pressed')}
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NotificationScreen;
