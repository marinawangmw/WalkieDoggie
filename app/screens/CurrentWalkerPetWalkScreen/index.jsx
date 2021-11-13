import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import { getPetWalkDetail } from '../../services/api/rides/petWalks';
import LocationWalkerSideComponent from '../../components/LocationWalkerSide';

const CurrentWalkerPetWalkScreen = ({ route, navigation }) => {
  const [petWalkData, setPetWalkData] = useState(null);
  const [addressStart, setAddressStart] = useState(null);

  useEffect(() => {
    const getPetWalkData = async () => {
      // TODO: reemplazar 82 por el id del paseo en curso correspondiente
      const response = await getPetWalkDetail(82);
      if (response.result) {
        setPetWalkData(response.data);
        setAddressStart(response.data.address_start);
      }
    };

    getPetWalkData();
  }, []);

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
