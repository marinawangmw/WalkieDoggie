import React from 'react';
import { useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../../screens';
import { TabIcon } from '../../components';
import ProfileStackNavigator from './ProfileStackNavigator';

const Tabs = createBottomTabNavigator();

const HomeTabNavigator = () => {
  const { colors } = useTheme();

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
        component={HomeScreen}
        options={{ title: 'Walkie Doggie', tabBarLabel: 'Home' }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileStackNavigator}
        options={{ headerShown: false, tabBarLabel: 'Perfil' }}
      />
    </Tabs.Navigator>
  );
};

export default HomeTabNavigator;
