import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HomeMenuItem = ({ menuItem, navigation }) => {
  const handleNavigate = () => {
    if (menuItem.navigateTo) {
      navigation.navigate(menuItem.navigateTo);
    }
  };
  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.container}>
      <Image source={menuItem.icon} style={{ height: 60, width: 60 }} />
      <Text style={styles.title}>{menuItem.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    width: 120,
  },
  title: {
    color: '#364C63',
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 13,
    fontWeight: '700',
  },
});
export default HomeMenuItem;
