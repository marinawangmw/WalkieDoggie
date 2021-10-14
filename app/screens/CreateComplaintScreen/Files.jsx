import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';

import { FilePicker } from 'components';
import { uploadFileAws } from 'utils/aws';
// eslint-disable-next-line import/no-unresolved
import { imageIcon } from 'images';

const Files = ({ navigation, route, disableUpload }) => {
  const { description, files = [] } = route.params;
  const [localDescription, setChangeDescription] = useState(description);
  const [localFiles, setChangeFiles] = useState(files);
  const [newFileData, setNewFileData] = useState(null);
  const [canStillUploadFiles, setCanStillUploadFiles] = useState(files.length < 5);
  const [counter, setCounter] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const handleUploadFile = () => {
    setIsLoading(true);
    return uploadFileAws(newFileData)
      .then((url) => {
        const counterValue = counter + 1;
        setCounter(counterValue);

        const newFiles = [...localFiles, { file_uri: url, description: 'Archivo ' + counter }];

        setChangeFiles(newFiles);

        setNewFileData(null);
        setCanStillUploadFiles(newFiles.length < 5);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.error(e);
      });
  };

  const handleSaveFiles = () => {
    navigation.navigate('createComplaint', {
      description: localDescription,
      files: localFiles,
    });
  };

  return (
    <>
      <ScrollView style={styles.scrollContainer}>
        {Boolean(localFiles.length) && !disableUpload && <View style={styles.hr} />}
        <View styles={styles.filesContainer}>
          {localFiles && (
            <>
              {localFiles.map((row, rowIdx) => {
                return (
                  <View key={rowIdx} style={styles.fileRow}>
                    <Image source={imageIcon} style={styles.icon} />
                    <Text style={[styles.text]} onPress={() => Linking.openURL(row.file_uri)}>
                      {row.description}
                    </Text>
                  </View>
                );
              })}
            </>
          )}
        </View>
        {Boolean(localFiles.length) && !disableUpload && <View style={styles.hr} />}
        {canStillUploadFiles && !disableUpload && (
          <View style={styles.viewAddNewCertification}>
            <FilePicker label={'Nuevo archivo'} fileType={'*'} setFileData={setNewFileData} />

            {newFileData && (
              <View styles={styles.viewDescriptionInput}>
                <Button title="Subir" onPress={handleUploadFile} />
              </View>
            )}
          </View>
        )}

        {!disableUpload && (
          <TouchableOpacity onPress={handleSaveFiles} style={styles.btnContainer}>
            <Text style={styles.btnLabel}>Guardar archivos</Text>
          </TouchableOpacity>
        )}
        {Boolean(!localFiles.length) && (
          <Text style={styles.message}>No hay archivos subidos todavía</Text>
        )}
      </ScrollView>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#f8b444" />
        </View>
      )}
    </>
  );
};

export default Files;

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    paddingHorizontal: 20,
    height: '100%',
    marginTop: 20,
  },
  descriptionInput: {
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f4d7a3',
    borderRadius: 25,
  },
  viewDescriptionInput: {
    flex: 1,
    flexDirection: 'row',
  },

  icon: {
    height: 40,
    width: 40,
    resizeMode: 'cover',
  },

  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  filesContainer: {
    flexDirection: 'row',
  },
  text: {
    paddingHorizontal: 15,
    textDecorationLine: 'underline',
    color: 'blue',
  },
  btnContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#f4d7a380',
  },
  hr: {
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderBottomColor: '#bfbfbf',
    borderBottomWidth: 1,
  },
  loader: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3EBCC',
  },
  message: {
    padding: 20,
    margin: 10,
    color: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
    textAlign: 'center',
    borderColor: '#f4d7a3',
    borderRadius: 10,
  },
});
