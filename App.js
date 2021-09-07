import React, { useEffect, useState, useRef } from 'react';
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
import {
  getAccessTokenStorage,
  clearUserData,
  setStorageItem,
  getStorageItem,
} from './app/utils/storage';
import { OwnerOnboarding, WalkerOnboarding } from './app/components';
import { onBoardingOwner, onBoardingWalker } from './app/services/api/users/onboarding';
import LoadingScreen from './app/screens/LoadingScreen';
import { AuthContext } from './app/utils/authContext';
import { login } from './app/services/api/sessions/login';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import {
  addPushTokenToUser,
  deletePushTokenToUser,
} from './app/services/api/users/pushNotifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

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
          <RootStack.Screen
            name="OwnerOnboarding"
            component={OwnerOnboarding}
            options={{ title: '', headerBackTitle: '' }}
          />
          <RootStack.Screen
            name="WalkerOnboarding"
            component={WalkerOnboarding}
            options={{ title: '', headerBackTitle: '' }}
          />
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
  const notificationListener = useRef();
  const responseListener = useRef();

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
          if (signupData.type === 'OWNER') {
            resOB = await onBoardingOwner(onboardingData, signupData.id);
          } else {
            //resOB = await onBoardingWalker(onboardingData, signupData.id);
            console.log(onboardingData, signupData.id);
          }

          if (resSignIn && resOB) {
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
      <NavigationContainer>
        <RootStackScreen userToken={userToken} error={error} />
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
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
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
