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
} from 'react-native';
import { FilePicker, FileOpener } from 'components';
import { uploadFileAws } from 'utils/aws';
// eslint-disable-next-line import/no-unresolved
import { certificationIcon } from 'images';

const Certifications = ({ navigation, route, disableUpload }) => {
  const { certifications = [] } = route.params;
  const [localCertifications, setChangeCertifications] = useState(certifications);
  const [newCertificationData, setNewCertificationData] = useState(null);
  const [newCertificationDescription, setnewCertificationDescription] = useState(null);

  const handleUploadCertification = () => {
    return uploadFileAws(newCertificationData)
      .then((url) => {
        setChangeCertifications([
          ...localCertifications,
          { file_uri: url, description: newCertificationDescription },
        ]);

        setNewCertificationData(null);
        setnewCertificationDescription(null);
      })
      .catch((e) => console.error(e));
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

        <View style={styles.data}>
          {localCertifications &&
            localCertifications.map((row, rowIdx) => {
              return (
                <View key={rowIdx} style={styles.certificationRow}>
                  <Image source={certificationIcon} style={styles.icon} />
                  <Text> {row.description} </Text>
                  <FileOpener url={row.file_uri} label={'Ver'} />
                </View>
              );
            })}
        </View>
        {Boolean(localCertifications.length) && !disableUpload && <View style={styles.hr} />}

        <View style={styles.viewAddNewCertification}>
          {!disableUpload && (
            <FilePicker
              label={'Nueva certificación'}
              fileType={'pdf'}
              setFileData={setNewCertificationData}
            />
          )}

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
        {!disableUpload && (
          <TouchableOpacity onPress={handleSaveCertifications} style={styles.btnContainer}>
            <Text style={styles.btnLabel}>Guardar certificaciones</Text>
          </TouchableOpacity>
        )}

        {Boolean(!localCertifications.length) && (
          <Text style={styles.message}>No hay certificaciones subidas todavía</Text>
        )}
      </ScrollView>
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
