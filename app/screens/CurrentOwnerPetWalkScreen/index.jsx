import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import LocationOwnerSideComponent from '../../components/LocationOwnerSide';
import { getPetWalkDetail } from '../../services/api/rides/petWalks';
import { getReservations } from '../../services/api/rides/reservations';
import { RESERVATION_STATUS } from '../../utils/constants';
import _ from 'lodash';

const CurrentOwnerPetWalkScreen = ({ route, navigation }) => {
  const { petWalkId } = route.params;
  const [petWalkData, setPetWalkData] = useState(null);
  const [addressStart, setAddressStart] = useState(null);
  const [ownerReservation, setOwnerReservation] = useState(null);
  const [ownerMarkers, setOwnerMarkers] = useState(null);

  useEffect(() => {
    const getPetWalkData = async (id) => {
      const response = await getPetWalkDetail(id);

      // Obtengo la reserva del dueño en cuestión
      if (response.result) {
        const reservationResponse = await getReservations({
          status: RESERVATION_STATUS.ACCEPTED_BY_OWNER,
          pet_walk_id: id,
        });

        if (reservationResponse.result) {
          const reservation = reservationResponse.data[0];
          setOwnerReservation(reservation);

          // Chequeo si el punto de partida es el mismo que el de recogida
          const buildedOwnerMarkers = buildOwnerMarkers(reservation);
          setOwnerMarkers(buildedOwnerMarkers);
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

      {addressStart && ownerReservation && ownerMarkers && (
        <LocationOwnerSideComponent
          addressStart={addressStart}
          petWalkId={petWalkData.id}
          walker={petWalkData.walker}
          ownerMarkers={ownerMarkers}
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

const buildOwnerMarkers = (reservation) => {
  const { address_start, address_end } = reservation;

  let ownerMarkers = [];
  if (_.isEqual(address_start, address_end)) {
    ownerMarkers = [
      {
        latlng: {
          latitude: parseFloat(address_start.latitude),
          longitude: parseFloat(address_start.longitude),
        },
        title: 'Yo',
        description: address_start.description,
      },
    ];
  } else {
    ownerMarkers = [
      {
        latlng: {
          latitude: parseFloat(address_start.latitude),
          longitude: parseFloat(address_start.longitude),
        },
        title: 'Punto de recodiga',
        description: address_start.description,
      },
      {
        latlng: {
          latitude: parseFloat(address_end.latitude),
          longitude: parseFloat(address_end.longitude),
        },
        title: 'Punto de entrega',
        description: address_end.description,
      },
    ];
  }

  return ownerMarkers;
};
