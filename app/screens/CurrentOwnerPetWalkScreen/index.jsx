import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import LocationOwnerSideComponent from 'components/LocationOwnerSide';
import { getPetWalkDetail } from 'services/api/rides/petWalks';
import { getReservations } from 'services/api/rides/reservations';
import { RESERVATION_STATUS } from 'utils/constants';
// eslint-disable-next-line import/no-unresolved
import { profileIcon, user, clock, priceIcon } from 'images';

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
          console.log('reservation', reservation);
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
        {addressStart && ownerReservation && (
          <LocationOwnerSideComponent
            addressStart={addressStart}
            petWalkId={petWalkData.id}
            walker={petWalkData.walker}
            ownerAddressStart={ownerReservation.address_start}
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
      {/* {petWalkData && (
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
      )} */}
      <FlatList data={[]} renderItem={() => {}} ListHeaderComponent={renderContent} />
    </View>
  );
};

export default CurrentOwnerPetWalkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
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
