import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_PLACES_API_KEY } from 'react-native-dotenv';

const defaultPlaceholderText = 'Ingrese su dirección';

const GooglePlacesInput = ({
  setLat,
  setLong,
  setAddress,
  signupData,
  navigation,
  customStyles = {},
  disabled,
  placeholder = defaultPlaceholderText,
}) => {
  const styles = { ...defaultStyles, ...customStyles };
  const savePlaceData = (data, details) => {
    const lat = details.geometry.location.lat.toString();
    const long = details.geometry.location.lng.toString();
    const address = data.description;

    setLat(lat);
    setLong(long);
    setAddress(address);

    if (signupData && signupData.type === 'OWNER') {
      navigation.navigate('OwnerOnboarding', { address, long, lat, signupData });
    }
    if (signupData && signupData.type === 'WALKER') {
      navigation.navigate('WalkerOnboarding', { address, long, lat, signupData });
    }

    return { address, long, lat };
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        fetchDetails
        query={{
          key: GOOGLE_MAPS_PLACES_API_KEY,
          language: 'es',
        }}
        onPress={(data, details = null) => savePlaceData(data, details)}
        onFail={(error) => console.error(error)}
        style={styles.placeInput}
        textInputHide={disabled}
      />
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 10,
    width: '100%',
    height: 300,
    zIndex: 10,
  },
});

export default GooglePlacesInput;
