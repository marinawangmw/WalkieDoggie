import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { CustomButton } from '../../components';
import Timetable from '../../components/TimeTable';
import { INITIAL_RANGES } from '../../helpers/initialRanges';

const Ranges = ({ route }) => {
  const { ranges } = route.params;
  const [changeRanges, setChangeRanges] = useState(ranges);

  const saveChangeRanges = () => {
    //validar changeRanges y llamar a api?
  };

  if (ranges.length) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Timetable ranges={changeRanges} setRanges={setChangeRanges} />
        <View style={styles.btnContainer}>
          <CustomButton buttonLabel="Guardar" handleOnclick={saveChangeRanges} />
        </View>
      </ScrollView>
    );
  }

  return null;
};

export default Ranges;

const styles = StyleSheet.create({
  container: { padding: 20 },
  btnContainer: { alignSelf: 'center' },
});
