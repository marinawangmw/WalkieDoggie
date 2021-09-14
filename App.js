import React, { useEffect, useState, useRef } from 'react';
<<<<<<< Updated upstream
import {
  AuthenticationScreen,
  OnboardingDetailsScreen,
  HomeScreen,
  ChatScreen,
  ProfileScreen,
} from './app/screens';
=======
import { Platform, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from './app/services/navigation';
>>>>>>> Stashed changes
import {
  getAccessTokenStorage,
  clearUserData,
  setStorageItem,
  getStorageItem,
} from './app/utils/storage';
<<<<<<< Updated upstream
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
=======
import { onBoardingOwner, onBoardingWalker } from './app/services/api/users/onboarding';
>>>>>>> Stashed changes
import LoadingScreen from './app/screens/LoadingScreen';
import { AuthContext } from './app/utils/authContext';
import { login } from './app/services/api/sessions/login';
import { signUp } from './app/services/api/sessions/signUp';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {
  addPushTokenToUser,
  deletePushTokenToUser,
} from './app/services/api/users/pushNotifications';
<<<<<<< Updated upstream
=======
import { USER_TYPES } from './app/utils/constants';
import { theme } from './app/theme';
>>>>>>> Stashed changes

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

<<<<<<< Updated upstream
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

=======
>>>>>>> Stashed changes
export default function App() {
  const [userToken, setUserToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();
  const scheme = useColorScheme();

  const authContext = React.useMemo(() => {
    return {
      signIn: async (data) => {
        setIsLoading(true);
        try {
          const res = await login(data);
          setIsLoading(false);
          if (res.result) {
            setUserToken(res.data);
            registerForPushNotificationsAsync().then((newPushToken) => {
              console.log(newPushToken);
              setStorageItem('push_token', newPushToken);
              addPushTokenToUser(newPushToken);
            });
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
          const pushToken = await getStorageItem('push_token');
          if (pushToken) await deletePushTokenToUser(pushToken);

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
    const initUserTokens = async () => {
      setIsLoading(true);
      const token = await getAccessTokenStorage('access_token');
      setUserToken(token);

      //----------------------------PUSH NOTIFICATIONS --------------------------------------------

      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(
        (notification) => {
          console.log(notification);
        },
      );

      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          console.log(response);
        },
      );
      setIsLoading(false);
    };

    initUserTokens();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={theme[scheme]}>
        <RootStackNavigator userToken={userToken} error={error} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
