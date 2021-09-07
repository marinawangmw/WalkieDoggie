import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import Table from './Table';

const Timetable = () => {
  const [ranges, setRanges] = useState([
    null, //0
    'Inicio', // 1
    'Fin', // 2
    'Lunes', // 3
    null,
    null,
    'Martes', // 6
    null,
    null,
    'Miércoles', // 9
    null,
    null,
    'Jueves', // 12
    null,
    null,
    'Viernes', // 15
    null,
    null,
    'Sábado', // 18
    null,
    null,
    'Domingo', // 21
    null,
    null,
    //'09:00',
    //'18:00',
  ]);

  const formatTimeTableObject = () => {
    let aux = [];

    for (var i = 0; i < ranges.length; ++i) {
      if (i % 3 === 0 && i > 2) {
        aux[aux.length] = { day: ranges[i] };
      }

      if (i % 3 === 1 && i > 2) {
        aux[aux.length - 1] = { ...aux[aux.length - 1], inicio: ranges[i] };
      }
      if (i % 3 === 2 && i > 2) {
        aux[aux.length - 1] = { ...aux[aux.length - 1], fin: ranges[i] };
      }
    }

    //should return false //IF NULL?
    if (aux.some((day) => day.fin < day.inicio)) {
      // set Error message
    } else {
      // send request
    }
  };

  const handleTimeCell = (input, idx) => {
    const aux = ranges.slice();

    if (!isNaN(input) || input.indexOf(':') > -1) {
      aux[idx] = input.slice(0, 5);
      setRanges(aux);
    }
  };

  return (
    <View style={styles.container}>
      <Table squares={ranges} handleChangeText={handleTimeCell} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
});

export default Timetable;
