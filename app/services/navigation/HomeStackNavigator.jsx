import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { HomeScreen, FindWalkersScreen, ProfileScreen, CreateWalkScreen } from '../../screens';
import GooglePlaceSearcher from '../../screens/CreateWalkScreen/GooglePlaceSearcher';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = ({ route }) => {
  const { userProfile } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Group>
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
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="createWalk"
          component={CreateWalkScreen}
          options={{ title: 'Crear una reserva para tu paseo', headerBackTitle: '' }}
          initialParams={{
            userProfile,
          }}
        />
        <Stack.Screen
          name="googlePlaceSearcher"
          component={GooglePlaceSearcher}
          options={{ title: '' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
