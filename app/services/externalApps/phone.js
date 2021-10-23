import { Linking, Platform } from 'react-native';

export const openDeviceDial = (phoneNumber) => {
  let phoneNumberStr = '';

  if (Platform.OS === 'android') {
    phoneNumberStr = 'tel:${+54' + phoneNumber + '}';
  } else {
    phoneNumberStr = 'telprompt:${+54' + phoneNumber + '}';
  }
  Linking.openURL(phoneNumberStr);
};
