import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { Provider as PaperProvider } from 'react-native-paper';
import AppBottomBar from './AppBottomBar';

export default function App() {
  return (
    <PaperProvider>
      <AppBottomBar/>
    </PaperProvider>
  );
}
