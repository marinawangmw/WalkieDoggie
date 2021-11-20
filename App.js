import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, useColorScheme, LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { RootStackNavigator } from './app/services/navigation';
import {
  getAccessTokenStorage,
  clearUserData,
  setStorageItem,
  getStorageItem,
} from './app/utils/storage';
import { onBoardingOwner, onBoardingWalker } from './app/services/api/users/onboarding';
import LoadingScreen from './app/screens/LoadingScreen';
import { AuthContext } from './app/utils/authContext';
import { login } from './app/services/api/sessions/login';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {
  addPushTokenToUser,
  deletePushTokenToUser,
} from './app/services/api/users/pushNotifications';
import { USER_TYPES } from './app/utils/constants';
import { theme } from './app/theme';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const TASK_NAME = 'background_task';

LogBox.ignoreAllLogs();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

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
      onboarding: async (signupData, onboardingData) => {
        setIsLoading(true);

        try {
          const resSignIn = await login({ email: signupData.email, password: signupData.password });

          let resOB;
          if (signupData.type === USER_TYPES.OWNER) {
            resOB = await onBoardingOwner(onboardingData, signupData.id);
          } else {
            resOB = await onBoardingWalker(onboardingData, signupData.id);
          }

          if (resSignIn.result && resOB.result) {
            setUserToken(resSignIn.data);
          }
          setIsLoading(false);
        } catch (e) {
          console.log(e);
        }
      },
      signOut: async () => {
        setIsLoading(true);
        try {
          const pushToken = await getStorageItem('push_token');

          if (pushToken) {
            await deletePushTokenToUser(pushToken);
          }

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
      await Location.requestBackgroundPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
      const token = await getAccessTokenStorage('access_token');
      setUserToken(token);

      //----------------------------PUSH NOTIFICATIONS --------------------------------------------

      // This listener is fired whenever a notification is received while the app is foregrounded
      // notificationListener.current = Notifications.addNotificationReceivedListener(
      //   (notification) => {
      //     // console.log(notification);
      //   },
      // );

      // // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      // responseListener.current = Notifications.addNotificationResponseReceivedListener(
      //   (response) => {
      //     console.log(response);
      //   },
      // );
      setIsLoading(false);
    };

    initUserTokens();

    // return () => {
    //   Notifications.removeNotificationSubscription(notificationListener.current);
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };
  }, []);

  if (isLoading) {
    return <LoadingScreen logo />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={theme[scheme]}>
        <RootStackNavigator userToken={userToken} error={error} />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const registerForPushNotificationsAsync = async () => {
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
};
