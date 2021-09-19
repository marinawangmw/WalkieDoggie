import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { ProfileScreen } from '../../screens';
import PetDetail from '../../screens/ProfileScreen/PetDetail';
import Ranges from '../../screens/ProfileScreen/Ranges';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="petDetail" component={PetDetail} options={{ title: 'Editar mascota' }} />
      <Stack.Screen
        name="walkerRanges"
        component={Ranges}
        options={{ title: 'Editar franjas horarias' }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
