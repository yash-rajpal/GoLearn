import React from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppStackNavigator from './src/routes';

declare const global: {HermesInternal: null | {}};

const App = () => {
  console.disableYellowBox = true;
  return (
    <View style={{flex: 1}}>
      <SafeAreaProvider>
        <AppStackNavigator />
      </SafeAreaProvider>
    </View>
  );
};

export default App;
