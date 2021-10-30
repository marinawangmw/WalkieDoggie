import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeMenuItem from './HomeMenuItem';
import ConfirmBanner from './ConfirmBanner';
// eslint-disable-next-line import/no-unresolved
import { walker, shelter, petBoarding, colonies } from 'images';

const OwnerHomeMenu = ({ navigation }) => {
  const [hasPendingWalks, setHasPendingWalks] = useState(true);

  const homeOptions = [
    { title: 'Paseadores', icon: walker, navigateTo: 'findWalker' },
    { title: 'Refugios', icon: shelter, navigateTo: 'findShelters' },
    { title: 'Guarderías', icon: petBoarding, navigateTo: 'findDayCares' },
    { title: 'Colonias', icon: colonies, navigateTo: 'findColonies' },
  ];
  return (
    <View style={styles.container}>
      {hasPendingWalks && (
        <ConfirmBanner
          title="Paseo programado"
          description="Usted recibio un paseo programado que requiere su confirmación"
          setHasPendingWalks={setHasPendingWalks}
        />
      )}
      <View style={styles.iconsContainer}>
        {homeOptions.map((option, idx) => (
          <HomeMenuItem menuItem={option} navigation={navigation} key={idx} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  iconsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default OwnerHomeMenu;
