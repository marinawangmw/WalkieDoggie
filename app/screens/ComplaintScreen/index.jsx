import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './ComplaintScreen.styles';

// eslint-disable-next-line import/no-unresolved
import { imageIcon } from 'images';
import Files from './Files';
import { getComplaints } from 'services/api/complaints/complaints';

const ComplaintScreen = ({ navigation, route }) => {
  const [changeDescription, setChangeDescription] = useState('');
  const [changeFiles, setChangeFiles] = useState([]);

  const handleNavigateComplaintFiles = () => {
    navigation.navigate('seeComplaintFiles', {
      files: changeFiles,
    });
  };

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
      //const complaint = await getComplaint(id);
      const complaints = await getComplaints();

      if (complaints.result) {
        let complaint = complaints.data
          .filter(function (item) {
            return item.id === id;
          })
          .map(function ({ description, complaint_files }) {
            return { description, complaint_files };
          });

        if (complaint) {
          setChangeDescription(complaint[0].description);
          setChangeFiles(complaint[0].complaint_files);
        }
      }
    } catch (e) {
      console.log('get walker profile error: ', e);
    }
  }, []);

  useEffect(() => {
    const { complaintId } = route.params;

    fetchComplaint(complaintId);
  }, [route.params, fetchComplaint]);

  const renderComplaintFiles = () => {
    return (
      <>
        <TouchableOpacity style={styles.petDataRow} onPress={handleNavigateComplaintFiles}>
          <View style={styles.petDataRowTitle}>
            <Image source={imageIcon} style={styles.icon} />
            <Text style={styles.petName}>Archivos</Text>
          </View>
          <Files route={{ params: { files: changeFiles } }} disableUpload />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
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
