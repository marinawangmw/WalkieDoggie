import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_PLACES_API_KEY } from 'react-native-dotenv';

const GooglePlacesInput = ({ setLat, setLong, setAddress, signupData, navigation }) => {
  console.log(GOOGLE_MAPS_PLACES_API_KEY);

  const savePlaceData = (data, details) => {
    const lat = details.geometry.location.lat.toString();
    const long = details.geometry.location.lng.toString();
    const address = data.description;

    setLat(lat);
    setLong(long);
    setAddress(address);

    if (signupData.type === 'OWNER') {
      navigation.navigate('OwnerOnboarding', { address, long, lat, signupData });
    } else {
      navigation.navigate('WalkerOnboarding', { address, long, lat, signupData });
    }
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Ingrese su dirección"
        fetchDetails
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
    marginVertical: 20,
    padding: 10,
    width: '100%',
    height: 300,
    zIndex: 10,
  },
});

export default GooglePlacesInput;
