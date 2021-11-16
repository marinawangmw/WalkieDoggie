import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// eslint-disable-next-line import/no-unresolved
import { calendar } from 'images';

const defaultLabel = 'Elija una fecha';

export const formatDate = (selectedDate, userVisible) => {
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();
  const monthStr = month.toString().length === 1 ? '0' + month.toString() : month.toString();
  const dayStr = day.toString().length === 1 ? '0' + day.toString() : day.toString();

  if (userVisible) {
    return dayStr + '-' + monthStr + '-' + selectedDate.getFullYear().toString();
  }

  return selectedDate.getFullYear().toString() + monthStr + dayStr;
};

const DatePicker = ({ date, setDate, label = defaultLabel, setShowAllReservations }) => {
  const [show, setShow] = useState(false);

  const onChange = (_event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowAllReservations(false);
  };

  return (
    <View style={styles.data}>
      <Text style={styles.dataTitle}>{label}</Text>
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
  );
};

const styles = StyleSheet.create({
  data: {
    paddingVertical: 10,
  },
  dataTitle: {
    paddingBottom: 5,
    fontSize: 16,
  },
  dataContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    height: 25,
    width: 25,
    margin: 12,
    resizeMode: 'contain',
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DatePicker;
