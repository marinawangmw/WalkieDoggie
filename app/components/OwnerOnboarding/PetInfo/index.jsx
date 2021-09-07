import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { numericValidation } from '../../../utils/helperFuncions';
import SwitchSelector from 'react-native-switch-selector';
import FilePicker from '../../FilePicker';
import CustomButton from '../../CustomButton';

import styles from '../styles';

const PetInfo = ({ id, addPet, removePet, setErrorMessage, handleChange }) => {
  const [_gender, setGender] = useState('HEMBRA');
  const [weight, setWeight] = useState(null);
  const [photoData, setPhotoData] = useState(null);
  const [petName, setPetName] = useState('');
  const [birthYear, setBirthYear] = useState(null);
  const [description, setDescription] = useState('');
  const [breed, setBreed] = useState('');

  const handleInput = (name, value) => {
    switch (name) {
      case 'gender':
        setGender(value);
        break;

      case 'weight':
        numericValidation(value, setWeight);
        break;

      case 'name':
        setPetName(value);
        break;

      case 'birth_year':
        numericValidation(value, setBirthYear);
        break;

      case 'description':
        setDescription(value);
        break;

      case 'breed':
        setBreed(value);
        break;

      case 'photo_uri':
        setPhotoData(value);
        break;

      default:
        break;
    }

    handleChange(id, name, value);
  };

  const showFullMenu = () => (
    <View style={styles.menuContainer}>
      <FilePicker
        label="Elegir una foto para tu mascota"
        setFileData={(value) => handleInput('photo_uri', value)}
        fileType="img"
      />
      <TextInput
        placeholder="Nombre de mascota"
        style={styles.input}
        value={petName}
        onChangeText={(value) => handleInput('name', value)}
      />
      <TextInput
        placeholder="Raza"
        style={styles.input}
        value={breed}
        onChangeText={(value) => handleInput('breed', value)}
      />
      <TextInput
        placeholder="Año de nacimiento aproximado"
        style={styles.input}
        value={birthYear}
        onChangeText={(value) => handleInput('birth_year', value)}
      />
      <TextInput
        placeholder="Peso (kg)"
        style={styles.input}
        value={weight}
        onChangeText={(value) => handleInput('weight', value)}
      />

      <View style={styles.switchWrapper}>
        <SwitchSelector
          initial={0}
          onPress={(value) => handleInput('gender', value)}
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
        value={description}
        onChangeText={(value) => handleInput('description', value)}
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
