import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HomeMenuItem = ({ menuItem, navigation }) => {
  const handleNavigate = () => {
    if (menuItem.navigateTo) {
      navigation.navigate(menuItem.navigateTo);
    }
  };
  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.container}>
      <Image source={menuItem.icon} style={{ height: 80, width: 80 }} />
      <Text style={styles.title}>{menuItem.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 1,
  },
  title: {
    color: '#364C63',
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 16,
    fontWeight: '700',
  },
});
export default HomeMenuItem;
