import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Logo from 'components/Logo';
import styles from './styles';

const LoadingScreen = ({ logo }) => {
  return (
    <View style={styles.container}>
      {logo && <Logo />}
      <View style={styles.space} />
      <ActivityIndicator size="large" color="#f8b444" />
    </View>
  );
};

export default LoadingScreen;
