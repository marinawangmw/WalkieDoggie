import * as Device from 'expo-device';

export const checkDeviceCanUseLocation = () => {
  const osMajorVersion = Device.osVersion.split('.')[0];
  const osName = Device.osName.toLowerCase();
  return osName === 'android' && osMajorVersion <= 9;
};
