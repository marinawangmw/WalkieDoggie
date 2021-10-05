import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// eslint-disable-next-line import/no-unresolved
import { plusIcon } from 'images';

const Cell = ({
  customStyles,
  value,
  idx,
  col,
  handleChangeText,
  isTitle,
  addPlusIcon,
  handleAddDayRow,
}) => {
  var today = new Date();
  const initialDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  const [show, setShow] = useState(false);

  const addDayRow = () => {
    handleAddDayRow(idx);
  };

  const onChange = (_event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');

    if (currentDate) {
      let currentHours = currentDate.getHours();
      currentHours = ('0' + currentHours).slice(-2);
      let currentMinutes = currentDate.getMinutes();
      currentMinutes = ('0' + currentMinutes).slice(-2);
      const formatHour = currentHours + ':' + currentMinutes;

      handleChangeText(formatHour, idx, col);
    }
  };

  const showTimepicker = () => {
    setShow(true);
  };

  if (isTitle) {
    return (
      <View style={[styles.cell, customStyles.container]}>
        <Text style={customStyles.text}>{value}</Text>
        {addPlusIcon && (
          <TouchableOpacity style={styles.iconContainer} onPress={addDayRow}>
            <Image source={plusIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
  return (
    <View style={[styles.cell, customStyles.container]}>
      <TextInput value={value} onFocus={showTimepicker} />
      {show && (
        <DateTimePicker
          value={initialDate}
          mode="time"
          is24Hour
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
  icon: {
    width: 20,
    height: 20,
    tintColor: '#f4b445',
    resizeMode: 'cover',
  },
  iconContainer: {
    paddingLeft: 5,
  },
});

export default Cell;
