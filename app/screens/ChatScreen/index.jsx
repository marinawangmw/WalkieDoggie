import React from 'react';
import { View, Text } from 'react-native';
import FileOpener from '../../components/FileOpener';
import LocationOwnerSideComponent from '../../components/LocationOwnerSide';
import styles from './styles';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is Chat!</Text>
      <LocationOwnerSideComponent />
    </View>
  );
};

export default ChatScreen;
