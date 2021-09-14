import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthenticationScreen, OnboardingDetailsScreen, AddressScreen } from '../../screens';
import HomeTabNavigator from './HomeTabNavigator';
import { OwnerOnboarding, WalkerOnboarding } from '../../components';

const RootStack = createNativeStackNavigator();

const RootStackNavigator = ({ userToken, error }) => {
  return (
    <RootStack.Navigator>
      {userToken ? (
        <RootStack.Screen
          name="Home"
          component={HomeTabNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <RootStack.Screen
            name="Authentication"
            component={AuthenticationScreen}
            options={{ headerShown: false }}
            initialParams={{ error }}
          />
          <RootStack.Screen
            name="Onboarding"
            component={OnboardingDetailsScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="OwnerOnboarding"
            component={OwnerOnboarding}
            options={{ title: '', headerBackTitle: '' }}
          />
          <RootStack.Screen
            name="WalkerOnboarding"
            component={WalkerOnboarding}
            options={{ title: '', headerBackTitle: '' }}
          />
          <RootStack.Screen
            name="AddressScreen"
            component={AddressScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
