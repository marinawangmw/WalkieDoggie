import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getPetWalkDetail } from '../../services/api/rides/petWalks';
import LocationWalkerSideComponent from '../../components/LocationWalkerSide';

const CurrentWalkerPetWalkScreen = ({ route, navigation }) => {
  const { petWalkId } = route.params;
  const [petWalkData, setPetWalkData] = useState(null);
  const [addressStart, setAddressStart] = useState(null);

  useEffect(() => {
    const getPetWalkData = async (id) => {
      const response = await getPetWalkDetail(id);
      if (response.result) {
        setPetWalkData(response.data);
        setAddressStart(response.data.address_start);
      }
    };

    if (petWalkId) {
      getPetWalkData(petWalkId);
    }
  }, [petWalkId]);

  return (
    <View style={styles.container}>
      {addressStart && (
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
