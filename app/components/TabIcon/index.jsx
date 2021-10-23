import React from 'react';
import { Image, StyleSheet } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { homeIcon, profileIcon, complaintsIcon } from 'images';

const tabIcon = {
  HomeScreen: homeIcon,
  ChatScreen: homeIcon,
  ProfileScreen: profileIcon,
  ComplaintsScreen: complaintsIcon,
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
