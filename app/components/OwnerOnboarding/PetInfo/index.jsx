import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Text, TextInput, View, Switch, TouchableOpacity, Button } from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import { useFormInput } from '../../../hooks/useFormInput';
import { numericValidation } from '../../../utils/helperFuncions';
import CustomButton from '../../CustomButton';
import SwitchSelector from 'react-native-switch-selector';
import FilePicker from '../../FileUploader';

import styles from '../styles';

const PetInfo = forwardRef((props, ref) => {
  const { id, addPet, editPet, removePet } = props;
  const [gender, setGender] = useState('HEMBRA');
  const [weight, setWeight] = useState(null);
  const petName = useFormInput('');
  const breed = useFormInput('');
  const birthYear = useFormInput(null);
  const photo_uri = useFormInput('');
  const description = useFormInput('');

  const filePickerRef = useRef();

  useImperativeHandle(ref, () => ({
    getPets() {
      filePickerRef.current.uploadFile();
      editPet(id, {
        name: petName.value,
        breed: breed.value,
        birth_year: birthYear.value,
        gender,
        weight,
        photo_uri: photo_uri.value,
        description: description.value,
      });
    },
  }));

  const showFullMenu = () => (
    <View style={styles.menuContainer}>
      <FilePicker
        label="Elegir una foto para tu mascota"
        setUrl={photo_uri.setValue}
        ref={filePickerRef}
      />
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
});

PetInfo.displayName = 'PetInfo';

export default PetInfo;
