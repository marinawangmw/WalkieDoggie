import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { plusIcon, minusIcon } from '../../assets/images';

const Cell = ({
  customStyles,
  value,
  idx,
  col,
  handleChangeText,
  isTitle,
  addPlusIcon,
  addMinusIcon,
  handleAddDayRow,
  handleRemoveDayRow,
}) => {
  var today = new Date();
  const initialDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

  const [date, setDate] = useState(initialDate);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [hourSelectedInput, setHourSelectedInput] = useState(value);

  const addDayRow = () => {
    handleAddDayRow(idx);
  };

  const removeDayRow = () => {
    handleRemoveDayRow(idx);
  };

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

      handleChangeText(formatHour, idx, col);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  if (isTitle) {
    return (
      <View style={[styles.cell, customStyles.container]}>
        <Text style={customStyles.text}>{value}</Text>
        {addPlusIcon && (
          <TouchableOpacity style={styles.iconContainer} onPress={addDayRow}>
            <Image source={plusIcon} style={styles.plusIcon} />
          </TouchableOpacity>
        )}
        {/* {addMinusIcon && (
          <TouchableOpacity style={styles.iconContainer} onPress={removeDayRow}>
            <Image source={minusIcon} style={styles.minusIcon} />
          </TouchableOpacity>
        )} */}
      </View>
    );
  }
  return (
    <View style={[styles.cell, customStyles.container]}>
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

const styles = StyleSheet.create({
  cell: {
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    flexDirection: 'row',
    flex: 1,
  },
  plusIcon: {
    width: 20,
    height: 20,
    tintColor: '#f4b445',
    resizeMode: 'cover',
  },
  minusIcon: {
    width: 20,
    height: 20,
    tintColor: '#384b63',
    resizeMode: 'cover',
  },
  iconContainer: {
    paddingLeft: 5,
  },
});

export default Cell;
