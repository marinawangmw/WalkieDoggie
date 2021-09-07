import React, { useState } from 'react';
import { View, TextInput, ScrollView, Text } from 'react-native';
import Timetable from './Timetable';
import FilePicker from '../FilePicker';
import CustomButton from '../CustomButton';
import { uploadFileAws } from '../../utils/aws';
import { AuthContext } from '../../utils/authContext';
import styles from './styles';

const WalkerOnboarding = ({ route }) => {
  const { address, lat, long, signupData } = route.params;
  const { onboarding } = React.useContext(AuthContext);

  const [price_per_hour, setPrice_per_hour] = useState(null);
  const [phone, setPhone] = useState(null);
  const [cover_letter, setCover_letter] = useState('');
  const [profilePhotoData, setProfilePhotoData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [ranges, setRanges] = useState([
    null, //0
    'Inicio', // 1
    'Fin', // 2
    'Lunes', // 3
    null,
    null,
    'Martes', // 6
    null,
    null,
    'Miércoles', // 9
    null,
    null,
    'Jueves', // 12
    null,
    null,
    'Viernes', // 15
    null,
    null,
    'Sábado', // 18
    null,
    null,
    'Domingo', // 21
    null,
    null,
    //'09:00',
    //'18:00',
  ]);

  const formatTimeTableObject = () => {
    let aux = ranges.slice();

    for (var i = 0; i < ranges.length; ++i) {
      if (i % 3 === 0 && i > 2) {
        aux[aux.length] = { day_of_week: ranges[i] };
      }

      if (i % 3 === 1 && i > 2) {
        aux[aux.length - 1] = { ...aux[aux.length - 1], start_at: ranges[i] };
      }
      if (i % 3 === 2 && i > 2) {
        aux[aux.length - 1] = { ...aux[aux.length - 1], end_at: ranges[i] };
      }
    }
    aux = aux.slice(24, aux.length);
    console.log(aux[0]);
    //should return false //IF NULL?
    if (aux.some((day) => day.end_at < day.start_at)) {
      setErrorMessage('Los horarios ingresados no son validos');
    } else {
      console.log('about to send timetable');
      return aux;
    }
  };

  const uploadProfilePhoto = () => {
    if (profilePhotoData) {
      return uploadFileAws(profilePhotoData)
        .then((url) => url)
        .catch((e) => console.error(e));
    } else {
      setErrorMessage('Por favor suba una foto de perfil');
      return null;
    }
  };

  const handleOnclick = async () => {
    if (!!price_per_hour && !!phone && !!cover_letter && !!profilePhotoData) {
      try {
        const profilePhotoUri = await uploadProfilePhoto(profilePhotoData);
        const timeTable = formatTimeTableObject();
        console.log('after timetable');
        //ranges null?

        if (profilePhotoUri) {
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

          //await onboarding(signupData, onboardingData);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setErrorMessage('Por favor complete todos los datos');
    }
  };

  return (
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

      <Timetable ranges={ranges} setRanges={setRanges} />

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
