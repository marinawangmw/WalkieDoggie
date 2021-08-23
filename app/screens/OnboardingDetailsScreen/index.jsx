import React from 'react';
import { View } from 'react-native';
import AddressScreen from '../AddressScreen';

import { OwnerOnboarding, WalkerOnboarding } from '../../components';

import styles from './styles';

const OnboardingDetailsScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      {/* {route.params.type === 'OWNER' ? <OwnerOnboarding /> : <WalkerOnboarding />} */}
      <AddressScreen navigation={navigation} />
    </View>
  );
};

export default OnboardingDetailsScreen;
