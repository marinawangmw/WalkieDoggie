import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeMenuItem from './HomeMenuItem';
// eslint-disable-next-line import/no-unresolved
import { walker, shelter, petBoarding, colonies } from 'images';

const OwnerHomeMenu = ({ navigation }) => {
  const homeOptions = [
    { title: 'Paseadores', icon: walker, navigateTo: 'findWalker' },
    { title: 'Refugios', icon: shelter, navigateTo: 'findShelters' },
    { title: 'Guarderías', icon: petBoarding, navigateTo: 'findDayCares' },
    { title: 'Colonias', icon: colonies, navigateTo: 'findColonies' },
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
