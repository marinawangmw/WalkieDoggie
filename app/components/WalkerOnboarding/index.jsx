import React, { useState } from 'react';
import { View, TextInput, ScrollView, Text } from 'react-native';
import Timetable from './Timetable';
import FilePicker from '../FilePicker';
import CustomButton from '../CustomButton';
import styles from './styles';

const WalkerOnboarding = () => {
  const [price_per_hour, setPrice_per_hour] = useState(null);
  const [phone, setPhone] = useState(null);
  const [cover_letter, setCover_letter] = useState('');
  const [profile_photo_uri, setProfile_photo_uri] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnclick = () => {};

  return (
    <ScrollView style={styles.container}>
      <FilePicker
        label="Elegir tu foto de perfil"
        fileType="img"
        setPhotoUri={setProfile_photo_uri}
      />

      <TextInput
        placeholder="Número de teléfono"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        placeholder="Tarifa por hora"
        style={styles.input}
        value={price_per_hour}
        onChangeText={setPrice_per_hour}
      />

      <Timetable />

      <TextInput
        placeholder="Cover letter"
        style={[styles.input, styles.description]}
        multiline
        value={cover_letter}
        onChangeText={setCover_letter}
      />

      <View style={styles.saveButton}>
        <CustomButton handleOnclick={handleOnclick} buttonLabel="Guardar" />
      </View>
      {Boolean(errorMessage) && <Text style={styles.error}>{errorMessage}</Text>}

      <View style={styles.space} />
    </ScrollView>
  );
};

export default WalkerOnboarding;
