import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Square = ({ idx, value, handleChangeText }) => {
  const [time, setTime] = useState(null);

  const cellStyling = () => {
    if (idx % 3 === 0 || idx === 0) {
      return (
        <View style={[styles.cell, styles.titleCell]}>
          <Text>{value}</Text>
        </View>
      );
    }
    if (idx < 3) {
      return (
        <View style={[styles.cell, styles.headerCell]}>
          <Text>{value}</Text>
        </View>
      );
    }

    return (
      <TextInput
        defaultValue="00:00"
        value={value}
        onChangeText={(input) => handleChangeText(input, idx)}
        style={[styles.cell, styles.dataCell, !value ? { color: 'gray' } : { color: '#364C63' }]}
      />
    );
  };

  return <>{cellStyling()}</>;
};

const styles = StyleSheet.create({
  cell: {
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  dataCell: {
    flex: 3,
    backgroundColor: 'white',
    borderColor: '#f4d7a3',
  },
  titleCell: {
    flex: 2,
    backgroundColor: '#f4d7a3',
    borderColor: '#F3F3EB',
  },
  headerCell: {
    flex: 3,
    backgroundColor: '#f4d7a3',
    borderColor: '#F3F3EB',
  },
});

export default Square;
