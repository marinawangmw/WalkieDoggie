import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';

import { FilePicker } from 'components';
import { uploadFileAws } from 'utils/aws';
// eslint-disable-next-line import/no-unresolved
import { pdfIcon } from 'images';

const Certifications = ({ navigation, route, disableUpload }) => {
  const { certifications = [] } = route.params;
  const [localCertifications, setChangeCertifications] = useState(certifications);
  const [newCertificationData, setNewCertificationData] = useState(null);
  const [newCertificationDescription, setnewCertificationDescription] = useState(null);
  const [canStillUploadFiles, setCanStillUploadFiles] = useState(certifications.length < 3);

  const [isLoading, setIsLoading] = useState(false);

  const handleUploadCertification = () => {
    setIsLoading(true);
    return uploadFileAws(newCertificationData)
      .then((url) => {
        const newCertifications = [
          ...localCertifications,
          { file_uri: url, description: newCertificationDescription },
        ];
        setChangeCertifications(newCertifications);

        setNewCertificationData(null);
        setnewCertificationDescription(null);
        setCanStillUploadFiles(newCertifications.length < 3);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.error(e);
      });
  };

  const handleSaveCertifications = () => {
    navigation.navigate('profile', {
      certifications: localCertifications,
    });
  };

  return (
    <>
      <ScrollView style={styles.scrollContainer}>
        {Boolean(localCertifications.length) && !disableUpload && <View style={styles.hr} />}
        <View styles={styles.certificationsContainer}>
          {localCertifications && (
            <>
              {localCertifications.map((row, rowIdx) => {
                return (
                  <View key={rowIdx} style={styles.certificationRow}>
                    <Image source={pdfIcon} style={styles.icon} />
                    <Text style={[styles.text]} onPress={() => Linking.openURL(row.file_uri)}>
                      {row.description}
                    </Text>
                  </View>
                );
              })}
            </>
          )}
        </View>
        {Boolean(localCertifications.length) && !disableUpload && <View style={styles.hr} />}
        {canStillUploadFiles && !disableUpload && (
          <View style={styles.viewAddNewCertification}>
            <FilePicker
              label={'Nueva certificación'}
              fileType={'pdf'}
              setFileData={setNewCertificationData}
            />

            {newCertificationData && (
              <View styles={styles.viewDescriptionInput}>
                <TextInput
                  style={styles.descriptionInput}
                  value={newCertificationDescription}
                  placeholder="Descripción..."
                  onChangeText={setnewCertificationDescription}
                />
                <Button title="Subir" onPress={handleUploadCertification} />
              </View>
            )}
          </View>
        )}

        {!disableUpload && (
          <TouchableOpacity onPress={handleSaveCertifications} style={styles.btnContainer}>
            <Text style={styles.btnLabel}>Guardar certificaciones</Text>
          </TouchableOpacity>
        )}
        {Boolean(!localCertifications.length) && (
          <Text style={styles.message}>No hay certificaciones subidas todavía</Text>
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

export default Certifications;

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

  certificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  certificationsContainer: {
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
