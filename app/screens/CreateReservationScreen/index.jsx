import React, { useState, useEffect } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  CheckBox,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
// eslint-disable-next-line import/no-unresolved
import { calendar } from 'images';
import { Picker } from '@react-native-community/picker';
import { CustomButton } from 'components';
import { createReservation } from 'services/api/rides/reservations';
import { DAYS_OF_WEEK_ARR } from '../../utils/dates';

const formatDate = (selectedDate, userVisible) => {
  const month =
    selectedDate.getMonth().toString().length === 1
      ? '0' + selectedDate.getMonth().toString()
      : selectedDate.getMonth().toString();
  const day =
    selectedDate.getDate().toString().length === 1
      ? '0' + selectedDate.getDate().toString()
      : selectedDate.getDate().toString();

  if (userVisible) {
    return selectedDate.getFullYear().toString() + '-' + month + '-' + day;
  }

  return selectedDate.getFullYear().toString() + month + day;
};

const address_start = 'ADDRESS_START';
const address_end = 'ADDRESS_END';

const CreateReservationScreen = ({ route, navigation }) => {
  const initialDate = new Date();
  const [date, setDate] = useState(initialDate);
  const [show, setShow] = useState(false);

  const [selectedRange, setSelectedRange] = useState('');
  const [duration, setDuration] = useState('');
  const [pets, setPets] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState([]);
  const [startSameHome, setStartSameHome] = useState(false);
  const [startLat, setStartLat] = useState(null);
  const [startLong, setStartLong] = useState(null);
  const [startAddress, setStartAddress] = useState(null);
  const [endSameStart, setEndSameStart] = useState(false);
  const [endLat, setEndLat] = useState(null);
  const [endLong, setEndLong] = useState(null);
  const [endAddress, setEndAddress] = useState(null);
  const [comments, setComments] = useState(null);
  const [walkerRanges, setWalkerRanges] = useState([]);
  const [walkerRangesFiltered, setWalkerRangesFiltered] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [walkerId, setWalkerId] = useState(null);

  const { ranges, userProfile, walkerId: walkerSub } = route.params;
  useEffect(() => {
    if (ranges) {
      setWalkerRanges(ranges);
      //Filtro ranges para la fecha por defecto
      const dayWeekSelected = DAYS_OF_WEEK_ARR[date.getDay()];
      const auxRanges = ranges.filter((r) => r.day_of_week === dayWeekSelected);
      setWalkerRangesFiltered(auxRanges);
    }
  }, [ranges]);

  useEffect(() => {
    if (route.params) {
      const { key, address } = route.params;
      if (key === address_start) {
        setStartAddress(address.description);
        setStartLat(address.lat);
        setStartLong(address.long);
      }
      if (key === address_end) {
        setEndAddress(address.description);
        setEndLat(address.lat);
        setEndLong(address.long);
      }
    }
  }, [route]);

  useEffect(() => {
    if (userProfile) {
      setPets(userProfile.pets);
    }
  }, [userProfile]);

  useEffect(() => {
    if (walkerSub) {
      setWalkerId(walkerSub);
    }
  }, [walkerSub]);

  const onCheckStartSameHome = () => {
    setStartSameHome(!startSameHome);
    setStartLat(userProfile.address.latitude);
    setStartLong(userProfile.address.longitude);
    setStartAddress(userProfile.address.description);
  };

  const onCheckEndSameStart = () => {
    setEndSameStart(!endSameStart);
    setEndLat(startLat);
    setEndLong(startLong);
    setEndAddress(startAddress);
  };

  const handleSubmit = async () => {
    if (
      date &&
      selectedRange &&
      duration &&
      selectedPetId &&
      startAddress &&
      startLat &&
      startLong &&
      endAddress &&
      endLat &&
      endLong &&
      comments
    ) {
      setIsLoading(true);
      setErrorMessage('');
      const formattedDate = formatDate(date, false);
      const data = {
        walk_date: formattedDate,
        range_id: selectedRange,
        duration,
        pet_id: selectedPetId,
        address_start: {
          description: startAddress,
          latitude: startLat,
          longitude: startLong,
        },
        address_end: {
          description: endAddress,
          latitude: endLat,
          longitude: endLong,
        },
        comments,
      };
      try {
        const res = await createReservation(walkerId, data);
        setIsLoading(false);
        if (res.result) {
          Toast.show({
            type: 'success',
            text1: 'Bien!',
            text2:
              'Se creó exitosamente la reserva por el paseo, pronto el paseador se contactará contigo.',
          });
          navigation.navigate('home');
        } else {
          setErrorMessage('Oops, algo anduvo mal');
        }
      } catch (error) {
        setErrorMessage('Oops, algo anduvo mal');
        console.log(error);
      }
    } else {
      setIsLoading(false);
      setErrorMessage('Por favor complete todos los datos');
    }
  };

  const handleNavigatePlaceSearch = (key) => {
    navigation.navigate('googlePlaceSearcher', {
      key,
      placeholder: 'Ingrese una dirección',
      nextScreen: 'createReservation',
    });
  };

  const onChange = (_event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;

    setDate(currentDate);

    //Filtrar ranges por día de la semana
    const dayWeekSelected = DAYS_OF_WEEK_ARR[currentDate.getDay()];
    const auxRanges = walkerRanges.filter((r) => r.day_of_week === dayWeekSelected);
    setWalkerRangesFiltered(auxRanges);
  };

  const handleChangeDuration = (text) => {
    if (/^\d+$/.test(text) || text === '') {
      setDuration(text);
    }
  };

  const renderContent = () => {
    return (
      <View style={styles.container}>
        {/* WALK_DATE */}
        <View style={styles.data}>
          <Text style={styles.dataTitle}>Elija una fecha</Text>
          <View style={styles.dataContainer}>
            <TouchableOpacity style={styles.pressable} onPress={() => setShow(true)}>
              <Image source={calendar} style={styles.icon} />
              <Text>{formatDate(date, true)}</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
                locale="es-AR"
              />
            )}
          </View>
        </View>

        {/* RANGE_ID */}
        <View style={styles.data}>
          <Text style={styles.dataTitle}>Elija una franja horaria</Text>
          <Picker
            style={styles.dataContainer}
            selectedValue={selectedRange}
            onValueChange={(itemValue) => setSelectedRange(itemValue)}
          >
            {Boolean(walkerRangesFiltered) &&
              Boolean(walkerRangesFiltered.length) &&
              walkerRangesFiltered.map((range) => (
                <Picker.Item
                  label={range.day_of_week + ' de ' + range.start_at + ' a ' + range.end_at}
                  value={range.id}
                  key={range.id}
                />
              ))}
          </Picker>
        </View>

        {/* DURATION */}
        <View style={styles.data}>
          <Text style={styles.dataTitle}>Ingrese una duración en minutos</Text>
          <TextInput
            style={[styles.dataContainer, styles.durationInput]}
            value={duration}
            onChangeText={handleChangeDuration}
            keyboardType="numeric"
            placeholder="Ej.: 90"
          />
        </View>

        {/* PET_ID */}
        <View style={styles.data}>
          <Text style={styles.dataTitle}>Seleccione para cual mascota</Text>
          <Picker
            style={styles.dataContainer}
            selectedValue={selectedPetId}
            onValueChange={(itemValue) => setSelectedPetId(itemValue)}
          >
            {Boolean(pets) &&
              Boolean(pets.length) &&
              pets.map((pet) => <Picker.Item label={pet.name} value={pet.id} key={pet.id} />)}
          </Picker>
        </View>

        {/* ADDRESS_START */}
        <View style={styles.data}>
          <Text style={styles.dataTitle}>Punto de partida</Text>
          <View style={styles.titleRow}>
            <CheckBox
              value={startSameHome}
              onValueChange={onCheckStartSameHome}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>
              Seleccionar: &quot;{userProfile.address.description}&quot; ?
            </Text>
          </View>
          <TouchableOpacity
            style={styles.dataContainer}
            onPress={() => handleNavigatePlaceSearch(address_end)}
            disabled={startSameHome}
          >
            <Text style={styles.dataContent}>
              {startAddress ? startAddress : 'Seleccionar otra dirección'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ADDRESS_END */}
        <View style={styles.data}>
          <Text style={styles.dataTitle}>Punto de entrega</Text>
          <View style={styles.titleRow}>
            <CheckBox
              value={endSameStart}
              onValueChange={onCheckEndSameStart}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>Misma dirección que punto de partida?</Text>
          </View>

          <TouchableOpacity
            style={styles.dataContainer}
            onPress={() => handleNavigatePlaceSearch(address_end)}
            disabled={endSameStart}
          >
            <Text style={styles.dataContent}>
              {endAddress ? endAddress : 'Seleccionar otra dirección'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* COMMENTS */}
        <TextInput
          multiline
          value={comments}
          onChangeText={setComments}
          placeholder="¿Algún comentario para agregar?"
          style={[styles.dataContainer, styles.durationInput, { marginVertical: 10 }]}
        />

        <CustomButton buttonLabel="Crear reserva" handleOnclick={handleSubmit} centered />
        {Boolean(errorMessage) && <Text style={styles.error}>{errorMessage}</Text>}
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#f8b444" />
          </View>
        )}
      </View>
    );
  };

  if (userProfile) {
    return <FlatList data={[]} renderItem={() => {}} ListHeaderComponent={renderContent()} />;
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontSize: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
  },
  dateWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  data: {
    paddingVertical: 10,
  },
  dataTitle: {
    paddingBottom: 5,
    fontSize: 16,
  },
  titleRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
  dataContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dataContent: {
    paddingVertical: 10,
  },
  durationInput: {
    paddingVertical: 10,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 25,
    width: 25,
    margin: 12,
    resizeMode: 'contain',
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    flexWrap: 'wrap',
    flex: 1,
  },
  error: {
    textAlign: 'center',
    color: '#D32F2F',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3F3CC',
    zIndex: 10,
  },
});

export default CreateReservationScreen;
