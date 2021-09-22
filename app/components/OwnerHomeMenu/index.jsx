import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeMenuItem from './HomeMenuItem';
import { walker, shelter, petBoarding, colonies } from '../../assets/images';

const OwnerHomeMenu = ({ navigation }) => {
  const homeOptions = [
    { title: 'Paseadores', icon: walker, navigateTo: 'findWalker' },
    { title: 'Refugios', icon: shelter, navigateTo: null },
    { title: 'Guarderías', icon: petBoarding, navigateTo: null },
    { title: 'Colonias', icon: colonies, navigateTo: null },
  ];
  return (
    <View style={styles.container}>
      {homeOptions.map((option, idx) => (
        <HomeMenuItem menuItem={option} navigation={navigation} key={idx} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
});
export default OwnerHomeMenu;
