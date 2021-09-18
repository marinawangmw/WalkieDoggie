import React from 'react';
import { StyleSheet, View, Platform, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker, AnimatedRegion, MarkerAnimated } from 'react-native-maps';
import PubNub from 'pubnub';
import * as Location from 'expo-location';

// eslint-disable-next-line import/no-unresolved
import { PUBNUB_PUBLISH_KEY, PUBNUB_SUBSCRIBE_KEY } from '@env';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -34.6356109;
const LONGITUDE = -58.366945;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const pubnub = new PubNub({
  publishKey: PUBNUB_PUBLISH_KEY,
  subscribeKey: PUBNUB_SUBSCRIBE_KEY,
});

export default class LocationComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    };

  }

  componentDidMount() {
    this.watchLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.latitude !== prevState.latitude) {
      const message = {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      };
      console.log('Proceed to write Pubnub message', new Date(), message);

      pubnub.publish({
        message,
        channel: 'location',
      });
    }
  }

  componentWillUnmount() {
    console.log('Proceed to remove subscription');
    this.suscription.remove();
  }

  watchLocation = async () => {
    // const { coordinate } = this.state;
    this.suscription = await Location.watchPositionAsync(
      {
        distanceInterval: 5,
        accuracy: Location.Accuracy.Highest,
        timeInterval: 3000,
      },
      (position) => {
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };

        // if (Platform.OS === 'android') {
        //   if (this.marker) {
        //     console.log('change marker to', newCoordinate);
        //     this.marker.animateMarkerToCoordinate(newCoordinate, 500); // 500 is the duration to animate the marker
        //   }
        // } else {
        //   coordinate.timing(newCoordinate).start();
        // }

        this.state.coordinate = newCoordinate;

        this.setState({
          latitude,
          longitude,
        });
      },
    );
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={this.getMapRegion()}
          >
            <MarkerAnimated
              ref={(marker) => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            />
          </MapView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
