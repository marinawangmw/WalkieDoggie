import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { FindResultsList } from 'components/FindComplaints';
import { getComplaints } from 'services/api/complaints/complaints';

const FindComplaintsScreen = ({ navigation }) => {
  const handleNavigateCreateComplaint = () => {
    navigation.navigate('createComplaint');
  };

  const [complaintsData, setComplaintsData] = useState([]);

  useEffect(() => {
    const getComplaintsData = async () => {
      let complaints;

      try {
        complaints = await getComplaints();

        if (complaints && complaints.data.length) {
          setComplaintsData(complaints.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getComplaintsData();
  });

  if (complaintsData) {
    return (
      <View style={styles.container}>
        <View style={styles.filterBanner}>
          <Button title="Crear denuncia" onPress={() => handleNavigateCreateComplaint()} />
        </View>
        <View style={styles.findComplaintResults}>
          <FindResultsList result={complaintsData} navigation={navigation} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterBanner}>
        <Button title="Crear denuncia" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20,
    paddingBottom: 0,
  },
  filterBanner: {
    marginVertical: 5,
  },
  findComplaintResults: {
    flex: 1,
    width: '100%',
  },
  message: {
    color: '#757575',
    paddingBottom: 5,
  },
});

export default FindComplaintsScreen;
