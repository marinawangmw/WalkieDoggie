import React, { useState } from 'react';
import { Text } from 'react-native';
import { GooglePlacesInput, CustomButton } from 'components';

const GooglePlaceSearcher = ({ route, navigation }) => {
  const { placeholder, key } = route.params;
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [description, setDescription] = useState(null);

  const handleSave = () => {
    navigation.navigate('createWalk', {
      key,
      address: {
        description,
        lat,
        long,
      },
    });
  };

  return (
    <>
      <GooglePlacesInput
        setLat={setLat}
        setLong={setLong}
        setAddress={setDescription}
        placeholder={placeholder}
      />
      <CustomButton handleOnclick={handleSave} buttonLabel="Guardar" centered />
    </>
  );
};

export default GooglePlaceSearcher;
