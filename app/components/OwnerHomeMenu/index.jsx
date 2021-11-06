import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { CustomButton } from 'components';
import HomeMenuItem from './HomeMenuItem';
import ConfirmBanner from './ConfirmBanner';
// eslint-disable-next-line import/no-unresolved
import { walker, shelter, petBoarding, colonies } from 'images';
import { getReservations } from 'services/api/rides/reservations';
import { handleReservationByOwner } from 'services/api/rides/petWalks';
import { RESERVATION_STATUS } from 'utils/constants';
import LoadingScreen from 'screens/LoadingScreen';
import moment from 'moment';

const OwnerHomeMenu = ({ navigation }) => {
  const [hasPendingWalks, setHasPendingWalks] = useState(false);
  const [pendingWalks, setPendingWalks] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const homeOptions = [
    { title: 'Paseadores', icon: walker, navigateTo: 'findWalker' },
    { title: 'Refugios', icon: shelter, navigateTo: 'findShelters' },
    { title: 'Guarderías', icon: petBoarding, navigateTo: 'findDayCares' },
    { title: 'Colonias', icon: colonies, navigateTo: 'findColonies' },
  ];

  const getReservationForOwner = async () => {
    try {
      const res = await getReservations({ status: RESERVATION_STATUS.ACCEPTED_BY_WALKER });

      if (res.result && res.data.length) {
        const validResults = res.data.filter((r) => !!r.pet_walk.id);

        if (validResults.length) {
          setHasPendingWalks(true);
          setPendingWalks(validResults);
        } else {
          setHasPendingWalks(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getReservationForOwner();
  }, []);

  const handleNext = () => {
    setVisible(true);
  };

  const onAccept = async (reservationId) => {
    try {
      setIsLoading(true);
      await handleReservationByOwner(reservationId, RESERVATION_STATUS.ACCEPTED_BY_OWNER);
      await getReservationForOwner();
      setIsLoading(false);
      setVisible(!visible);
    } catch (e) {
      console.log(e);
    }
  };

  const onReject = async (reservationId) => {
    try {
      setIsLoading(true);
      await handleReservationByOwner(reservationId, RESERVATION_STATUS.REJECTED_BY_OWNER);
      await getReservationForOwner();
      setIsLoading(false);
      setVisible(!visible);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleModalVisible = () => {
    setVisible(!visible);
  };

  const formatDate = (dateString) => {
    console.log(dateString);
    const momentDate = moment(dateString).utcOffset('-0300');
    return momentDate.format('DD-MM-YYYY');
  };

  const formatTime = (dateString) => {
    const momentTime = moment(dateString).utcOffset('-0300');
    return momentTime.format('HH:mm');
  };

  const card = (walk, idx) => {
    return (
      <View key={idx} style={styles.card}>
        <Text>
          <Text>El paseador </Text>
          <Text style={styles.bold}>
            {walk.walker.first_name} {walk.walker.last_name}
          </Text>
          <Text> programó un paseo para el día </Text>
          <Text style={styles.bold}> {formatDate(walk.pet_walk.start_date)}</Text>
          <Text> a las </Text>
          <Text style={styles.bold}>{formatTime(walk.pet_walk.start_date)}hs</Text>
          <Text>. Pasará a buscar a su/s mascota/s en la dirección </Text>
          <Text style={styles.bold}>{walk.address_start.description}</Text>
          <Text> Cualquier inquietud puede comunicarse con el paseador llamando al </Text>
          <Text style={styles.bold}>{walk.walker.phone}</Text>
        </Text>

        <View style={styles.btnContainer}>
          <CustomButton handleOnclick={() => onAccept(walk.id)} buttonLabel="Confirmar" />
          <CustomButton handleOnclick={() => onReject(walk.id)} buttonLabel="Rechazar" />
        </View>
      </View>
    );
  };

  const showModal = () => {
    return (
      <View style={styles.modalContainer}>
        <Modal
          hasBackdrop
          backdropOpacity={0.6}
          isVisible={visible}
          onBackdropPress={toggleModalVisible}
          animationInTiming={1}
          animationIn={'fadeIn'}
          animationOutTiming={1}
          animationOut={'fadeIn'}
        >
          <Pressable onPress={toggleModalVisible}>
            <Text style={styles.closeBtn}>x</Text>
          </Pressable>
          {pendingWalks.length > 2 ? (
            <ScrollView contentContainerStyle={styles.modal}>
              {pendingWalks.map((walk, idx) => card(walk, idx))}
            </ScrollView>
          ) : (
            <View style={styles.modal}>{pendingWalks.map((walk, idx) => card(walk, idx))}</View>
          )}
        </Modal>
      </View>
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      {visible && showModal()}
      {hasPendingWalks && (
        <ConfirmBanner
          title="Paseos pendientes de confirmación"
          description="¡Hola! Estos son los paseos programados que requieren tu confirmación"
          handleNext={handleNext}
        />
      )}
      <View style={styles.iconsContainer}>
        {homeOptions.map((option, idx) => (
          <HomeMenuItem menuItem={option} navigation={navigation} key={idx} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    position: 'absolute',
  },
  modal: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  card: {
    backgroundColor: '#f3f3f3',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  bold: {
    fontWeight: '700',
  },
  closeBtn: {
    color: 'white',
    fontSize: 25,
    alignSelf: 'flex-end',
  },
});
export default OwnerHomeMenu;
