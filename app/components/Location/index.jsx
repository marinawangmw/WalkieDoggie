import React from 'react';
import { StyleSheet, View, Platform, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import * as Location from 'expo-location';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -34.600047;
const LONGITUDE = -58.431491;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const pubnub = new PubNub({
  publishKey: 'pub-c-02ef8883-45bc-4b6a-87ca-8732a384e76e',
  subscribeKey: 'sub-c-e9bdffd2-15d2-11ec-9d3c-1ae560ca2970',
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

    // this.pubnub = new PubNubReact({
    //   publishKey: 'pub-c-02ef8883-45bc-4b6a-87ca-8732a384e76e',
    //   subscribeKey: 'sub-c-e9bdffd2-15d2-11ec-9d3c-1ae560ca2970',
    // });
    // this.pubnub.init(this);
  }

  componentDidMount() {
    this.watchLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.latitude !== prevState.latitude) {
      console.log('Proceed to write Pubnub', new Date(), this.state);
      pubnub.publish({
        message: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
        channel: 'location',
      }).then((response) => console.log('response pubnub', response));
    }
  }

  componentWillUnmount() {
    console.log('proceed to remove');
    this.suscription.remove();
  }

  watchLocation = async () => {
    const { coordinate } = this.state;
    this.suscription = await Location.watchPositionAsync(
      {
        distanceInterval: 2,
        accuracy: 5,
        timeInterval: 3000,
      },
      (position) => {
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };

        if (Platform.OS === 'android') {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(newCoordinate, 500); // 500 is the duration to animate the marker
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

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
            {/* <Marker.Animated
              ref={(marker) => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            /> */}
          </MapView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
