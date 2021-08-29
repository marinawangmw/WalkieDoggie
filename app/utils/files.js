import * as mime from 'react-native-mime-types';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';

export const getMimeType = (uri) => mime.lookup(uri);

export const getArrayBufferContent = async (uri) => {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return decode(base64);
};

export const getFileFromUri = async (uri) => {
  const arr = uri.split('/');
  const key = arr[arr.length - 1];
  const baseUri = FileSystem.documentDirectory + key;
  const { uri: fileUri } = await FileSystem.downloadAsync(uri, baseUri);
  return fileUri;
};
