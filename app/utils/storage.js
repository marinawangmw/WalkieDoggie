import AsyncStorage from '@react-native-community/async-storage';

export const setStorageItem = (key, data) => {
    AsyncStorage.setItem(key, data);
} 

export const getStorageItem = (key) => {
    return AsyncStorage.getItem(key);
}