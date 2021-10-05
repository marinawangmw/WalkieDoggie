import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-community/picker';
// eslint-disable-next-line import/no-unresolved
import { filter } from 'images';

const FilterDropdown = ({ selectedValue, setSelectedValue }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={filter} style={styles.icon} />
      </View>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Calificación" value="score" />
          <Picker.Item label="Nombre" value="complete_name" />
          <Picker.Item label="Cantidad de paseos hechos" value="pet_walks_amount" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#bdbdbd',
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 20,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: '#e8ae4a',
    resizeMode: 'contain',
  },
  dropdownContainer: {
    flex: 1,
  },
  picker: {
    flex: 1,
  },
});

export default FilterDropdown;
