import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// eslint-disable-next-line import/no-unresolved
import { rightArrowIcon } from 'images';

const ConfirmBanner = ({ title, description, handleNext, imageIcon }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNext} style={styles.banner}>
        <Image source={imageIcon} style={styles.icon} />
        <View style={styles.body}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Image source={rightArrowIcon} style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmBanner;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  banner: {
    margin: 20,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 5,
    elevation: 2,
    justifyContent: 'space-between',
    flex: 1,
  },
  icon: {
    height: 40,
    width: 40,
  },
  arrowContainer: {
    justifyContent: 'center',
    height: '100%',
    flex: 1,
  },
  arrowIcon: {
    height: 20,
    width: 20,
    tintColor: 'gray',
  },
  body: {
    paddingHorizontal: 15,
    flex: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  description: {
    fontSize: 11,
  },
});
