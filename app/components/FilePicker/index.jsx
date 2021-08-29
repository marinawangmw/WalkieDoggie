import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { getArrayBufferContent, getMimeType } from '../../utils/files';
import { v4 as uuidv4 } from 'uuid';
import CustomButton from '../CustomButton';
import { uploadFileAws } from '../../utils/aws';
import styles from './styles';

// file types : img, file, video, undefined

const FilePicker = ({ label, setPhotoUri, fileType }) => {
  const [file, setFile] = useState(null);
  const [type, setType] = useState('');

  useEffect(() => {
    switch (fileType) {
      case 'img':
        setType('image/*');
        break;

      case 'video':
        setType('video/*');
        break;

      case 'file':
        setType('application/*');
        break;

      default:
        setType('*/*');
    }
  }, [fileType]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type,
        copyToCacheDirectory: false,
      });

      if (result.type === 'success') {
        const uri = FileSystem.documentDirectory + result.name;

        await FileSystem.copyAsync({
          from: result.uri,
          to: uri,
        });
        setFile(result);

        const fileData = {
          uri,
          type: getMimeType(uri),
          name: `${uuidv4()}_${result.name}`,
          arrayBuffer: await getArrayBufferContent(uri),
        };

        uploadFileAws(fileData)
          .then((response) => {
            setPhotoUri(response);
          })
          .catch((e) => console.error(e));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      {file && (
        <Text style={styles.info}>
          Imagen a ser subido:{'\n'}
          Nombre: {file.name} {'\n'}
          Tamaño: {(file.size / 1024 / 1024).toFixed(3)} MB {'\n'}
        </Text>
      )}
      <CustomButton buttonLabel={label || 'Pick a document...'} handleOnclick={pickDocument} />
    </View>
  );
};

export default FilePicker;
