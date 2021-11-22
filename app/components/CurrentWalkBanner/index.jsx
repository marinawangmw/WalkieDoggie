import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
// eslint-disable-next-line import/no-unresolved
import { rightArrowIcon, petWalkIcon } from 'images';

const CurrentWalkBanner = ({ handleNext }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNext} style={styles.banner}>
        <Image source={petWalkIcon} style={styles.icon} />
        <View style={styles.body}>
          <Text style={styles.title}>Usted tiene un paseo en curso</Text>
          <Text style={styles.description}>Haga click para ver más detalles</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Image source={rightArrowIcon} style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CurrentWalkBanner;
