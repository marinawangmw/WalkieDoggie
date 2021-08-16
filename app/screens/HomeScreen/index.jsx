import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is Home!</Text>
      <Button title="Sign out" onPress={() => navigation.navigate('Authentication')} />
    </View>
  );
};

export default HomeScreen;
