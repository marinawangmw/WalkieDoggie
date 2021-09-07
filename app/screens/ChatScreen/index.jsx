import React from 'react';
import { View, Text } from 'react-native';
import FileOpener from '../../components/FileOpener';
import styles from './styles';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is Chat!</Text>
      <FileOpener />
    </View>
  );
};

export default ChatScreen;
