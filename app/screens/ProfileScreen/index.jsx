import React from 'react';
import { View, Text, Button } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { AuthContext } from '../../utils/authContext';
import { getStorageItem } from '../../utils/storage';
import styles from './styles';

const ProfileScreen = () => {
  const { signOut } = React.useContext(AuthContext);

  useEffect(() => {
    getStorageItem('user_info')
      .then((res) => {
        // send get profile request
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>This is Profile!</Text>
      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  );
};

export default ProfileScreen;
