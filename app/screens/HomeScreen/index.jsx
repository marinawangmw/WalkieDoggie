import React from 'react';
import { View, Text } from 'react-native';
import LocationComponent from '../../components/Location';
import styles from './styles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is Home!</Text>
      <LocationComponent> </LocationComponent>
    </View>
  );
};

export default HomeScreen;
