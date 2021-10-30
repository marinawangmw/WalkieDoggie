import React from 'react';
import { StyleSheet, View, Platform, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker, AnimatedRegion, MarkerAnimated, Polyline } from 'react-native-maps';

const MapViewWithOwners = ({ owners, initialLocation }) => {
  const { latitude, longitude, description } = initialLocation;
  const getMapRegion = () => ({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.3,
    longitudeDelta: 0.2,
  });

  const addresses = [initialLocation, ...owners.map((o) => o.latlng)];
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MapView style={styles.map} region={getMapRegion()}>
          <Marker
            coordinate={initialLocation}
            title="Punto de partida"
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
          <Polyline coordinates={addresses} strokeWidth={4} lineDashPattern={[1]} />
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
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.5,
  },
});
