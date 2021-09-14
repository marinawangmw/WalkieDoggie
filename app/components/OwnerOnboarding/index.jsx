import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../utils/authContext';
import { FilePicker, CustomButton } from '../../components';
import { numericValidation } from '../../utils/helperFuncions';
import Pet from './Pet';

import styles from './styles';
import { uploadFileAws } from '../../utils/aws';
import { isEmptyField } from '../../helpers/validatorHelper';

const OwnerOnboarding = ({ route }) => {
  const { address, lat, long, signupData } = route.params;
  const { onboarding } = React.useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState(null);
  const [profilePhotoData, setProfilePhotoData] = useState(null);
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

  const handleOnclick = async () => {
    if (address && lat && long && phone && profilePhotoData && validateFieldsPets()) {
      try {
        //Bulk upload to AWS
        const profilePhotoUri = await uploadProfilePhoto(profilePhotoData);
        const petsAfterAws = await uploadPetsPhotos(pets);

        const onboardingData = {
          phone,
          address: {
            description: address,
            latitude: lat,
            longitude: long,
          },
          profile_photo_uri: profilePhotoUri,
          pets: petsAfterAws,
        };

        await onboarding(signupData, onboardingData);
      } catch (e) {
        console.log(e);
      }
    } else {
      setErrorMessage('Por favor complete todos los datos');
    }
  };

  const validateFieldsPets = () => {
    let res = true;
    for (const pet of pets) {
      const { description, ...restParams } = pet;
      const anyEmpty = Object.values(restParams).some((param) => isEmptyField(param));
      if (anyEmpty) {
        res = false;
        break;
      }
    }
    return res;
  };

  return (
    <ScrollView style={styles.scrollContainer} showsButtons={false}>
      <Text style={[styles.sectionTitle]}>Información Personal</Text>
      <FilePicker
        label="Elegir tu foto de perfil"
        setFileData={setProfilePhotoData}
        fileType="img"
      />
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

const uploadProfilePhoto = (profilePhotoData) => {
  return uploadFileAws(profilePhotoData)
    .then((url) => url)
    .catch((e) => console.error(e));
};

const uploadPetsPhotos = (pets) => {
  return Promise.all(
    pets.map(async (pet) => {
      const petPhotoData = pet.photo_uri;
      pet.photo_uri = await uploadFileAws(petPhotoData)
        .then((url) => url)
        .catch((e) => console.error(e));
      return pet;
    }),
  );
};
