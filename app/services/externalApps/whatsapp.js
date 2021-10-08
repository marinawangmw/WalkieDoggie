import { Linking } from 'react-native';

export const openWhatsappChat = (phoneNumber, text) =>
  Linking.openURL(`http://api.whatsapp.com/send?phone=549${phoneNumber}&text=${text}`);
