import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet } from 'react-native';
import { CustomButton } from 'components';
import { getProfile } from '../../services/api/users/profile';

const PaymentScreen = ({ route, navigation }) => {
  const handleRegisterPaymentAndNavigateReview = () => {
    const { petWalkId } = route.params;

    navigation.navigate('review', { petWalkId, changeFirstName, changeLastName });
  };

  const [changeFirstName, setChangeFirstName] = useState('');
  const [changeLastName, setChangeLastName] = useState('');
  const [changePricePerHour, setChangePricePerHour] = useState(0);
  const [changeDuration, setChangeDuration] = useState(0);

  const [imageIcon, setImageIcon] = useState(null);

  const fetchUserProfile = useCallback(async (id) => {
    try {
      console.log('id: ', id);
      const userProfile = await getProfile(id);

      if (userProfile.result) {
        const profile = userProfile.data;

        setChangeFirstName(profile.first_name);
        setChangeLastName(profile.last_name);
        setChangePricePerHour(profile.price_per_hour);
        setChangeDuration(90);
      }
    } catch (e) {
      console.log('get walker profile error: ', e);
    }
  }, []);

  useEffect(() => {
    const { petWalkId } = route.params;
    const image = 26;

    fetchUserProfile(petWalkId);
    setImageIcon(image);
  }, [route.params, fetchUserProfile]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Image source={imageIcon} style={styles.picture} />

        <Text style={styles.walkerName}> {changeFirstName + ' ' + changeLastName}</Text>
        <Text style={styles.walkerPricePerHour}> Precio por hora: ${changePricePerHour}</Text>
        <Text style={styles.walkerDuration}> Duración: {changeDuration} minutos</Text>
        <Text style={styles.walkerPrice}>
          Total a pagar: ${(changePricePerHour * changeDuration) / 60}
        </Text>

        <View style={styles.btn}>
          <CustomButton
            buttonLabel="Ya pagué"
            handleOnclick={handleRegisterPaymentAndNavigateReview}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginVertical: 10,
  },
  picture: {
    height: 90,
    width: 90,
    alignSelf: 'center',
    marginBottom: 15,
  },
  phoneIcon: {
    height: 20,
    width: 20,
    resizeMode: 'cover',
  },
  phoneContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    marginTop: 15,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'cover',
  },
  btn: {
    alignItems: 'center',
  },
  btnContainer: {
    flexGrow: 1,
    padding: 10,
    paddingLeft: 20,
  },
  btnLabel: {
    fontSize: 18,
    color: '#D32F2F',
  },
  email: {
    color: '#364C63',
    fontSize: 16,
    fontWeight: '400',
  },
  hr: {
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderBottomColor: '#bfbfbf',
    borderBottomWidth: 1,
  },
  walkerPricePerHour: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 16,
  },
  walkerDuration: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 16,
    paddingBottom: 70,
  },
  walkerPrice: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 30,
    paddingBottom: 25,
  },
  walkerName: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 24,
    paddingBottom: 70,
  },
});
