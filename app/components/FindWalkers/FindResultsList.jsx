import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { inactiveStar, star, user } from 'images';

const FindResultsList = ({ result, navigation }) => {
  const handleNavigateProfile = (userId) => {
    navigation.navigate('profile', { userId });
  };

  const renderScores = (scores) => {
    if (scores) {
      return (
        <View style={styles.scoreContainer}>
          <View style={styles.iconContainer}>
            <Image source={star} style={styles.scoreIcon} />
          </View>
          <Text>{scores}</Text>
        </View>
      );
    }

    return (
      <View style={styles.iconContainer}>
        <Image source={inactiveStar} style={[styles.scoreIcon, { tintColor: '#757575' }]} />
      </View>
    );
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => handleNavigateProfile(item.item.id)}
        style={styles.container}
      >
        <View style={styles.picContainer}>
          <Image
            source={
              item.item.profile_photo_uri
                ? {
                    uri: item.item.profile_photo_uri,
                  }
                : user
            }
            style={item.item.profile_photo_uri ? styles.pic : styles.noProfilePic}
          />
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.text}>{item.item.first_name + ' ' + item.item.last_name}</Text>
          {renderScores(item.item.score)}
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
  noProfilePic: {
    height: 50,
    width: 50,
    tintColor: '#757575',
  },
  text: {
    fontSize: 16,
    color: '#364C63',
    textTransform: 'capitalize',
  },
  dataContainer: {
    justifyContent: 'center',
  },
  scoreContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  scoreIcon: {
    height: 15,
    width: 15,
  },
});

export default FindResultsList;
