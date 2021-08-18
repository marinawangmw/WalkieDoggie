import React from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../utils/authContext';
import styles from './styles';

const ProfileScreen = () => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>This is Profile!</Text>
      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  );
};

export default ProfileScreen;
