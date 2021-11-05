import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { CustomButton } from 'components';
import HomeMenuItem from './HomeMenuItem';
import ConfirmBanner from './ConfirmBanner';
// eslint-disable-next-line import/no-unresolved
import { walker, shelter, petBoarding, colonies } from 'images';
import { getPetWalks } from 'services/api/rides/petWalks';
import { RESERVATION_STATUS } from 'utils/constants';

const fakeData = [
  {
    address_start: {
      description: 'Avenida Nazca 444, Buenos Aires, Argentina',
      id: 61,
      latitude: '-34.62705399999999',
      longitude: '-58.471435',
    },
    start_date: '2021-10-20T12:00:00.000Z',
    status: 'PENDING',
    walker: {
      email: 'toto@gmail.com',
      first_name: 'Tomas',
      id: 6,
      last_name: 'Janin',
      phone: '1155691387',
    },
  },
  {
    address_start: {
      description: 'Avenida Nazca 444, Buenos Aires, Argentina',
      id: 62,
      latitude: '-34.62705399999999',
      longitude: '-58.471435',
    },
    start_date: '2021-10-20T12:00:00.000Z',
    status: 'PENDING',
    walker: {
      email: 'toto@gmail.com',
      first_name: 'Tomas',
      id: 6,
      last_name: 'Janin',
      phone: '1155691387',
    },
  },
  {
    address_start: {
      description: 'Avenida Nazca 444, Buenos Aires, Argentina',
      id: 62,
      latitude: '-34.62705399999999',
      longitude: '-58.471435',
    },
    start_date: '2021-10-20T12:00:00.000Z',
    status: 'PENDING',
    walker: {
      email: 'toto@gmail.com',
      first_name: 'Tomas',
      id: 6,
      last_name: 'Janin',
      phone: '1155691387',
    },
  },
  {
    address_start: {
      description: 'Avenida Nazca 444, Buenos Aires, Argentina',
      id: 62,
      latitude: '-34.62705399999999',
      longitude: '-58.471435',
    },
    start_date: '2021-10-20T12:00:00.000Z',
    status: 'PENDING',
    walker: {
      email: 'toto@gmail.com',
      first_name: 'Tomas',
      id: 6,
      last_name: 'Janin',
      phone: '1155691387',
    },
  },
];
const OwnerHomeMenu = ({ navigation }) => {
  const [hasPendingWalks, setHasPendingWalks] = useState(false);
  const [pendingWalks, setPendingWalks] = useState(null);
  const [visible, setVisible] = useState(false);

  const homeOptions = [
    { title: 'Paseadores', icon: walker, navigateTo: 'findWalker' },
    { title: 'Refugios', icon: shelter, navigateTo: 'findShelters' },
    { title: 'Guarderías', icon: petBoarding, navigateTo: 'findDayCares' },
    { title: 'Colonias', icon: colonies, navigateTo: 'findColonies' },
  ];

  useEffect(() => {
    const getReservationForOwner = async () => {
      try {
        const res = await getPetWalks(RESERVATION_STATUS.PENDING);

        if (res.result && res.data.length) {
          setHasPendingWalks(true);
          setPendingWalks(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getReservationForOwner();
  }, []);

  const handleNext = () => {
    setVisible(true);
  };

  const onAccept = () => {
    setVisible(!visible);
  };

  const onReject = () => {
    setVisible(!visible);
  };

  const toggleModalVisible = () => {
    setVisible(!visible);
  };

  const formatDate = (dateString) => {
    return dateString.slice(8, 10) + dateString.slice(4, 8) + dateString.slice(0, 4);
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
          <Text style={styles.bold}> {formatDate(walk.start_date.slice(0, 10))}</Text>
          <Text> a las </Text>
          <Text style={styles.bold}>{walk.start_date.slice(11, 16)}hs</Text>
          <Text>. Pasará a buscar a su/s mascota/s en la dirección </Text>
          <Text style={styles.bold}>{walk.address_start.description}</Text>
          <Text> Cualquier inquietud puede comunicarse con el paseador llamando al </Text>
          <Text style={styles.bold}>{walk.walker.phone}</Text>
        </Text>

        <View style={styles.btnContainer}>
          <CustomButton handleOnclick={() => onAccept()} buttonLabel="Confirmar" />
          <CustomButton handleOnclick={() => onReject()} buttonLabel="Rechazar" />
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
            <Text style={{ color: 'white', fontSize: 25, alignSelf: 'flex-end' }}>x</Text>
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
});
export default OwnerHomeMenu;
