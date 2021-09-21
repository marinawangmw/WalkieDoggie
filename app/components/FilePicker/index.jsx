import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { getArrayBufferContent, getMimeType } from '../../utils/files';
import { v4 as uuidv4 } from 'uuid';
import CustomButton from '../CustomButton';
import styles from './styles';

// file types : img, file, video, pdf, undefined

const FilePicker = ({ label, setFileData, fileType }) => {
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
      case 'pdf':
        setType('application/pdf');
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

        setFileData(fileData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      {file && fileType === 'img' && (
        <View>
          <Image
            source={{
              uri: FileSystem.documentDirectory + file.name,
            }}
            style={styles.previewImg}
          />
        </View>
      )}
      <CustomButton buttonLabel={label || 'Pick a document...'} handleOnclick={pickDocument} />
    </View>
  );
};

export default FilePicker;
