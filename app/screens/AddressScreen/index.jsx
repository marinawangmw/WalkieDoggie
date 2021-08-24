import React from 'react';
import { Button, View } from 'react-native';
import { useState } from 'react/cjs/react.development';
import { Logo, GooglePlacesInput } from '../../components';
import styles from './styles';

const AdressScreen = ({ navigation }) => {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [address, setAddress] = useState('');

  const handleOnclick = () => {
    // evaluar type user
    navigation.navigate('OwnerOnboarding');
    // pasar datos { lat, long, address }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.placeInput}>
        <GooglePlacesInput setLat={setLat} setLong={setLong} setAddress={setAddress} />
      </View>
      <Button onPress={() => handleOnclick()} title="Siguiente" color="#841584" />
    </View>
  );
};

export default AdressScreen;
