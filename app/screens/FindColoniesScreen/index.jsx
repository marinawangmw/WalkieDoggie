import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FindResultsList } from 'components/FindCenters';
import { getColonies } from 'services/api/centers/centers';
import { CENTER_TYPE } from 'utils/constants';

const FindColoniesScreen = ({ navigation }) => {
  const [coloniesData, setColoniesData] = useState([]);

  useEffect(() => {
    const getColoniesData = async () => {
      try {
        const response = await getColonies();
        if (response.result) {
          const colonies = response.data.centers;
          setColoniesData(colonies);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getColoniesData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.findColoniesResults}>
        <FindResultsList result={coloniesData} navigation={navigation} type={CENTER_TYPE.COLONY} />
      </View>
    </View>
  );
};

export default FindColoniesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  findColoniesResults: {
    flex: 1,
  },
});
