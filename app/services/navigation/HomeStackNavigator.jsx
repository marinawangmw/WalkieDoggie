import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import {
  HomeScreen,
  FindWalkersScreen,
  ProfileScreen,
  CreateReservationScreen,
  RejectReservationsScreen,
  ProgramWalkScreen,
  CenterDetailsScreen,
  FindColoniesScreen,
  FindDayCaresScreen,
  FindSheltersScreen,
} from 'screens';
import GooglePlaceSearcher from 'screens/CreateReservationScreen/GooglePlaceSearcher';
import WalkerReviewsScreen from 'screens/ProfileScreen/reviews';
import CurrentOwnerPetWalkScreen from 'screens/CurrentOwnerPetWalkScreen';
import CurrentWalkerPetWalkScreen from 'screens/CurrentWalkerPetWalkScreen';
import PaymentScreen from '../../screens/PaymentScreen';
import {ReviewScreen} from "../../screens";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = ({ route }) => {
  const { userProfile } = route.params;

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            title: userProfile.type === 'OWNER' ? 'Walkie Doggie' : 'Reservas recibidas',
          }}
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
          name="findDayCares"
          component={FindDayCaresScreen}
          options={{ title: 'Guarderías', headerBackTitle: '' }}
        />
        <Stack.Screen
          name="findShelters"
          component={FindSheltersScreen}
          options={{ title: 'Refugios', headerBackTitle: '' }}
        />
        <Stack.Screen
          name="findColonies"
          component={FindColoniesScreen}
          options={{ title: 'Colonias', headerBackTitle: '' }}
        />
        <Stack.Screen
          name="centerDetails"
          component={CenterDetailsScreen}
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
        <Stack.Screen
          name="walkerReviews"
          component={WalkerReviewsScreen}
          options={{ title: 'Calificaciones' }}
        />
      </Stack.Group>
      <Stack.Screen
        name="currentOwnerPetWalk"
        component={CurrentOwnerPetWalkScreen}
        options={{ title: 'Paseo en curso' }}
      />
      <Stack.Screen
        name="currentWalkerPetWalk"
        component={CurrentWalkerPetWalkScreen}
        options={{ title: 'Tu paseo en curso' }}
      />

      <Stack.Screen
        name="paymentScreen"
        component={PaymentScreen}
        options={{ title: 'Pago del paseo' }}
      />

      <Stack.Screen
        name="reviewScreen"
        component={ReviewScreen}
        options={{ title: 'Calificación del paseo' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
