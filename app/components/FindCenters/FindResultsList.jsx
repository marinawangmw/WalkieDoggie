import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { shelter, petBoarding, colonies } from 'images';
import { CENTER_TYPE } from '../../utils/constants';
const { SHELTER, DAY_CARE, COLONY } = CENTER_TYPE;

const FindResultsList = ({ result, navigation, type }) => {
  const handleNavigateCenter = (centerId) => {
    navigation.navigate('centerDetails', { centerId, image: getImage() });
  };
  const getImage = () => {
    switch (type) {
      case DAY_CARE:
        return petBoarding;
      case SHELTER:
        return shelter;
      case COLONY:
        return colonies;
      default:
        throw new Error('Invalid center type');
    }
  };
  const renderItem = (item) => {
    const elem = item.item;
    return (
      <TouchableOpacity style={styles.container} onPress={() => handleNavigateCenter(elem.id)}>
        <View style={styles.picContainer}>
          <Image source={getImage()} style={styles.pic} />
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.text}>Nombre: {elem.name}</Text>
          <Text style={styles.text}>Teléfono: {elem.phone}</Text>
          <Text style={styles.text}>Dirección: {elem.address.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList data={result} renderItem={renderItem} keyExtractor={(_item, idx) => idx.toString()} />
  );
};

export default FindResultsList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  picContainer: {
    marginRight: 10,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  text: {
    // fontSize: 16,
    color: '#364C63',
    textTransform: 'capitalize',
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
  },
  dataContainer: {
    justifyContent: 'center',
    fontSize: 14,
    flex: 1,
  },
  noCenters: {
    fontSize: 16,
    marginTop: 20,
    marginLeft: 30,
  },
});
