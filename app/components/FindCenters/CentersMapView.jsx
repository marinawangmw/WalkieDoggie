import React, { useState } from 'react';
import { StyleSheet, View, Platform, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker, AnimatedRegion, MarkerAnimated } from 'react-native-maps';

const CentersMapView = ({ center }) => {
  const {
    address: { description, latitude, longitude },
  } = center;
  const getMapRegion = () => {
    const LATITUDE_DELTA = 0.05;
    const LONGITUDE_DELTA = 0.1;

    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView style={styles.map} region={getMapRegion()}>
        <Marker
          coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }}
          title={center.name}
          description={description}
        />
      </MapView>
    </SafeAreaView>
  );
};

export default CentersMapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.5,
  },
});
