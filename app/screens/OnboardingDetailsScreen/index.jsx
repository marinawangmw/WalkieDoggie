import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';

const OnboardingDetailsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Hello OnboardingDetailsScreen!</Text>
      <Button title="Sign out" onPress={() => navigation.navigate('Authentication')} />
      <Button title="Next" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default OnboardingDetailsScreen;
