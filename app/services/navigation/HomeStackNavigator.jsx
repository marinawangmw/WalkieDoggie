import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { HomeScreen, FindWalkersScreen } from '../../screens';

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
        options={{ title: 'Paseadores' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
