import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Timetable from '../../components/TimeTable';
import { existOverlapsRanges } from '../../helpers/validatorHelper';

export const INITIAL_RANGES = [
  {
    day_of_week: 'LUNES',
    end_at: null,
    start_at: null,
  },
  {
    day_of_week: 'MARTES',
    end_at: null,
    start_at: null,
  },

  {
    day_of_week: 'MIERCOLES',
    end_at: null,
    start_at: null,
  },
  {
    day_of_week: 'JUEVES',
    end_at: null,
    start_at: null,
  },
  {
    day_of_week: 'VIERNES',
    end_at: null,
    start_at: null,
  },
  {
    day_of_week: 'SABADO',
    end_at: null,
    start_at: null,
  },
  {
    day_of_week: 'DOMINGO',
    end_at: null,
    start_at: null,
  },
];

const DAY_ORDER = {
  LUNES: 0,
  MARTES: 1,
  MIERCOLES: 2,
  JUEVES: 3,
  VIERNES: 4,
  SABADO: 5,
  DOMINGO: 6,
};

const Ranges = ({ navigation, route }) => {
  const { ranges } = route.params;

  let existingRangesAndEmpties = [...ranges, ...INITIAL_RANGES];

  existingRangesAndEmpties = existingRangesAndEmpties.filter((range, index) => {
    return (
      (range.start_at !== null && range.end_at !== null) ||
      (range.start_at === null &&
        range.end_at === null &&
        !existingRangesAndEmpties.some(
          (a, indexSome) => a.day_of_week === range.day_of_week && index !== indexSome,
        ))
    );
  });

  existingRangesAndEmpties = existingRangesAndEmpties.sort((a, b) =>
    DAY_ORDER[a.day_of_week] > DAY_ORDER[b.day_of_week] ? 1 : -1,
  );

  const [changeRanges, setChangeRanges] = useState(existingRangesAndEmpties);

  const handleSaveRanges = () => {
    //Filtro aquellas franjas que tengan valores
    const filterRanges = changeRanges.filter((d) => d.start_at !== null && d.end_at !== null);
    if (filterRanges.some((day) => day.end_at < day.start_at)) {
      Alert.alert('Los horarios ingresados no son válidos.');
      return;
    }

    //Verificamos que no haya solapamientos
    if (existOverlapsRanges(filterRanges)) {
      Alert.alert('Los horarios no se pueden solapar para un mismo día.');
      return;
    }

    navigation.navigate('profile', {
      ranges: filterRanges,
    });
  };

  const handleChangeRanges = (input) => {
    setChangeRanges(input);
  };

  if (ranges.length) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Timetable ranges={changeRanges} setRanges={handleChangeRanges} />
        <TouchableOpacity onPress={handleSaveRanges} style={styles.btnContainer}>
          <Text style={styles.btnLabel}>Guardar franjas horarias</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return null;
};

export default Ranges;

const styles = StyleSheet.create({
  container: { padding: 20 },
  btnContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#f4d7a380',
  },
  btnLabel: {
    color: '#f4b445',
    fontSize: 18,
    fontWeight: '600',
  },
});
