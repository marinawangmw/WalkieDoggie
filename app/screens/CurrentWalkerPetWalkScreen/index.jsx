import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getPetWalkDetail } from 'services/api/rides/petWalks';
import { LocationWalkerSideComponent, PetWalkInstructionsList } from 'components';
import _ from 'lodash';
import { getReservations } from '../../services/api/rides/reservations';
import { RESERVATION_STATUS } from '../../utils/constants';

const CurrentWalkerPetWalkScreen = ({ route, navigation }) => {
  const { petWalkId, setHasPetWalkStarted } = route.params;
  const [petWalkData, setPetWalkData] = useState(null);
  const [addressStart, setAddressStart] = useState(null);
  const [walkerAllowsTracking, setWalkerAllowsTracking] = useState(true);
  const [ownersMarkers, setOwnersMarkers] = useState(null);

  const getPetWalkData = async (id) => {
    const response = await getPetWalkDetail(id);
    if (response.result) {
      // Obtengo las reservas del paseo en cuestión
      const reservationResponse = await getReservations({
        status: RESERVATION_STATUS.ACCEPTED_BY_OWNER,
        pet_walk_id: id,
      });

      if (reservationResponse.result && reservationResponse.data.length > 0) {
        const buildedOwnerMarkers = buildOwnersMarkers(reservationResponse.data);
        setOwnersMarkers(buildedOwnerMarkers);
      }

      setPetWalkData(response.data);
      setAddressStart(response.data.address_start);
      setWalkerAllowsTracking(response.data.walker.allows_tracking);
    }
  };

  useEffect(() => {
    if (petWalkId) {
      getPetWalkData(petWalkId);
    }
  }, [petWalkId]);

  const renderPetwalkInfo = () => {
    if (petWalkData) {
      return (
        <View style={styles.infoContainer}>
          <PetWalkInstructionsList
            petWalkId={petWalkData.id}
            data={petWalkData.instructions}
            getData={getPetWalkData}
            setHasPetWalkStarted={setHasPetWalkStarted}
            navigation={navigation}
          />
        </View>
      );
    }
  };

  const renderMap = () => {
    if (addressStart && walkerAllowsTracking && ownersMarkers) {
      return (
        <LocationWalkerSideComponent
          addressStart={addressStart}
          petWalkId={petWalkData.id}
          ownersMarkers={ownersMarkers}
        />
      );
    } else if (!walkerAllowsTracking) {
      return <Text>Tenés la ubicación en tiempo real desactivada!</Text>;
    }
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

export default CurrentWalkerPetWalkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  titles: {
    fontSize: 16,
    color: '#000',
  },
  infoContainer: {
    padding: 20,
  },
});

const buildOwnersMarkers = (reservations) => {
  let ownerMarkers = [];

  reservations.forEach((reserv) => {
    const { address_start, address_end, owner } = reserv;
    if (_.isEqual(address_start, address_end)) {
      ownerMarkers.push({
        latlng: {
          latitude: parseFloat(address_start.latitude),
          longitude: parseFloat(address_start.longitude),
        },
        title: `${owner.first_name} ${owner.last_name}`,
        description: address_start.description,
        pinColor: 'green',
      });
    } else {
      ownerMarkers.push({
        latlng: {
          latitude: parseFloat(address_start.latitude),
          longitude: parseFloat(address_start.longitude),
        },
        title: `PARTIDA - ${owner.first_name} ${owner.last_name}`,
        description: address_start.description,
        pinColor: 'green',
      });

      ownerMarkers.push({
        latlng: {
          latitude: parseFloat(address_end.latitude),
          longitude: parseFloat(address_end.longitude),
        },
        title: `ENTREGA - ${owner.first_name} ${owner.last_name}`,
        description: address_end.description,
        pinColor: 'blue',
      });
    }
  });

  return ownerMarkers;
};
