import React, { useState, useEffect } from 'react';
import { View, Text, Platform, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Square = ({ idx, value, handleChangeText }) => {
  var today = new Date();
  const initialDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

  const [time, setTime] = useState(null);
  const [date, setDate] = useState(initialDate);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [hourSelectedInput, setHourSelectedInput] = useState(value);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    if (currentDate) {
      let currentHours = currentDate.getHours();
      currentHours = ('0' + currentHours).slice(-2);
      let currentMinutes = currentDate.getMinutes();
      currentMinutes = ('0' + currentMinutes).slice(-2);
      const formatHour = currentHours + ':' + currentMinutes;
      setHourSelectedInput(formatHour);

      handleChangeText(formatHour, idx);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const cellStyling = () => {
    if (idx % 3 === 0 || idx === 0) {
      return (
        <View style={[styles.cell, styles.titleCell]}>
          <Text>{value}</Text>
        </View>
      );
    }
    if (idx < 3) {
      return (
        <View style={[styles.cell, styles.headerCell]}>
          <Text>{value}</Text>
        </View>
      );
    }

    return (
      <View style={[styles.cell, styles.dataCell]}>
        <TextInput value={hourSelectedInput} onFocus={showTimepicker} />
        {show && (
          <DateTimePicker
            value={initialDate}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            locale="es-AR"
          />
        )}
      </View>
    );
  };

  return <>{cellStyling()}</>;
};

const styles = StyleSheet.create({
  cell: {
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  dataCell: {
    flex: 3,
    backgroundColor: 'white',
    borderColor: '#f4d7a3',
  },
  titleCell: {
    flex: 2,
    backgroundColor: '#f4d7a3',
    borderColor: '#F3F3EB',
  },
  headerCell: {
    flex: 3,
    backgroundColor: '#f4d7a3',
    borderColor: '#F3F3EB',
  },
});

export default Square;
