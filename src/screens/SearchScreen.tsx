import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { CustomText } from "../components";

const SearchScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View>
        <CustomText>Search Screen</CustomText>
        <CustomText>This is the search screen.</CustomText>
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

export default SearchScreen;