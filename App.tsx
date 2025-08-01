/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import RootNavigation from './src/navigation/index';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import { ThemeProvider } from './src/context/ThemeContext';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>

      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ThemeProvider>
      <Provider store={store}>
        <MenuProvider
          style={{ flex: 1 }}
          customStyles={{ backdrop: { backgroundColor: '#000', opacity: 0.5 } }}
        >
          <RootNavigation />
        </MenuProvider>
      </Provider>
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
