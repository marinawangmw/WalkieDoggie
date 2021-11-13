import React from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import MapView, { AnimatedRegion, MarkerAnimated } from 'react-native-maps';
import PubNub from 'pubnub';

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

export default class LocationOwnerSideComponent extends React.Component {
  constructor(props) {
    super(props);
    const { addressStart, petWalkId, walker } = props;
    const initialWalkerLatitude = parseFloat(addressStart.latitude);
    const initialWalkerLongitude = parseFloat(addressStart.longitude);

    CHANNEL = `channel-pet-walk-${petWalkId}`;

    this.state = {
      latitude: initialWalkerLatitude,
      longitude: initialWalkerLongitude,
      markerDescription: `Paseador: ${walker.first_name} ${walker.last_name}`,
      coordinate: new AnimatedRegion({
        latitude: initialWalkerLatitude,
        longitude: initialWalkerLongitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    };
  }

  componentDidMount() {
    this.subscribeToPubNub();
  }

  subscribeToPubNub = () => {
    pubnub.subscribe({
      channels: [CHANNEL],
      withPresence: true,
    });

    let self = this;

    pubnub.addListener({
      message: function (obj) {
        const { latitude, longitude } = obj.message;
        const newCoordinate = { latitude, longitude };
        self.state.coordinate = newCoordinate;

        self.setState({
          latitude,
          longitude,
        });
      },
    });
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
              description={this.state.markerDescription}
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
