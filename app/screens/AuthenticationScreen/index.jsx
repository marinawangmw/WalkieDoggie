import React from 'react';
import { View } from 'react-native';

import { AuthenticationContent } from '../../components';
import styles from './styles';

const AuthenticationScreen = (props) => (
  <View style={styles.authentication}>
    <View style={styles.authentication__container}>
      <AuthenticationContent error={props.route.params.error} navigation={props.navigation} />
    </View>
  </View>
);

export default AuthenticationScreen;
