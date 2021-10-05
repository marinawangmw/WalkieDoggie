import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { getWalkers } from 'services/api/users/walkers';
import { FilterDropdown, SearchInput, FindResultsList } from 'components/FindWalkers';

const FindWalkerScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [walkersData, setWalkersData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('score');

  useEffect(() => {
    const getWalkersData = async () => {
      let walkers;
      if (input.length > 2) {
        walkers = await getWalkers({ complete_name: input });
      } else {
        walkers = await getWalkers();
      }

      if (walkers && walkers.data.walkers.length) {
        setWalkersData(walkers.data.walkers);
      }
    };

    getWalkersData();
  }, [input]);

  if (walkersData) {
    return (
      <View style={styles.container}>
        <View style={styles.filterBanner}>
          <SearchInput input={input} setInput={setInput} />
        </View>
        {/* <View style={styles.filterBanner}>
          <FilterDropdown selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
        </View> */}
        <View style={styles.findWalkerResults}>
          <FindResultsList result={walkersData} navigation={navigation} />
        </View>
      </View>
    );
  }

  return null;
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
  findWalkerResults: {
    flex: 1,
    width: '100%',
  },
});

export default FindWalkerScreen;
