import React from 'react';
import { View, Image } from 'react-native';

import { AuthenticationContent } from '../../components';
import styles from './styles';

const AuthenticationScreen = (props) => (
  <View style={styles.authentication}>
    <Image source={require('../../assets/icon-home.png')} style={styles.authentication__logo} />
    <View style={styles.authentication__container}>
      <AuthenticationContent error={props.route.params.error} />
    </View>
  </View>
);

export default AuthenticationScreen;
