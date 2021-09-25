import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Timetable from '../../components/TimeTable';
import { existOverlapsRanges } from '../../helpers/validatorHelper';

const Ranges = ({ navigation, route }) => {
  const { ranges } = route.params;
  const [changeRanges, setChangeRanges] = useState(ranges);

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
