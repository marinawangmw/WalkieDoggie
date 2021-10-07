import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Table from './Table';

const Timetable = ({
  ranges,
  setRanges,
  onboardingNote,
  customStyles,
  addPlusIcon,
  addMinusIcon,
}) => {
  const styles = { ...defaultStyles, ...customStyles };

  const handleAddDayRow = (idx) => {
    const aux = ranges.slice();
    const day = aux[idx].day_of_week;
    const newRow = { day_of_week: day, start_at: null, end_at: null };
    aux.splice(idx + 1, 0, newRow);
    setRanges(aux);
  };

  const handleRemoveDayRow = (idx) => {
    const aux = ranges.slice();
    const auxIdx = aux[idx];

    if (aux.filter((a) => a.day_of_week === auxIdx.day_of_week).length > 1) {
      aux.splice(idx, 1);
    } else {
      auxIdx.start_at = null;
      auxIdx.end_at = null;
    }

    setRanges(aux);
  };

  const handleChangeText = (input, idx, col) => {
    const aux = ranges.slice();
    aux[idx][col] = input;
    setRanges(aux);
  };

  return (
    <View style={styles.container}>
      {onboardingNote && (
        <Text style={styles.text}>
          Por favor ingrese las franjas horarias que estima trabajar {'\n'} (si no desea ingresar
          horarios para cierto día, déjelo en blanco).
        </Text>
      )}
      <Table
        squares={ranges}
        handleChangeText={handleChangeText}
        handleAddDayRow={handleAddDayRow}
        handleRemoveDayRow={handleRemoveDayRow}
        addPlusIcon={addPlusIcon}
        addMinusIcon={addMinusIcon}
      />
      {onboardingNote && (
        <Text style={styles.text}>
          Estos horarios serán los cuales que se les ofrecerá a los dueños de perros para que estos
          puedan hacer una propuesta de paseo, lo cual luego puede decidir aceptar o rechazar según
          su conveniencia.{'\n'}
          {'\n'}
          Los horarios ingresados podrán ser modificados más adelante
        </Text>
      )}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flex: 1,
  },
  text: {
    paddingVertical: 5,
    fontSize: 12,
    textAlign: 'center',
    color: '#364C63',
  },
});

export default Timetable;
