import React from 'react';
import { View, Image } from 'react-native';

import { AuthenticationContent } from '../../components';
import styles from './styles';

const AuthenticationScreen = () => {
  return (
    <View style={styles.authentication}>
      <Image source={require('../../assets/icon-home.png')} style={styles.authentication__logo} />
      <View style={styles.authentication__container}>
        <AuthenticationContent />
      </View>
    </View>
  );
};

export default AuthenticationScreen;
