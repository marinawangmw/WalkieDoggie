import React, { useState } from 'react';
import { View, TextInput, ScrollView, Text, ActivityIndicator } from 'react-native';
import Timetable from '../TimeTable';
import FilePicker from '../FilePicker';
import CustomButton from '../CustomButton';
import { uploadFileAws } from '../../utils/aws';
import { AuthContext } from '../../utils/authContext';
import styles from './styles';
import { initRanges } from '../../helpers/profileAndOnboarding';
import { existOverlapsRanges } from '../../helpers/validatorHelper';

const WalkerOnboarding = ({ route }) => {
  const { address, lat, long, signupData } = route.params;
  const { onboarding } = React.useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [price_per_hour, setPrice_per_hour] = useState(null);
  const [phone, setPhone] = useState(null);
  const [cover_letter, setCover_letter] = useState('');
  const [profilePhotoData, setProfilePhotoData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [ranges, setRanges] = useState(initRanges());

  const formatTimeTableObject = () => {
    let aux = ranges.slice();

    //Filtro los días para los cuales NO se ingresa ningún horario
    aux = aux.filter((d) => d.start_at !== null && d.end_at !== null);

    if (aux.length === 0) {
      setIsLoading(false);
      const err = 'Se debe ingresar al menos un horario.';
      setErrorMessage(err);
      throw new Error(err);
    } else if (aux.some((day) => day.end_at < day.start_at)) {
      setIsLoading(false);
      const err = 'Los horarios ingresados no son válidos.';
      setErrorMessage(err);
      throw new Error(err);
    } else if (existOverlapsRanges(aux)) {
      setIsLoading(false);
      const err = 'Los horarios no se pueden solapar para un mismo día.';
      setErrorMessage(err);
      throw new Error(err);
    } else {
      setIsLoading(false);
      return aux;
    }
  };

  const uploadProfilePhoto = () => {
    if (profilePhotoData) {
      return uploadFileAws(profilePhotoData)
        .then((url) => url)
        .catch((e) => console.error(e));
    } else {
      setIsLoading(false);
      setErrorMessage('Por favor suba una foto de perfil');
      return null;
    }
  };

  const handleOnclick = async () => {
    setIsLoading(true);
    if (!!price_per_hour && !!phone && !!cover_letter && !!profilePhotoData) {
      try {
        const profilePhotoUri = await uploadProfilePhoto();
        const timeTable = formatTimeTableObject();
        if (profilePhotoUri && timeTable && timeTable.length > 0) {
          const onboardingData = {
            phone,
            address: {
              description: address,
              latitude: lat,
              longitude: long,
            },
            profile_photo_uri: profilePhotoUri,
            cover_letter,
            ranges: timeTable,
            price_per_hour,
          };

          await onboarding(signupData, onboardingData);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsLoading(false);
      setErrorMessage('Por favor complete todos los datos');
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <FilePicker
          label="Elegir tu foto de perfil"
          fileType="img"
          setFileData={setProfilePhotoData}
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

        <Timetable ranges={ranges} setRanges={setRanges} onboardingNote />

        <TextInput
          placeholder="Carta de presentación"
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
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#f8b444" />
        </View>
      )}
    </>
  );
};

export default WalkerOnboarding;
