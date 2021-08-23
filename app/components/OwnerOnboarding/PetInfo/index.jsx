import React from 'react';
import { Text, TextInput, View, Switch, TouchableOpacity, Button } from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import { useFormInput } from '../../../hooks/useFormInput';
import { numericValidation } from '../../../utils/helperFuncions';
import CustomButton from '../../CustomButton';
import SwitchSelector from 'react-native-switch-selector';

import styles from '../styles';

const PetInfo = ({ id, addPet, editPet, removePet }) => {
  const [toggleFullMenu, setToggleFullMenu] = useState(false);
  const [gender, setGender] = useState('HEMBRA');
  const [weight, setWeight] = useState(null);
  const petName = useFormInput('');
  const breed = useFormInput('');
  const birthYear = useFormInput(null);
  const photo_uri = useFormInput('');
  const description = useFormInput('');

  // const handleOnclick = () => {
  //   editPet(id, {
  //     name: petName.value,
  //     breed: breed.value,
  //     birth_year: birthYear,
  //     gender,
  //     weight,
  //     photo_uri: photo_uri.value,
  //     description: description.value,
  //   });
  // };

  const showFullMenu = () => (
    <View style={styles.menuContainer}>
      <TextInput placeholder="Nombre de mascota" style={styles.input} {...petName} />
      <TextInput placeholder="Raza" style={styles.input} {...breed} />
      <TextInput placeholder="Año de nacimiento aproximado" style={styles.input} {...birthYear} />
      <TextInput
        placeholder="Peso (kg)"
        style={styles.input}
        value={weight}
        onChangeText={(input) => numericValidation(input, setWeight)}
      />

      <View style={styles.switchWrapper}>
        <SwitchSelector
          initial={0}
          onPress={(value) => setGender(value)}
          textColor="#364C63"
          selectedColor="#364C63"
          buttonColor="#f4d7a3"
          borderColor="#f4d7a3"
          backgroundColor="#F3F3EB"
          hasPadding
          options={[
            { label: 'Hembra', value: 'HEMBRA' },
            { label: 'Macho', value: 'MACHO' },
          ]}
          testID="gender-switch-selector"
          accessibilityLabel="gender-switch-selector"
        />
      </View>
      <TextInput
        placeholder="Alguna nota o comentario a tener en cuenta"
        style={[styles.input, styles.description]}
        multiline
        {...description}
      />
      <CustomButton handleOnclick={addPet} buttonLabel="+ Agregar otra mascota" />
      {id !== 0 && (
        <CustomButton handleOnclick={removePet} buttonLabel="- Descartar mascota" id={id} />
      )}
    </View>
  );

  return <View style={styles.petInfoContainer}>{showFullMenu()}</View>;
};

export default PetInfo;
