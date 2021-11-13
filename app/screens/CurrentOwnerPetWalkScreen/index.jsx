import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import LocationOwnerSideComponent from '../../components/LocationOwnerSide';
import { getPetWalkDetail } from '../../services/api/rides/petWalks';

const CurrentOwnerPetWalkScreen = ({ route, navigation }) => {
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
      {petWalkData && (
        <View>
          <Text style={styles.titles}>
            Tenés un paseo en curso con: {petWalkData.walker.first_name}{' '}
            {petWalkData.walker.last_name}
          </Text>

          <Text style={styles.titles}>
            Podes seguir la ubicación de tu mascota en tiempo real!!
          </Text>
        </View>
      )}

      {addressStart && (
        <LocationOwnerSideComponent
          addressStart={addressStart}
          petWalkId={petWalkData.id}
          walker={petWalkData.walker}
        />
      )}
    </View>
  );
};

export default CurrentOwnerPetWalkScreen;

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
