import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorageItem = (key, data) => {
    AsyncStorage.setItem(key, data);
}

export const getStorageItem = (key) => {
    return AsyncStorage.getItem(key);
}

export const removeStorageItem = (key) => {
    return AsyncStorage.removeItem(key);
}

export const multiRemoveStorageItems = (keys) => { 
    return AsyncStorage.multiRemove(keys);
}