import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';

import { AuthContext } from '../../utils/authContext';
import { FilePicker, CustomButton } from '../../components';
import { numericValidation } from '../../utils/helperFuncions';
import Pet from './Pet';

import styles from './styles';

const OwnerOnboarding = ({ route }) => {
  const { address, lat, long, signupData } = route.params;
  const { ownerOnboarding } = React.useContext(AuthContext);

  const [phone, setPhone] = useState(null);
  const [profileUrl, setProfileUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [pets, setPets] = useState([
    {
      name: '',
      breed: '',
      birth_year: null,
      gender: 'HEMBRA',
      weight: null,
      photo_uri: '',
      description: '',
    },
  ]);
  console.log('owner onboarding ', pets);
  const handleOnclick = async () => {
    try {
      if (address && lat && long && phone && profileUrl && Boolean(pets[0].name)) {
        const onboardingData = {
          phone,
          address: {
            description: address,
            latitude: lat,
            longitude: long,
          },
          profile_photo_uri: profileUrl,
          pets,
        };

        await ownerOnboarding(signupData, onboardingData);
      } else {
        setErrorMessage('Por favor complete todos los datos');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} showsButtons={false}>
      <Text style={[styles.sectionTitle]}>Información Personal</Text>
      <FilePicker label="Elegir tu foto de perfil" setPhotoUri={setProfileUrl} />
      <TextInput
        placeholder="Número de teléfono (solo números)"
        style={styles.input}
        value={phone}
        onChangeText={(text) => numericValidation(text, setPhone)}
      />

      <Text style={[styles.sectionTitle]}>Información sobre tus mascotas</Text>
      <Pet pets={pets} setPets={setPets} setErrorMessage={setErrorMessage} />

      <View style={styles.saveButton}>
        <CustomButton handleOnclick={handleOnclick} buttonLabel="Guardar" />
      </View>
      {Boolean(errorMessage) && <Text style={styles.error}>{errorMessage}</Text>}
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
};

export default OwnerOnboarding;
