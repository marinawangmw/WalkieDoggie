import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import LocationOwnerSideComponent from '../../components/LocationOwnerSide';
import { getPetWalkDetail } from '../../services/api/rides/petWalks';

const CurrentOwnerPetWalkScreen = ({ route, navigation }) => {
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
