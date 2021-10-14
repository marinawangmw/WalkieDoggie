import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { FindComplaintsScreen, ComplaintScreen, CreateComplaintScreen } from 'screens';
import CreateFiles from 'screens/CreateComplaintScreen/Files';
import SeeFiles from 'screens/ComplaintScreen/Files';

const Stack = createNativeStackNavigator();

const ComplaintsStackNavigator = ({ route }) => {
  const { userProfile } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="findComplaints"
        component={FindComplaintsScreen}
        options={{ title: 'Denuncias', headerBackTitle: '' }}
      />
      <Stack.Screen
        name="complaint"
        component={ComplaintScreen}
        options={{ title: '', headerBackTitle: '' }}
      />
      <Stack.Screen
        name="createComplaint"
        component={CreateComplaintScreen}
        options={{ title: 'Crear denuncia', headerBackTitle: '' }}
      />
      <Stack.Screen
        name="complaintFiles"
        component={CreateFiles}
        options={{ title: 'Subir archivos' }}
      />
      <Stack.Screen name="seeComplaintFiles" component={SeeFiles} options={{ title: 'Archivos' }} />
    </Stack.Navigator>
  );
};

export default ComplaintsStackNavigator;
