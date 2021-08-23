import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AuthenticationScreen,
  OnboardingDetailsScreen,
  HomeScreen,
  ChatScreen,
  ProfileScreen,
  AddressScreen,
} from './app/screens';
import { OwnerOnboarding } from './app/components';
import { getAccessTokenStorage } from './app/utils/storage';
import LoadingScreen from './app/screens/LoadingScreen';
import { AuthContext } from './app/utils/authContext';
import { login } from './app/services/api/sessions/login';
import { clearUserData } from './app/utils/storage';

const Tabs = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const HomeTabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="HomeScreen" component={HomeScreen} />
    <Tabs.Screen name="ChatScreen" component={ChatScreen} />
    <Tabs.Screen name="ProfileScreen" component={ProfileScreen} />
  </Tabs.Navigator>
);

const RootStackScreen = ({ userToken, error }) => {
  return (
    <RootStack.Navigator>
      {userToken ? (
        <RootStack.Screen name="Home" component={HomeTabsScreen} options={{ headerShown: false }} />
      ) : (
        <>
          <RootStack.Screen
            name="Onboarding"
            component={OnboardingDetailsScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Authentication"
            component={AuthenticationScreen}
            options={{ headerShown: false }}
            initialParams={{ error }}
          />
          <RootStack.Screen name="OwnerOnboarding" component={OwnerOnboarding} />
          <RootStack.Screen
            name="AddressScreen"
            component={AddressScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default function App() {
  const [userToken, setUserToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const authContext = React.useMemo(() => {
    return {
      signIn: async (data) => {
        setIsLoading(true);
        try {
          const res = await login(data);
          setIsLoading(false);
          if (res.result) {
            setUserToken(res.data);
          } else {
            setError('Error iniciando sesión, verifique los datos ingresados');
          }
        } catch (e) {
          setError(e);
        }
      },
      onBoarding: async (signupData, onboardingData) => {
        setIsLoading(true);
        try {
          //await onboarding(onboardingData);
          const resSignin = await login(signupData);
          setIsLoading(false);
          setUserToken(resSignin.data);
        } catch (e) {
          console.log(e);
        }
      },
      signOut: async () => {
        setIsLoading(true);
        try {
          await clearUserData();
          setIsLoading(false);
          setUserToken(null);
        } catch (e) {
          setError(e);
        }
      },
    };
  }, []);

  useEffect(() => {
    const getUserToken = async () => {
      setIsLoading(true);
      const token = await getAccessTokenStorage('access_token');
      setUserToken(token);
      setIsLoading(false);
    };

    getUserToken();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} error={error} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
