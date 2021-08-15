import React, { useEffect, useState } from 'react';
import { AuthenticationScreen, OnboardingDetailsScreen, HomeScreen } from './app/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Authentication"
          component={AuthenticationScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Onboarding"
          component={OnboardingDetailsScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Home" component={HomeScreen} options={{ title: 'Walkie Doggie' }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
