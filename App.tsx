import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CallProvider } from './src/context/CallContext';
import RootStack from './src/navigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <CallProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </CallProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
