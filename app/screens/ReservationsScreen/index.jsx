import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, CheckBox, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';
import { getReservations } from 'services/api/rides/reservations';
import { DatePicker, CustomButton } from 'components';
import { formatDate } from 'components/DatePicker';
import { styles } from './styles';
import { ReservationStatusSpanish, RESERVATION_STATUS, dayOfTheWeekSpanish } from 'utils/constants';

const dateFilterLabel = 'Filtro 1: Fecha de paseo';
const statusFilterLabel = 'Filtro 2: Estado de reserva';
const rangesFilterLabel = 'Filtro 3: Franjas horarias';
const showAllButtonLabel = 'Mostrar todas las reservas';
const chooseReservationsFromSameDateError =
  'Por favor selecctione reservas de la misma fecha y mismo horario';

const ReservationsScreen = ({ navigation, userProfile }) => {
  const isFocused = useIsFocused();
  const initialDate = useMemo(() => new Date(), []);
  const [date, setDate] = useState(initialDate);
  const [status, setStatus] = useState(ReservationStatusSpanish[0].id);
  const [checkedStatus, setCheckedStatus] = useState([]);
  const [data, setData] = useState([]);
  const [walkerRanges, setWalkerRanges] = useState([]);
  const [selectedRangeId, setSelectedRangeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const checked = useMemo(() => checkedStatus.some((item) => !!item), [checkedStatus]);

  //get ranges according to date day of the week
  useEffect(() => {
    const dayOfWeek = date.getDay();
    const rangesOfTheDay = userProfile.ranges.filter(
      (range) => range.day_of_week === dayOfTheWeekSpanish[dayOfWeek],
    );

    setWalkerRanges(rangesOfTheDay);
  }, [userProfile.ranges, date]);

  //get reservations according to selected filters
  useEffect(() => {
    setErrorMessage(null);
    const getData = async (params) => {
      setIsLoading(true);
      const res = await getReservations(params);
      setIsLoading(false);

      if (res.result) {
        setData(res.data);
        const initializeCheckedStatusWithNulls = new Array(res.data.length).fill(null);
        setCheckedStatus(initializeCheckedStatusWithNulls);
      }
    };

    const filterDate = formatDate(date);

    if (status) {
      getData({ status, date: filterDate });
    } else {
      getData({ date: filterDate });
    }
  }, [status, date, isFocused]);

  const statusInSpanish = (currentStatus) => {
    const statusObject = ReservationStatusSpanish.find((item) => item.id === currentStatus);
    return statusObject.name;
  };

  const filterDataAccordingToSelectedRange = (selectedRange) => {
    setSelectedRangeId(selectedRange);

    const selectedRangeObject = walkerRanges.find((range) => range.id === selectedRange);
    if (data.length && selectedRangeObject) {
      const aux = data.filter((item) => item.start_at === selectedRangeObject.start_at);
      setData(aux);
    }
  };

  const handleShowAllClicked = async () => {
    setIsLoading(true);
    setStatus(ReservationStatusSpanish[6].id);
    const res = await getReservations();
    setIsLoading(false);

    if (res.result) {
      setData(res.data);
      const initializeCheckedStatusWithNulls = new Array(res.data.length).fill(null);
      setCheckedStatus(initializeCheckedStatusWithNulls);
    }
  };

  const handleRejectReservations = () => {
    const seletedItems = [];
    checkedStatus.map((item, idx) => {
      if (item) {
        seletedItems.push(data[idx]);
      }
    });

    navigation.navigate('rejectReservation', {
      reservationsToReject: seletedItems,
    });
  };

  const handleProgramWalk = () => {
    const selectedItems = [];
    checkedStatus.map((item, idx) => {
      if (item) {
        selectedItems.push(data[idx]);
      }
    });

    if (selectedItems.length > 1) {
      const aux = selectedItems.slice(1, selectedItems.length);
      const differentFromFirst = aux.filter(
        (item) =>
          item.start_at !== selectedItems[0].start_at ||
          item.reservationDate !== selectedItems[0].reservationDate,
      );

      if (differentFromFirst.length > 0) {
        setErrorMessage(chooseReservationsFromSameDateError);
      } else {
        navigation.navigate('programWalk', {
          reservationsToProgram: selectedItems,
        });
      }
    } else {
      navigation.navigate('programWalk', {
        reservationsToProgram: selectedItems,
      });
    }
  };

  const handleCheck = (idx) => {
    const newChecked = checkedStatus.slice();

    if (!newChecked[idx]) {
      newChecked[idx] = true;
    } else {
      newChecked[idx] = !newChecked[idx];
    }
    setCheckedStatus(newChecked);
  };

  const formatShowDateFromBE = (dateToFormat) => {
    return (
      dateToFormat.slice(6, 8) + '-' + dateToFormat.slice(4, 6) + '-' + dateToFormat.slice(0, 4)
    );
  };

  const timeRangePicker = () => {
    return (
      <View style={styles.data}>
        <Text style={styles.dataTitle}>{rangesFilterLabel}</Text>
        <Picker
          style={styles.dataContainer}
          selectedValue={selectedRangeId}
          onValueChange={(itemValue) => filterDataAccordingToSelectedRange(itemValue)}
        >
          {Boolean(walkerRanges) &&
            Boolean(walkerRanges.length) &&
            walkerRanges.map((item, idx) => (
              <Picker.Item
                label={`De ${item.start_at} a ${item.end_at}`}
                value={item.id}
                key={idx}
              />
            ))}
        </Picker>
      </View>
    );
  };

  const reservationStatusPicker = () => {
    return (
      <View style={styles.data}>
        <Text style={styles.dataTitle}>{statusFilterLabel}</Text>
        <Picker
          style={styles.dataContainer}
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          {Boolean(ReservationStatusSpanish) &&
            Boolean(ReservationStatusSpanish.length) &&
            ReservationStatusSpanish.map((item, idx) => (
              <Picker.Item label={item.name} value={item.id} key={idx} />
            ))}
        </Picker>
      </View>
    );
  };

  const showAllButton = () => {
    return (
      <View style={styles.data}>
        <TouchableOpacity
          style={[styles.dataContainer, { backgroundColor: '#f4b445', justifyContent: 'center' }]}
          onPress={handleShowAllClicked}
        >
          <Text style={[styles.details, { color: 'white', fontWeight: 'bold' }]}>
            {showAllButtonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const reservationsList = () => {
    return data.map((item, idx) => (
      <View style={styles.data} key={idx}>
        <View style={styles.dataContainer}>
          {item.status === RESERVATION_STATUS.PENDING && (
            <CheckBox
              value={checkedStatus[idx]}
              onValueChange={() => handleCheck(idx)}
              style={styles.checkbox}
            />
          )}

          <View style={styles.details}>
            <Text style={styles.reservationTitle}>{item.pet.name}</Text>
            <Text style={styles.reservationItem}>Dueño: {item.owner.first_name}</Text>
            <Text style={styles.reservationItem}>Estado: {statusInSpanish(item.status)}</Text>
            <Text style={styles.reservationItem}>
              Fecha de paseo: {formatShowDateFromBE(item.reservationDate)}
            </Text>
            <Text style={styles.reservationItem}>
              Franja horaria de paseo:
              {' De ' + item.start_at.slice(0, 5) + ' a ' + item.end_at.slice(0, 5)}
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

  const selectionButtons = () => (
    <View style={styles.btnContainer}>
      <CustomButton
        handleOnclick={handleProgramWalk}
        buttonLabel="Programar paseo"
        btnColor="#f4b445d9"
      />

      <CustomButton
        handleOnclick={handleRejectReservations}
        buttonLabel="Rechazar reservas"
        btnColor="#D32F2Fd9"
      />
    </View>
  );

  const renderContent = () => {
    return (
      <View style={styles.container}>
        <DatePicker date={date} setDate={setDate} label={dateFilterLabel} />
        {reservationStatusPicker()}
        {timeRangePicker()}
        {showAllButton()}

        {checked && selectionButtons()}
        {reservationsList()}
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#f8b444" />
          </View>
        )}
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      </View>
    );
  };

  return <FlatList data={[]} renderItem={() => {}} ListHeaderComponent={renderContent()} />;
};

export default ReservationsScreen;
