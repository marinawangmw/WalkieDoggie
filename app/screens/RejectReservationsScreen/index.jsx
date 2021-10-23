import React from 'react';
import { View, Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { CustomButton } from 'components';
import { styles } from './styles';

const formatShowDateFromBE = (date) => {
  return date.slice(6, 8) + '-' + date.slice(4, 6) + '-' + date.slice(0, 4);
};

const RejectReservationsScreen = ({ route, navigation }) => {
  const { reservationsToReject } = route.params;

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

  const handleCancelRejection = () => {
    navigation.navigate('home');
  };

  const renderButtons = () => {
    return (
      <View style={styles.btnContainer}>
        <CustomButton handleOnclick={() => {}} buttonLabel="Aceptar" btnColor="#f4b445d9" />

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
    </SafeAreaView>
  );
};

export default RejectReservationsScreen;
