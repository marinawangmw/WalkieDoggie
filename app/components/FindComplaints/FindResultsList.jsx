import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { complaintFile } from 'images';

const FindResultsList = ({ result, navigation }) => {
  const handleNavigateComplaint = (complaintId) => {
    navigation.navigate('complaint', { complaintId });
  };

  const renderDescription = (description) => {
    if (description.length < 30) {
      return (
        <View style={styles.descriptionContainer}>
          <Text>{description}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.descriptionContainer}>
          <Text>{description.substr(0, 30) + '...'}</Text>
        </View>
      );
    }
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => handleNavigateComplaint(item.item.id)}
        style={styles.container}
      >
        <View style={styles.picContainer}>
          <Image source={complaintFile} style={styles.pic} />
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.text}>
            {item.item.reporter.first_name + ' ' + item.item.reporter.last_name}
          </Text>
          {renderDescription(item.item.description)}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList data={result} renderItem={renderItem} keyExtractor={(_item, idx) => idx.toString()} />
  );
};

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
    marginRight: 20,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic: {
    height: 80,
    width: 80,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  text: {
    fontSize: 16,
    color: '#364C63',
    textTransform: 'capitalize',
  },
  dataContainer: {
    justifyContent: 'center',
  },
  descriptionContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FindResultsList;
