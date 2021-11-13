import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { PaymentScreen, ReviewScreen } from 'screens';
import CreateFiles from 'screens/CreateComplaintScreen/Files';

const Stack = createNativeStackNavigator();

const PaymentStackNavigator = ({ route }) => {
  const { userProfile } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="payment"
        component={PaymentScreen}
        options={{ title: 'Pago', headerBackTitle: '' }}
      />
      <Stack.Screen
        name="review"
        component={ReviewScreen}
        options={{ title: 'Calificación', headerBackTitle: '' }}
      />
    </Stack.Navigator>
  );
};

export default PaymentStackNavigator;
