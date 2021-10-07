import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { homeIcon, profileIcon } from '../../assets/images';

const tabIcon = {
  HomeScreen: homeIcon,
  ProfileScreen: profileIcon,
};

const TabIcon = ({ color, routeName }) => {
  return (
    <Image
      accessibilityIgnoresInvertColors
      source={tabIcon[routeName]}
      style={[{ tintColor: color }, styles.icon]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});

TabIcon.displayName = 'TabIcon';

export default TabIcon;
