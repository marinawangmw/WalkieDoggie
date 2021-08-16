import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// eslint-disable-next-line import/no-unresolved
import { GOOGLE_MAPS_PLACES_API_KEY } from '@env';

const GooglePlacesInput = () => {
    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder="Dirección"
                fetchDetails={true}
                query={{
                    key: GOOGLE_MAPS_PLACES_API_KEY,
                    language: 'es',
                }}
                onPress={(data, details = null) => console.log(data, details)}
                onFail={(error) => console.error(error)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ecf0f1',
    },
});

export default GooglePlacesInput;