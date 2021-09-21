import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorageItem = (key, data) => AsyncStorage.setItem(key, data);

export const getStorageItem = (key) => AsyncStorage.getItem(key);

export const removeStorageItem = (key) => AsyncStorage.removeItem(key);

export const multiRemoveStorageItems = (keys) => AsyncStorage.multiRemove(keys);

export const clearUserData = () =>
  multiRemoveStorageItems(['access_token', 'refresh_token', 'user_info', 'push_token']);

export const getAccessTokenStorage = () => getStorageItem('access_token');

export const getRefreshTokenStorage = () => getStorageItem('refresh_token');

export const getCurrentUserInfoStorage = async () =>
  getStorageItem('user_info').then((storageValue) => JSON.parse(storageValue));

export const getCurrentUserId = () => getCurrentUserInfoStorage().then((data) => data.sub);

export const getCurrentUserType = () => getCurrentUserInfoStorage().then((data) => data.user_type);
