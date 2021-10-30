import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// eslint-disable-next-line import/no-unresolved
import { calendar } from 'images';

const defaultLabel = 'Elija una fecha';

export const formatDate = (selectedDate, userVisible) => {
  const month =
    selectedDate.getMonth().toString().length === 1
      ? '0' + selectedDate.getMonth().toString()
      : selectedDate.getMonth().toString();
  const day =
    selectedDate.getDate().toString().length === 1
      ? '0' + selectedDate.getDate().toString()
      : selectedDate.getDate().toString();

  if (userVisible) {
    return day + '-' + month + '-' + selectedDate.getFullYear().toString();
  }

  return selectedDate.getFullYear().toString() + month + day;
};

const DatePicker = ({ date, setDate, label = defaultLabel }) => {
  const [show, setShow] = useState(false);

  const onChange = (_event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
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
