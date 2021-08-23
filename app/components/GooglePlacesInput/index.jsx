import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// eslint-disable-next-line import/no-unresolved
import { GOOGLE_MAPS_PLACES_API_KEY } from '@env';

const GooglePlacesInput = ({ setLat, setLong, setAddress }) => {
  const savePlaceData = (data, details) => {
    // setLat();
    // setLong();
    // setAddress();
    console.log('address 🥑', data.description);
    console.log('Info 🌶', details.geometry.location.lat, details.geometry.location.lng);
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Dirección"
        fetchDetails={true}
        query={{
          key: GOOGLE_MAPS_PLACES_API_KEY,
          language: 'es',
        }}
        onPress={(data, details = null) => savePlaceData(data, details)}
        onFail={(error) => console.error(error)}
        style={styles.placeInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ecf0f1',
    width: '100%',
    height: 500,
    zIndex: 10,
  },
});

export default GooglePlacesInput;
