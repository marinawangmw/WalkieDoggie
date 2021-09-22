import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FindWalkerScreen = () => {
  return (
    <View style={styles.container}>
      <Text>A buscar un paseador!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default FindWalkerScreen;
