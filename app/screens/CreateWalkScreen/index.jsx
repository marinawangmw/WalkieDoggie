import React, { useState } from 'react';
import { TextInput, StyleSheet, ScrollView } from 'react-native';

const CreateWalkScreen = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [pet, setPet] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [observation, setObservation] = useState(null);

  const walkData = [
    { title: '¿Qué día querés pasear a tu mascota?', value: date, onChange: setDate },
    { title: '¿En qué franja horaria?', value: time, onChange: setTime },
    { title: '¿Cuánto tiempo querés que dure el paseo?', value: duration, onChange: setDuration },
    { title: 'Cuál de todas tus mascotas?', value: pet, onChange: setPet },
    { title: 'Punto de recogida', value: startPoint, onChange: setStartPoint },
    { title: 'Punto de entrega', value: endPoint, onChange: setEndPoint },
    { title: 'Observación', value: observation, onChange: setObservation },
  ];

  return (
    <ScrollView>
      <TextInput
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
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
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
});

export default CreateWalkScreen;
