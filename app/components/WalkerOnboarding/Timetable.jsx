import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
      <Text style={styles.text}>
        Por favor ingrese las franjas horarias que estima trabajar {'\n'} (si no desea ingresar
        horarios para cierto día, déjelo en blanco).
      </Text>
      <Table squares={ranges} handleChangeText={handleTimeCell} />
      <Text style={styles.text}>
        Estos horarios serán aquellos que se les ofrecerá a los dueños de mascotas, para que estos
        puedan hacerte una propuesta de paseo. Estas propuestas de paseo las vas a poder aceptar o
        rechazar según tu conveniencia y disponibilidad.{'\n'}
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
