import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  CheckBox,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CustomButton } from 'components';
import { styles } from './styles';
// eslint-disable-next-line import/no-unresolved
import { clock } from 'images';
import { formatReservationsDataForMapView } from 'utils/helperFuncions';
import MapViewWithOwners from 'components/MapViewWithOwners';
import { createPetWalk } from 'services/api/rides/petWalks';
import Toast from 'react-native-toast-message';

const title = 'Programar paseo para el día ';
const startTimeTitle = 'Seleccione un horario de inicio';
const startAddressTitle = 'Seleccione un lugar de inicio';

const formatTime = (time) => {
  let currentHours = time.getHours();
  currentHours = ('0' + currentHours).slice(-2);
  let currentMinutes = time.getMinutes();
  currentMinutes = ('0' + currentMinutes).slice(-2);
  const formatHour = currentHours + ':' + currentMinutes;
  return formatHour;
};

const ProgramWalkScreen = ({ route, navigation }) => {
  const initialDate = useMemo(() => {
    return new Date('2021-10-20T12:00:00.00');
  }, []);

  const [reservations, setReservations] = useState(null);
  const [userData, setUserData] = useState(null);
  const [startTime, setStartTime] = useState(initialDate);
  const [showStartTime, setShowStartTime] = useState(false);
  const [startAddress, setStartAddress] = useState(null);
  const [startLat, setStartLat] = useState(null);
  const [startLong, setStartLong] = useState(null);
  const [startSameHome, setStartSameHome] = useState(false);
  const [ownersToPickup, setOwnersToPickup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (route.params) {
      const { address, reservationsToProgram, userProfile } = route.params;

      if (reservationsToProgram && userProfile) {
        const dataForMapView = formatReservationsDataForMapView(reservationsToProgram);
        setOwnersToPickup(dataForMapView);
        setReservations(reservationsToProgram);
        setUserData(userProfile);
      }

      if (address) {
        setStartAddress(address.description);
        setStartLat(address.lat);
        setStartLong(address.long);
      }
    }
  }, [route]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const reservationIds = reservations.map((r) => r.id);
    const addressStart = {
      latitude: startLat,
      longitude: startLong,
      description: startAddress,
    };

    try {
      const res = await createPetWalk(startTime, addressStart, reservationIds);
      setIsLoading(false);
      if (res.result) {
        Toast.show({
          type: 'success',
          text1: 'Bien!',
          text2: 'El paseo se ha programado con éxito.',
        });
        navigation.navigate('home');
      } else {
        setErrorMessage('Oops, algo anduvo mal');
      }
    } catch (error) {
      setErrorMessage('Oops, algo anduvo mal');
      console.log(error);
    }
  };

  const onCheckStartSameHome = () => {
    setStartSameHome(!startSameHome);
    setStartLat(userData.address.latitude);
    setStartLong(userData.address.longitude);
    setStartAddress(userData.address.description);
  };

  const handleNavigatePlaceSearch = (key) => {
    navigation.navigate('googlePlaceSearcher', {
      key,
      placeholder: 'Ingrese una dirección',
      nextScreen: 'programWalk',
    });
  };

  const formatShowDateFromBE = (dateToFormat) => {
    return (
      dateToFormat.slice(6, 8) + '-' + dateToFormat.slice(4, 6) + '-' + dateToFormat.slice(0, 4)
    );
  };

  const onChangeTimePick = (_event, selectedTime) => {
    if (selectedTime) {
      setShowStartTime(false);
      setStartTime(selectedTime);
    }
  };

  const startTimePicker = () => {
    return (
      <View style={styles.data}>
        <Text style={styles.dataTitle}>{startTimeTitle}</Text>
        <View style={styles.dataContainer}>
          <TouchableOpacity style={styles.pressable} onPress={() => setShowStartTime(true)}>
            <Image source={clock} style={styles.icon} />
            <Text>{startTime.toLocaleTimeString().slice(0, 5)}</Text>
          </TouchableOpacity>
          {showStartTime && (
            <DateTimePicker
              value={startTime}
              mode="time"
              display="default"
              is24Hour
              onChange={onChangeTimePick}
              locale="es-AR"
            />
          )}
        </View>
      </View>
    );
  };

  const startAddressInput = () => {
    return (
      <View style={styles.data}>
        <Text style={styles.dataTitle}>Punto de partida</Text>
        <View style={styles.titleRow}>
          <CheckBox
            value={startSameHome}
            onValueChange={onCheckStartSameHome}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>
            Seleccionar: &quot;{userData && userData.address.description}&quot; ?
          </Text>
        </View>
        <TouchableOpacity
          style={styles.dataContainer}
          onPress={() => handleNavigatePlaceSearch(null)}
          disabled={startSameHome}
        >
          <Text style={styles.dataContent}>{startAddress ? startAddress : startAddressTitle}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderOwnersList = () => {
    if (reservations) {
      return reservations.map((item, idx) => (
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
    }
  };

  const renderMapView = () => {
    const initialLocation = {
      latitude: parseFloat(startLat),
      longitude: parseFloat(startLong),
      description: startAddress,
    };

    const owners = reservations.map((res) => ({
      latlng: {
        latitude: parseFloat(res.addressStart.latitude),
        longitude: parseFloat(res.addressStart.longitude),
      },
      title: res.owner.first_name + ' ' + res.owner.last_name,
      description: res.addressStart.description,
    }));
    return <MapViewWithOwners initialLocation={initialLocation} owners={owners} />;
  };

  const renderContent = () => {
    return (
      <>
        <ScrollView>
          <Text style={styles.title}>
            {title}{' '}
            {reservations &&
              reservations.length &&
              formatShowDateFromBE(reservations[0].reservationDate)}
          </Text>
          {startTimePicker()}
          {startAddressInput()}
          {renderOwnersList()}
          {reservations && reservations.length && startAddress && renderMapView()}
          <CustomButton buttonLabel="Crear" handleOnclick={handleSubmit} centered />

          {Boolean(errorMessage) && <Text style={styles.error}>{errorMessage}</Text>}

          {isLoading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#f8b444" />
            </View>
          )}
        </ScrollView>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={[]} renderItem={() => {}} ListHeaderComponent={renderContent()} />
    </SafeAreaView>
  );
};

export default ProgramWalkScreen;
