import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthenticationScreen, OnboardingDetaildScreen } from './app/screens';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={AuthenticationScreen}
            options={{ title: 'Authentication' }}
          />
          <Stack.Screen
            name='Onboarding details'
            component={OnboardingDetaildScreen}
          />
        </Stack.Navigator>
        <StatusBar style='auto' />
      </View>
    </NavigationContainer>
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
