import React from 'react';
import { StyleSheet, View, Platform, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker, AnimatedRegion, MarkerAnimated } from 'react-native-maps';

const MapViewWithOwners = ({ owners, initialLocation }) => {
  const { latitude, longitude, description } = initialLocation;
  const getMapRegion = () => ({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView style={styles.map} region={getMapRegion()}>
          <Marker
            coordinate={initialLocation}
            title="Lugar de inicio"
            description={description}
            pinColor={'green'}
          />
          {owners.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default MapViewWithOwners;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.5,
  },
});
