import React from 'react';
import { View } from 'react-native';
import AddressScreen from '../AddressScreen';
import { WalkerOnboarding } from '../../components';

import styles from './styles';

const OnboardingDetailsScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <AddressScreen navigation={navigation} signupData={route.params.signupData} />
    </View>
  );
};

export default OnboardingDetailsScreen;
