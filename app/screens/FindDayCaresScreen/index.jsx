import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FindResultsList } from 'components/FindCenters';
import { getDayCares } from 'services/api/centers/centers';
import { CENTER_TYPE } from 'utils/constants';

const FindDayCaresScreen = ({ navigation }) => {
  const [dayCaresData, setDayCaresData] = useState([]);

  useEffect(() => {
    const getDayCaresData = async () => {
      try {
        const response = await getDayCares();
        if (response.result) {
          const dayCares = response.data.centers;
          setDayCaresData(dayCares);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getDayCaresData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.findDayCaresResults}>
        <FindResultsList
          result={dayCaresData}
          navigation={navigation}
          type={CENTER_TYPE.DAY_CARE}
        />
      </View>
    </View>
  );
};

export default FindDayCaresScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  findDayCaresResults: {
    flex: 1,
  },
});
