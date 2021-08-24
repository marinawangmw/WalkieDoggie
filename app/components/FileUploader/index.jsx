import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, View, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { uploadFileAws } from '../../utils/aws';
import { getArrayBufferContent, getMimeType } from '../../utils/files';
import { v4 as uuidv4 } from 'uuid';
import CustomButton from '../CustomButton';
import styles from './styles';

const FilePicker = forwardRef((props, ref) => {
  const { label, setUrl } = props;

  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: false,
    });

    if (result) {
      const uri = FileSystem.documentDirectory + result.name;

      try {
        await FileSystem.copyAsync({
          from: result.uri,
          to: uri,
        });

        setFile(result);
        setFileData({
          uri,
          type: getMimeType(uri),
          name: `${uuidv4()}_${result.name}`,
          arrayBuffer: await getArrayBufferContent(uri),
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    uploadFile() {
      uploadFileAws(fileData)
        .then((response) => {
          setUrl(response);
        })
        .catch((e) => console.error(e));
    },
  }));

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
});

FilePicker.displayName = 'FilePicker';

export default FilePicker;
