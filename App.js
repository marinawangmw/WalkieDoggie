import React, { useEffect, useState } from 'react';
import {
  AuthenticationScreen,
  OnboardingDetailsScreen,
  HomeScreen,
  ChatScreen,
  ProfileScreen,
} from './app/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const RootStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const RootStackScreen = () => (
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
    <RootStack.Screen name="Home" component={HomeTabsScreen} options={{ headerShown: false }} />
  </RootStack.Navigator>
);

const HomeTabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="HomeScreen" component={HomeScreen} />
    <Tabs.Screen name="ChatScreen" component={ChatScreen} />
    <Tabs.Screen name="ProfileScreen" component={ProfileScreen} />
  </Tabs.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
}
