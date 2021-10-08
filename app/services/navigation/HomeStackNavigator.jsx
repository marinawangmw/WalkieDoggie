import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { HomeScreen, FindWalkersScreen, ProfileScreen, CreateWalkScreen } from '../../screens';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = ({ route }) => {
  const { userProfile } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ title: 'Walkie Doggie' }}
        initialParams={{
          userProfile,
        }}
      />
      <Stack.Screen
        name="findWalker"
        component={FindWalkersScreen}
        options={{ title: 'Paseadores', headerBackTitle: '' }}
      />
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{ title: '', headerBackTitle: '' }}
      />
      <Stack.Screen
        name="createWalk"
        component={CreateWalkScreen}
        options={{ title: 'Crear una reserva para tu paseo', headerBackTitle: '' }}
        initialParams={{
          userProfile,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
