import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import LocationOwnerSideComponent from '../../components/LocationOwnerSide';
import { getPetWalkDetail } from '../../services/api/rides/petWalks';
import { getReservations } from '../../services/api/rides/reservations';
import { RESERVATION_STATUS } from '../../utils/constants';

const CurrentOwnerPetWalkScreen = ({ route, navigation }) => {
  const { petWalkId } = route.params;
  const [petWalkData, setPetWalkData] = useState(null);
  const [addressStart, setAddressStart] = useState(null);
  const [ownerReservation, setOwnerReservation] = useState(null);

  useEffect(() => {
    const getPetWalkData = async (id) => {
      const response = await getPetWalkDetail(id);

      // Obtengo la reserva del dueño en cuestión
      if (response.result) {
        const reservationResponse = await getReservations({
          status: RESERVATION_STATUS.ACCEPTED_BY_OWNER,
        });

        if (reservationResponse.result) {
          const reservation = reservationResponse.data.find((r) => r.pet_walk.id === id);
          setOwnerReservation(reservation);
        }

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

      {ownerReservation && (
        <View>
          <Text>Mascota: {ownerReservation.pet.name}</Text>
          <Text>Duración aprox. del paseo: {ownerReservation.duration}</Text>

          <Text>Precio del paseo: ${ownerReservation.total_price}</Text>
        </View>
      )}

      {addressStart && ownerReservation && (
        <LocationOwnerSideComponent
          addressStart={addressStart}
          petWalkId={petWalkData.id}
          walker={petWalkData.walker}
          ownerAddressStart={ownerReservation.address_start}
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
