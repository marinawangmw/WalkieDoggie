import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Logo, GooglePlacesInput, CustomButton } from 'components';
import styles from './styles';

const AdressScreen = ({ navigation, signupData }) => {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [address, setAddress] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(signupData);
  }, [signupData]);

  const handleOnclick = () => {
    if (userData.type === 'OWNER' && userData) {
      navigation.navigate('OwnerOnboarding', {
        lat,
        long,
        address,
        signupData: userData,
      });
    } else {
      navigation.navigate('WalkerOnboarding', { lat, long, address, signupData: userData });
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.placeInput}>
        <GooglePlacesInput
          setLat={setLat}
          setLong={setLong}
          setAddress={setAddress}
          signupData={signupData}
          navigation={navigation}
        />
      </View>
      <CustomButton
        handleOnclick={() => handleOnclick()}
        buttonLabel="Siguiente"
        disabled={Boolean(!lat) && Boolean(!long) && Boolean(!address)}
      />
    </View>
  );
};

export default AdressScreen;
