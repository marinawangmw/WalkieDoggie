import React from 'react';
import { StyleSheet, View, Platform, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker, AnimatedRegion, MarkerAnimated } from 'react-native-maps';
import PubNub from 'pubnub';
import * as Location from 'expo-location';

// eslint-disable-next-line import/no-unresolved
import { PUBNUB_PUBLISH_KEY, PUBNUB_SUBSCRIBE_KEY } from 'react-native-dotenv';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const pubnub = new PubNub({
  publishKey: PUBNUB_PUBLISH_KEY,
  subscribeKey: PUBNUB_SUBSCRIBE_KEY,
});

let CHANNEL = 'location_walker';

export default class LocationWalkerSideComponent extends React.Component {
  constructor(props) {
    super(props);
    const { addressStart, petWalkId } = props;
    const initialWalkerLatitude = parseFloat(addressStart.latitude);
    const initialWalkerLongitude = parseFloat(addressStart.longitude);

    CHANNEL = `channel-pet-walk-${petWalkId}`;

    this.state = {
      latitude: initialWalkerLatitude,
      longitude: initialWalkerLongitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
      coordinate: new AnimatedRegion({
        latitude: initialWalkerLatitude,
        longitude: initialWalkerLongitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
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
      // console.log('Proceed to write Pubnub message', new Date(), message);

      pubnub.publish({
        message,
        channel: CHANNEL,
      });
    }
  }

  componentWillUnmount() {
    if (this.suscription) {
      this.suscription.remove();
    }
  }

  watchLocation = async () => {
    this.suscription = await Location.watchPositionAsync(
      {
        distanceInterval: 3,
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
    latitudeDelta: this.state.latitudeDelta,
    longitudeDelta: this.state.longitudeDelta,
  });

  onChangeRegion = (region) => {
    this.state.latitudeDelta = region.latitudeDelta;
    this.state.longitudeDelta = region.longitudeDelta;
  };

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
            onRegionChange={this.onChangeRegion}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.5,
  },
});
