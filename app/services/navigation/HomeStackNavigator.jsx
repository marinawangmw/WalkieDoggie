import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import {
  HomeScreen,
  FindWalkersScreen,
  ProfileScreen,
  CreateReservationScreen,
  RejectReservationsScreen,
  ProgramWalkScreen,
} from '../../screens';
import GooglePlaceSearcher from '../../screens/CreateReservationScreen/GooglePlaceSearcher';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = ({ route }) => {
  const { userProfile } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ title: userProfile === 'OWNER' ? 'Walkie Doggie' : 'Reservas recibidas' }}
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
          name="createReservation"
          component={CreateReservationScreen}
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
        <Stack.Screen
          name="rejectReservation"
          component={RejectReservationsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="programWalk"
          component={ProgramWalkScreen}
          options={{ headerShown: false }}
          initialParams={{
            userProfile,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
