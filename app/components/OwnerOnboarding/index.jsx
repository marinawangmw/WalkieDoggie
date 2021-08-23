import React, { useState } from 'react';
import { View, TextInput, ScrollView, FlatList, Button } from 'react-native';

import Swiper from 'react-native-swiper';
import Logo from '../../components/Logo';
import { numericValidation } from '../../utils/helperFuncions';
import Pet from './Pet';

import styles from './styles';

const OwnerOnboarding = () => {
  const [phone, setPhone] = useState(null);
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

  const handleOnclick = () => {
    console.log('Pets 🐽', pets);
  };

  return (
    <ScrollView style={styles.scrollContainer} showsButtons={false}>
      <TextInput
        placeholder="Número de teléfono (solo números)"
        style={styles.input}
        value={phone}
        onChangeText={(text) => numericValidation(text, setPhone)}
      />

      <Pet pets={pets} setPets={setPets} />

      {/* subir foto */}

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
};

export default OwnerOnboarding;
