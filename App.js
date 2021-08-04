import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthenticationScreen } from './app/screens';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthenticationScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
