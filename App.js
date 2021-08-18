import React, { useEffect, useState } from 'react';
import {
  AuthenticationScreen,
  OnboardingDetailsScreen,
  HomeScreen,
  ChatScreen,
  ProfileScreen,
} from './app/screens';
import { getAccessTokenStorage } from './app/utils/storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoadingScreen from './app/screens/LoadingScreen';
import { AuthContext } from './app/utils/authContext';
import { login } from './app/services/api/sessions/login';
import { signUp } from './app/services/api/sessions/signUp';
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
      {Boolean(userToken) ? (
        <RootStack.Screen name="Home" component={HomeTabsScreen} options={{ headerShown: false }} />
      ) : (
        <>
          <RootStack.Screen
            name="Authentication"
            component={AuthenticationScreen}
            options={{ headerShown: false }}
            initialParams={{ error }}
          />
          <RootStack.Screen
            name="Onboarding"
            component={OnboardingDetailsScreen}
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
      signUp: async (data) => {
        setIsLoading(true);
        try {
          const resSignup = await signUp(data);
          setIsLoading(false);

          if (resSignup.result) {
            const resSignin = await login({ email: data.email, password: data.password });
            setUserToken(resSignin.data);
          } else {
            setError('Error registrando usuario, verifique los datos ingresados');
          }
        } catch (e) {
          setError(e);
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
