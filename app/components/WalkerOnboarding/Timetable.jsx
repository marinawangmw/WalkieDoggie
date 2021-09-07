import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import Table from './Table';

const Timetable = ({ ranges, setRanges }) => {
  const handleTimeCell = (input, idx) => {
    const aux = ranges.slice();

    if (!isNaN(input) || input.indexOf(':') > -1) {
      aux[idx] = input.slice(0, 5);
      setRanges(aux);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Por favor ingrese las franjas horarias que estima trabajar.</Text>
      <Table squares={ranges} handleChangeText={handleTimeCell} />
      <Text style={styles.text}>
        Esto horarios serán los cuales que se les ofrecerá a los dueños de perros para que estos
        puedan hacer una propuesta de paseo, lo cual luego puede decidir aceptar o rechazar según su
        conveniencia.{'\n'}
        {'\n'}
        Los horarios ingresados podrán ser modificados más adelante
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  text: {
    paddingVertical: 5,
    fontSize: 12,
    textAlign: 'center',
    color: '#364C63',
  },
});

export default Timetable;
