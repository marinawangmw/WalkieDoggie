import React, { useState, useRef } from 'react';
import { View, TextInput, ScrollView } from 'react-native';

import FilePicker from '../../components/FileUploader';
import CustomButton from '../CustomButton';
import { numericValidation } from '../../utils/helperFuncions';
import Pet from './Pet';

import styles from './styles';

const OwnerOnboarding = () => {
  const [phone, setPhone] = useState(null);
  const [profileUrl, setProfileUrl] = useState('');
  const [pets, setPets] = useState([
    {
      name: '',
      breed: '',
      birth_year: null,
      gender: '',
      weight: null,
      photo_uri: '',
      description: '',
    },
  ]);

  const petRef = useRef();
  const filePickerRef = useRef();

  const handleOnclick = () => {
    filePickerRef.current.uploadFile();
    petRef.current.getPets();
  };

  return (
    <ScrollView style={styles.scrollContainer} showsButtons={false}>
      <FilePicker label="Elegir foto de perfil" ref={filePickerRef} setUrl={setProfileUrl} />
      <TextInput
        placeholder="Número de teléfono (solo números)"
        style={styles.input}
        value={phone}
        onChangeText={(text) => numericValidation(text, setPhone)}
      />

      <Pet pets={pets} setPets={setPets} ref={petRef} />

      <View style={styles.saveButton}>
        <CustomButton handleOnclick={handleOnclick} buttonLabel="Guardar" />
      </View>
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
};

export default OwnerOnboarding;
