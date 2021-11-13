import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import PaymentStackNavigator from './PaymentStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import { TabIcon } from 'components';
import { LoadingScreen } from 'screens';
import { getCurrentUserId } from 'utils/storage';
import { getProfile } from 'services/api/users/profile';

const Tabs = createBottomTabNavigator();

const HomeTabNavigator = () => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getUserProfileInfo = async () => {
      try {
        setLoading(true);
        const userId = await getCurrentUserId();

        const userProfileResult = await getProfile(userId);

        if (userProfileResult.result) {
          setUserProfile(userProfileResult.data);
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log('Error in profile ', e);
      }
    };

    getUserProfileInfo();
  }, []);

  if (loading) {
    return <LoadingScreen logo />;
  }

  if (userProfile) {
    return (
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ color }) => <TabIcon color={color} routeName={route.name} />,
          tabBarActiveTintColor: colors.activeTab,
          tabBarInactiveTintColor: colors.inactiveTab,
        })}
      >
        <Tabs.Screen
          name="HomeScreen"
          component={HomeStackNavigator}
          options={{ title: 'Walkie Doggie', tabBarLabel: 'Home', headerShown: false }}
          initialParams={{
            userProfile,
          }}
        />

        <Tabs.Screen
          name="PaymentScreen"
          component={PaymentStackNavigator}
          options={{ headerShown: false, tabBarLabel: 'Pago' }}
          initialParams={{
            userProfile,
          }}
        />
        <Tabs.Screen
          name="ProfileScreen"
          component={ProfileStackNavigator}
          options={{ headerShown: false, tabBarLabel: 'Perfil' }}
          initialParams={{
            userProfile,
          }}
        />
      </Tabs.Navigator>
    );
  }

  return null;
};

export default HomeTabNavigator;
