import * as mime from 'react-native-mime-types';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';

export const getMimeType = (uri) => mime.lookup(uri);

export const getArrayBufferContent = async (uri) => {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return decode(base64);
};
