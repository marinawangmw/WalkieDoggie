import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, Linking } from 'react-native';
import { styles } from './ComplaintScreen.styles';
import { styles as fileStyles } from './ComplaintFiles.styles';

// eslint-disable-next-line import/no-unresolved
import { imageIcon } from 'images';
import { getComplaint } from '../../services/api/complaints/complaints';
import { formatDate } from '../../utils/dates';

const ComplaintScreen = ({ navigation, route }) => {
  const [changeDescription, setChangeDescription] = useState('');
  const [changeCreationDate, setChangeCreationDate] = useState('');

  const [changeFiles, setChangeFiles] = useState([]);

  useEffect(() => {
    if (route.params) {
      const { files } = route.params;

      if (files && files.length > 0) {
        setChangeFiles(files);
      }
    }
  }, [changeFiles, setChangeFiles, route]);

  const fetchComplaint = useCallback(async (id) => {
    try {
      const response = await getComplaint(id);
      if (response.result) {
        const complaint = response.data;
        setChangeDescription(complaint.description);
        setChangeCreationDate(formatDate(complaint.created_at));
        setChangeFiles(complaint.complaint_files);
      }
    } catch (e) {
      console.log('get complaint error: ', e);
    }
  }, []);

  useEffect(() => {
    const { complaintId } = route.params;

    fetchComplaint(complaintId);
  }, [route.params, fetchComplaint]);

  const renderComplaintFiles = () => {
    return (
      <>
        <ScrollView style={fileStyles.scrollContainer}>
          <View styles={fileStyles.filesContainer}>
            {changeFiles && (
              <>
                {changeFiles.map((row, rowIdx) => {
                  const index = parseInt(rowIdx) + 1;

                  return (
                    <View key={rowIdx} style={fileStyles.fileRow}>
                      <Image source={imageIcon} style={fileStyles.icon} />
                      <Text style={[fileStyles.text]} onPress={() => Linking.openURL(row.file_uri)}>
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.complaintDate}> Fecha de la denuncia: {changeCreationDate}</Text>

        <Text style={styles.complaintDescription}> Descripción de la denuncia:</Text>
        <Text style={styles.message} multiline={true}>
          {changeDescription}
        </Text>

        <View style={styles.hr} />

        {renderComplaintFiles()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ComplaintScreen;
