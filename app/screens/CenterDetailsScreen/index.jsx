import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getCenter } from 'services/api/centers/centers';
import { phoneIcon } from '../../assets/images';
import CentersMapView from '../../components/FindCenters/CentersMapView';
import { openDeviceDial } from '../../services/externalApps/phone';

const CenterDetailsScreen = ({ route }) => {
  const [changeCenter, setChangeCenter] = useState(null);
  const [changeName, setChangeName] = useState('');
  const [changePhone, setChangePhone] = useState('');
  const [changeDescription, setChangeDescription] = useState('');

  const [imageIcon, setImageIcon] = useState(null);

  const fetchCenter = useCallback(async (id) => {
    try {
      const response = await getCenter(id);
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
    const { centerId, image } = route.params;
    fetchCenter(centerId);
    setImageIcon(image);
  }, [route.params, fetchCenter]);

  const openPhone = () => {
    openDeviceDial(changePhone);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Image source={imageIcon} style={styles.picture} />
        <Text style={styles.centerName}> {changeName}</Text>
        <Text style={styles.centerPhone}> {changeDescription}</Text>
        <TouchableOpacity style={styles.phoneContainer} onPress={() => openPhone()}>
          <Image style={styles.phoneIcon} source={phoneIcon} />
          <Text style={styles.centerPhone}> {changePhone}</Text>
        </TouchableOpacity>

        <View style={styles.hr} />
        {changeCenter && <CentersMapView center={changeCenter} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CenterDetailsScreen;

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
