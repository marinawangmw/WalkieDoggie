import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import MapViewWithOwners from '../../components/MapViewWithOwners';

const ChatScreen = () => {
  const owners = [
    {
      latlng: { latitude: -34.5985955, longitude: -58.4221275 },
      title: 'Ricardo Rubén',
      description: 'Av. Medrano 951',
    },
    {
      latlng: { latitude: -34.5837332, longitude: -58.4161273 },
      title: 'Guillermo Francella',
      description: 'Av. Raul Scalabrini Ortiz 2750',
    },
  ];
  const initialLocation = {
    latitude: -34.5847447,
    longitude: -58.3979724,
    description: 'Av. Del Libertador 2300',
  };
  return (
    <View style={styles.container}>
      <MapViewWithOwners owners={owners} initialLocation={initialLocation} />

      <Text>This is Chat!</Text>
    </View>
  );
};

export default ChatScreen;
