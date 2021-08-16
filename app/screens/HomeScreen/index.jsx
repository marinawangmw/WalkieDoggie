import React from 'react';
import { View, Text, Button } from 'react-native';
import { clearUserData } from '../../utils/storage';
import styles from './styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is Home!</Text>
      <Button title="Sign out" onPress={() => doSignOut(navigation)} />
    </View>
  );
};

export default HomeScreen;

const doSignOut = async (navigation) => {
  await clearUserData();
  navigation.navigate('Authentication');
};
