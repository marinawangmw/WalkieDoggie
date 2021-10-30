import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { CustomButton } from 'components';
import { styles } from './styles';
import { rejectReservations } from 'services/api/rides/petWalks';
import Toast from 'react-native-toast-message';

const formatShowDateFromBE = (date) => {
  return date.slice(6, 8) + '-' + date.slice(4, 6) + '-' + date.slice(0, 4);
};

const RejectReservationsScreen = ({ route, navigation }) => {
  const { reservationsToReject } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const handleRejectReservation = async () => {
    setIsLoading(true);

    const reservationIds = reservationsToReject.map((resItem) => resItem.id);
    const res = await rejectReservations(reservationIds);
    setIsLoading(false);
    console.log(res);

    if (res) {
      navigation.navigate('home');
      Toast.show({
        type: 'success',
        text1: 'Yey!',
        text2: 'Se rechazó la reserva con éxitos',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Oops!',
        text2: 'Algo anduvo mal',
      });
    }
  };

  const handleCancelRejection = () => {
    navigation.navigate('home');
  };

  const reservationsList = () => {
    return reservationsToReject.map((item, idx) => (
      <View style={styles.data} key={idx}>
        <View style={styles.dataContainer}>
          <View style={styles.details}>
            <Text style={styles.reservationTitle}>{item.pet.name}</Text>
            <Text style={styles.reservationItem}>Dueño: {item.owner.first_name}</Text>
            <Text style={styles.reservationItem}>
              Fecha de paseo: {formatShowDateFromBE(item.reservationDate)}
            </Text>
            <Text style={styles.reservationItem}>Tiempo de paseo: {item.duration} minutos</Text>
            <Text style={styles.reservationItem}>
              Dirección de Partida: {item.addressStart.description}
            </Text>
            <Text style={styles.reservationItem}>
              Dirección de Entrega: {item.addressEnd.description}
            </Text>
            <Text style={styles.reservationItem}>Observaciones: {item.observations}</Text>
          </View>
        </View>
      </View>
    ));
  };

  const renderButtons = () => {
    return (
      <View style={styles.btnContainer}>
        <CustomButton
          handleOnclick={handleRejectReservation}
          buttonLabel="Aceptar"
          btnColor="#f4b445d9"
        />

        <CustomButton
          handleOnclick={handleCancelRejection}
          buttonLabel="Cancelar"
          btnColor="#757575d9"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>¿Está seguro de que quiere rechazar las siguientes reservas?</Text>
      {reservationsList()}
      {renderButtons()}
      {isLoading && <ActivityIndicator size="large" color="#f8b444" />}
    </SafeAreaView>
  );
};

export default RejectReservationsScreen;
