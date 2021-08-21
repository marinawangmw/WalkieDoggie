import React from 'react';
import { View, Text } from 'react-native';
import FilePicker from '../../components/FileUploader';
import styles from './styles';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <FilePicker />
      <Text>This is Chat!</Text>
    </View>
  );
};

export default ChatScreen;
