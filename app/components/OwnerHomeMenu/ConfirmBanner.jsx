import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// eslint-disable-next-line import/no-unresolved
import { greetingIcon, rightArrowIcon } from 'images';

const ConfirmBanner = ({ title, description, handleNext }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNext} style={styles.banner}>
        <Image source={greetingIcon} style={styles.icon} />
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
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  banner: {
    margin: 20,
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
    height: 50,
    width: 50,
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
