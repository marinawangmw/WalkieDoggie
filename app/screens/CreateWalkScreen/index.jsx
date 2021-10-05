import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { calendar, clock, sandClock } from '../../assets/images';

const CreateWalkScreen = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [pet, setPet] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [observation, setObservation] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const showTimePicker = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const onchange = (_event, selectedDate, setValue) => {
    console.log(selectedDate);
    // setValue(selectedDate);
  };

  const handleDateTimePicker = () => {
    const initialDate = new Date();

    const dateTimeData = [
      {
        title: 'Fecha',
        icon: calendar,
        value: date,
        setValue: setDate,
        mode: 'date',
      },
      {
        title: 'Hora',
        icon: clock,
        value: time,
        setValue: setTime,
        mode: 'time',
      },
      {
        title: 'Duración',
        icon: sandClock,
        value: duration,
        setValue: setDuration,
        mode: 'time',
      },
    ];

    return dateTimeData.map((item, idx) => (
      <View style={styles.data} key={idx}>
        <Text style={styles.dataTitle}>{item.title}</Text>
        <View style={styles.dateContainer}>
          <TouchableOpacity style={styles.pressable} onPress={() => showTimePicker(item.mode)}>
            <Text>{item.value}</Text>
            <Image source={item.icon} style={styles.icon} />
            {show && (
              <DateTimePicker
                value={initialDate}
                mode={mode}
                is24Hour
                display="default"
                onChange={(event, selectedDate) => onchange(event, selectedDate, item.setValue)}
                locale="es-AR"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      {handleDateTimePicker()}

      {/* <TextInput
        style={[styles.input, styles.disableInput]}
        value={date}
        onChangeText={setDate}
        placeholder="hello there"
        editable={false}
        selectTextOnFocus={false}
      />
      <TextInput
        style={[styles.input, styles.activeInput]}
        value={date}
        onChangeText={setDate}
        placeholder="hello there"
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontSize: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
  },
  activeInput: {
    backgroundColor: '#f4d7a3',
    color: '#364C63',
  },
  disableInput: {
    borderWidth: 1,
    borderColor: '#75757566',
  },
  dateWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  data: {
    paddingVertical: 5,
    flex: 1,
  },
  dataTitle: {
    paddingBottom: 5,
    fontSize: 16,
  },
  dateContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
  },
  pressable: {
    flexDirection: 'row',
  },
  icon: {
    height: 25,
    width: 25,
    margin: 12,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
});

export default CreateWalkScreen;
