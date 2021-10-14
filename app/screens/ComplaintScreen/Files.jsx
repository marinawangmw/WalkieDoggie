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

const Files = ({ route, disableUpload }) => {
  const { files } = route.params;
  const [localFiles, setChangeFiles] = useState(files);

  return (
    <>
      <ScrollView style={styles.scrollContainer}>
        {Boolean(localFiles.length) && !disableUpload && <View style={styles.hr} />}
        <View styles={styles.filesContainer}>
          {localFiles && (
            <>
              {localFiles.map((row, rowIdx) => {
                const index = parseInt(rowIdx) + 1;

                return (
                  <View key={rowIdx} style={styles.fileRow}>
                    <Image source={imageIcon} style={styles.icon} />
                    <Text style={[styles.text]} onPress={() => Linking.openURL(row.file_uri)}>
                      {'Archivo ' + index}
                    </Text>
                  </View>
                );
              })}
            </>
          )}
        </View>
      </ScrollView>
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
