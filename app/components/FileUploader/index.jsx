import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { uploadFileAws } from '../../utils/aws';
import { getArrayBufferContent, getFileFromUri, getMimeType } from '../../utils/files';
import { v4 as uuidv4 } from 'uuid';

const FilePicker = () => {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [fileRetrieved, setFileRetrieved] = useState(null);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: false,
    });

    if (result) {
      const uri = FileSystem.documentDirectory + result.name;

      await FileSystem.copyAsync({
        from: result.uri,
        to: uri,
      });

      console.log(result);

      setFile(result);

      console.log('Archivo a subir desde', uri);

      setFileData({
        uri,
        type: getMimeType(uri),
        name: `${uuidv4()}_${result.name}`,
        arrayBuffer: await getArrayBufferContent(uri),
      });
    }
  };

  const uploadFile = () => {
    uploadFileAws(fileData)
      .then((response) => {
        console.log('Archivo subido en: ', response);
        setFileRetrieved(response);
      })
      .catch((e) => console.error(e));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick a document..." onPress={pickDocument} />
      {fileData && (
        <View>
          <Image
            source={{
              uri: fileData.uri,
            }}
            style={{ width: 50, height: 50 }}
          />
          <Button title="Upload to AWS" onPress={uploadFile} />
        </View>
      )}
      {fileRetrieved && (
        <Image
          source={{
            uri: fileRetrieved,
          }}
          style={{ width: 100, height: 100 }}
        />
      )}
    </View>
  );
};

export default FilePicker;
