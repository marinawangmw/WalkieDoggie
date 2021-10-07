import React from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { searchIcon } from 'images';

const SearchInput = ({ input, setInput }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={searchIcon} style={styles.icon} />
      </View>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Busca a tu paseador preferido"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#bdbdbd',
    backgroundColor: '#f5f5f5',
    elevation: 2,
  },
  iconContainer: {
    marginLeft: 5,
    marginRight: 30,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    tintColor: '#e8ae4a',
  },
  input: {
    padding: 5,
    flex: 1,
  },
});

export default SearchInput;
