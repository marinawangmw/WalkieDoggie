import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import LocationOwnerSideComponent from 'components/LocationOwnerSide';
import { getPetWalkDetail } from 'services/api/rides/petWalks';
import { getReservations } from 'services/api/rides/reservations';
import { RESERVATION_STATUS } from 'utils/constants';
// eslint-disable-next-line import/no-unresolved
import { profileIcon, user, clock, priceIcon } from 'images';
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

  const dataRow = (title, content, icon) => (
    <View style={styles.dataRow}>
      <Image source={icon} style={styles.icon} />

      <View style={styles.textsContainer}>
        {!!title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );

  const renderPetwalkInfo = () => {
    if (petWalkData && ownerReservation) {
      return (
        <View style={styles.infoContainer}>
          {dataRow('', ownerReservation.pet.name, profileIcon)}
          {dataRow(
            'Tu paseador',
            petWalkData.walker.first_name + ' ' + petWalkData.walker.last_name,
            user,
          )}
          {dataRow('Duración del paseo', ownerReservation.duration, clock)}
          {dataRow('Precio del paseo', '$ ' + ownerReservation.total_price, priceIcon)}
        </View>
      );
    }
  };

  const renderMap = () => {
    return (
      <>
        {addressStart && ownerReservation && ownerMarkers && (
          <LocationOwnerSideComponent
            addressStart={addressStart}
            petWalkId={petWalkData.id}
            walker={petWalkData.walker}
            ownerMarkers={ownerMarkers}
          />
        )}
      </>
    );
  };

  const renderContent = () => {
    return (
      <>
        {renderMap()}
        {renderPetwalkInfo()}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={[]} renderItem={() => {}} ListHeaderComponent={renderContent} />
    </View>
  );
};

export default CurrentOwnerPetWalkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  titles: {
    fontSize: 16,
    color: '#000',
  },
  icon: {
    height: 20,
    width: 20,
    tintColor: '#212f3d',
  },
  dataRow: {
    padding: 10,
    paddingLeft: 30,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#e8e8e8',
    marginVertical: 5,
  },
  textsContainer: {
    paddingLeft: 20,
  },
  infoContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  title: {
    color: '#757575',
  },
  content: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3d3d3d',
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
