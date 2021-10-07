import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const CustomButton = ({ handleOnclick, buttonLabel, id, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabled : styles.enabled]}
      onPress={() => handleOnclick(id)}
      disabled={disabled}
    >
      <Text style={[styles.label, disabled && styles.disabled]}>{buttonLabel}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
