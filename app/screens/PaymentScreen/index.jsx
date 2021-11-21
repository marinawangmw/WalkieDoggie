import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet } from 'react-native';
import { CustomButton } from 'components';
import { getReservations } from '../../services/api/rides/reservations';
import { RESERVATION_STATUS } from '../../utils/constants';

const PaymentScreen = ({ route, navigation }) => {
  const handleRegisterPaymentAndNavigateReview = () => {
    const { petWalkId } = route.params;

    navigation.navigate('review', { petWalkId, changeFirstName, changeLastName });
  };

  const [changeFirstName, setChangeFirstName] = useState('');
  const [changeLastName, setChangeLastName] = useState('');
  const [changeTotalPrice, setChangeTotalPrice] = useState(0);

  const [imageIcon, setImageIcon] = useState(null);

  const fetchPetWalk = useCallback(async (id) => {
    try {
      const reservationResponse = await getReservations({
        status: RESERVATION_STATUS.PENDING_REVIEW,
        pet_walk_id: id,
      });

      if (reservationResponse.result) {
        const reservation = reservationResponse.data[0];

        setChangeFirstName(reservation.walker.first_name);
        setChangeLastName(reservation.walker.last_name);
        setChangeTotalPrice(reservation.total_price);
      }
    } catch (e) {
      console.log('get walker profile error: ', e);
    }
  }, []);

  useEffect(() => {
    const { petWalkId } = route.params;
    const image = 26;

    fetchPetWalk(petWalkId);
    setImageIcon(image);
  }, [route.params, fetchPetWalk]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Image source={imageIcon} style={styles.picture} />

        <Text style={styles.walkerName}> {changeFirstName + ' ' + changeLastName}</Text>
        <Text style={styles.walkerPrice}>Total a pagar: ${changeTotalPrice}</Text>

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
