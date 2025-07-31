/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import RootNavigation from './src/navigation/index';
import { MenuProvider } from 'react-native-popup-menu';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MenuProvider
        style={{ flex: 1 }}
        customStyles={{ backdrop: { backgroundColor: '#000', opacity: 0.5 } }}
      >
        <RootNavigation />
      </MenuProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
