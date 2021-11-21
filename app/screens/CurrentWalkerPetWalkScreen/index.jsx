import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getPetWalkDetail } from '../../services/api/rides/petWalks';
import LocationWalkerSideComponent from '../../components/LocationWalkerSide';

const CurrentWalkerPetWalkScreen = ({ route, navigation }) => {
  const { petWalkId } = route.params;
  const [petWalkData, setPetWalkData] = useState(null);
  const [addressStart, setAddressStart] = useState(null);
  const [walkerAllowsTracking, setWalkerAllowsTracking] = useState(true);

  useEffect(() => {
    const getPetWalkData = async (id) => {
      const response = await getPetWalkDetail(id);
      if (response.result) {
        setPetWalkData(response.data);
        setAddressStart(response.data.address_start);
        setWalkerAllowsTracking(response.data.walker.allows_tracking);
      }
    };

    if (petWalkId) {
      getPetWalkData(petWalkId);
    }
  }, [petWalkId]);

  return (
    <View style={styles.container}>
      {!walkerAllowsTracking && <Text>Tenés la ubicación en tiempo real desactivada!</Text>}
      {addressStart && walkerAllowsTracking && (
        <LocationWalkerSideComponent addressStart={addressStart} petWalkId={petWalkData.id} />
      )}
    </View>
  );
};

export default CurrentWalkerPetWalkScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  titles: {
    fontSize: 16,
    color: '#000',
  },
});
