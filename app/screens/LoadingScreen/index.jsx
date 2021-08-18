import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import styles from './styles';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icon-home.png')} style={styles.logo} />
      <ActivityIndicator size="large" color="#f8b444" />
    </View>
  );
};

export default LoadingScreen;
