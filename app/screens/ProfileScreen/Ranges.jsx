import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Timetable from '../../components/TimeTable';

const Ranges = ({ navigation, route }) => {
  const { ranges } = route.params;
  const [changeRanges, setChangeRanges] = useState(ranges);

  const handleSaveRanges = () => {
    navigation.navigate('profile', {
      ranges: changeRanges,
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
