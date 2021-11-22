import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const CustomButton = ({
  handleOnclick,
  buttonLabel,
  id,
  disabled,
  centered,
  btnColor,
  customStyles,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? styles.disabled : styles.enabled,
        centered && { alignSelf: 'center', width: '50%' },
        btnColor && { backgroundColor: `${btnColor}` },
        customStyles,
      ]}
      onPress={() => handleOnclick(id)}
      disabled={disabled}
    >
      <Text style={[styles.label, disabled && styles.disabled]}>{buttonLabel}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
