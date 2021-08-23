import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const CustomButton = ({ handleOnclick, buttonLabel, id }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => handleOnclick(id)}>
      <Text>{buttonLabel}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
