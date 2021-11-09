import React from 'react';
import { View } from 'react-native';
import { OwnerHomeMenu } from 'components';
import { WalkerHomeScreen } from 'screens';
import styles from './styles';

const HomeScreen = ({ navigation, route }) => {
  const { userProfile } = route.params;

  const renderOwnerHome = () => {
    return <OwnerHomeMenu navigation={navigation} />;
  };

  const renderWalkerHome = () => {
    return <WalkerHomeScreen navigation={navigation} userProfile={userProfile} />;
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
