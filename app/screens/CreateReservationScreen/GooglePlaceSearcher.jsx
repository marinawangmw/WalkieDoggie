import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesInput, CustomButton } from 'components';

const GooglePlaceSearcher = ({ route, navigation }) => {
  const { placeholder, key, nextScreen } = route.params;
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [description, setDescription] = useState(null);

  const handleSave = () => {
    navigation.navigate(nextScreen, {
      key,
      address: {
        description,
        lat,
        long,
      },
    });
  };

  return (
    <View style={styles.container}>
      <GooglePlacesInput
        setLat={setLat}
        setLong={setLong}
        setAddress={setDescription}
        placeholder={placeholder}
      />
      <CustomButton handleOnclick={handleSave} buttonLabel="Guardar" centered />
    </View>
  );
};

export default GooglePlaceSearcher;

const styles = StyleSheet.create({
  container: {
    height: 400,
  },
});
