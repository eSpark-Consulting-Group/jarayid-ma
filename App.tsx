/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigation from './src/navigation/index';
import { store } from './src/redux/store';
import { ThemeProvider } from './src/context/ThemeContext';
import ToastConfig from './src/utils/toastConfig';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      {/* ✅ Wrap the whole app */}
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ThemeProvider>
          <Provider store={store}>
            <MenuProvider
              style={{ flex: 1 }}
              customStyles={{
                backdrop: { backgroundColor: '#000', opacity: 0.5 },
              }}
            >
              <RootNavigation />
              <ToastConfig />
            </MenuProvider>
          </Provider>
        </ThemeProvider>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
