import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { OwnerHomeMenu } from 'components';
import { ProgramWalkScreen, ReservationsScreen } from 'screens';
import styles from './styles';

const HomeScreen = ({ navigation, route }) => {
  const { userProfile } = route.params;

  const renderOwnerHome = () => {
    return <OwnerHomeMenu navigation={navigation} />;
  };

  const renderWalkerHome = () => {
    return <ReservationsScreen navigation={navigation} userProfile={userProfile} />;
    // return <ProgramWalkScreen />;
  };

  if (userProfile) {
    return (
      <View style={styles.container}>
        {userProfile.type === 'OWNER' ? renderOwnerHome() : renderWalkerHome()}
      </View>
    );
  }
  return null;
};

export default HomeScreen;
