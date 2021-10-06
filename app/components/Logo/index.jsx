import React from 'react';
import { Image, View } from 'react-native';
import styles from './styles';
// eslint-disable-next-line import/no-unresolved
import { iconHome } from 'images';

const Logo = () => (
  <View style={styles.container}>
    <Image source={iconHome} style={styles.logo} />
  </View>
);

export default Logo;
