import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getPayment } from 'services/api/payment/payment';
import { CustomButton } from 'components';

const PaymentScreen = ({ route, navigation }) => {
  const handleNavigateReview = () => {
    navigation.navigate('review');
  };

  const [changeCenter, setChangeCenter] = useState(null);
  const [changeName, setChangeName] = useState('');
  const [changePhone, setChangePhone] = useState('');
  const [changeDescription, setChangeDescription] = useState('');

  const [imageIcon, setImageIcon] = useState(null);

  const fetchCenter = useCallback(async (id) => {
    try {
      const response = await getPayment(id);
      if (response.result) {
        const center = response.data;
        setChangeCenter(center);
        setChangeName(center.name);
        setChangePhone(center.phone);
        setChangeDescription(center.description);
      }
    } catch (e) {
      console.log('get center error: ', e);
    }
  }, []);

  useEffect(() => {
    const centerId = 1;
    const image = 26;

    fetchCenter(centerId);
    setImageIcon(image);
  }, [route.params, fetchCenter]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Image source={imageIcon} style={styles.picture} />
        <Text style={styles.centerName}> {changeName}</Text>
        <Text style={styles.centerPhone}> El total a pagar es ${changeDescription}</Text>
      </ScrollView>

      <View style={styles.btn}>
        <CustomButton buttonLabel="Ya pagué" handleOnclick={handleNavigateReview} />
      </View>
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
  centerPhone: {
    color: 'black',
    paddingLeft: 15,
    fontSize: 16,
  },
  centerName: {
    color: 'black',
    paddingLeft: 15,
    fontSize: 20,
    paddingBottom: 15,
  },
});
