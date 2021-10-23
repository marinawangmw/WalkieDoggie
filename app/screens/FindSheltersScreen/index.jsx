import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FindResultsList } from '../../components/FindCenters';
import { getShelters } from '../../services/api/centers/centers';
import { CENTER_TYPE } from '../../utils/constants';

const FindSheltersScreen = ({ navigation }) => {
  const [sheltersData, setSheltersData] = useState([]);

  useEffect(() => {
    const getSheltersData = async () => {
      try {
        const response = await getShelters();
        if (response.result) {
          const shelters = response.data.centers;
          setSheltersData(shelters);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getSheltersData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.findSheltersResults}>
        <FindResultsList result={sheltersData} navigation={navigation} type={CENTER_TYPE.SHELTER} />
      </View>
    </View>
  );
};

export default FindSheltersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  findSheltersResults: {
    flex: 1,
  },
});
