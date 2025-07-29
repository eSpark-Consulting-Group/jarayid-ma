import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { CustomText } from "../components";

const NotificationScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View>
        <CustomText>Notification Screen</CustomText>
        <CustomText>This is the notification screen.</CustomText>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
});

export default NotificationScreen;