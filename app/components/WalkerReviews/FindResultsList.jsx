import React from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { formatDate } from '../../utils/dates';
import StarRating from 'react-native-star-rating';

const FindResultsList = ({ result }) => {
  const renderItem = (item) => {
    console.log('item: ', item.item);
    return (
      <View style={styles.container}>
        <Text style={styles.textReviewer}>
          {item.item.reviewer.first_name + ' ' + item.item.reviewer.last_name}
        </Text>

        <Text style={styles.text}>Fecha: {formatDate(item.item.created_at)}</Text>

        <View style={styles.scoreContainer}>
          <Text style={styles.textReview}>Calificación: </Text>

          <StarRating
            disabled={true}
            maxStars={5}
            starSize={20}
            emptyStarColor="#000000"
            fullStarColor="#E5DD00"
            rating={item.item.score}
          />
        </View>

        <Text style={styles.message} multiline={true}>
          {item.item.description}
        </Text>

        <View style={styles.hr} />
      </View>
    );
  };

  if (!result || result.length === 0) {
    return <Text style={styles.noComplaints}>No hay calificaciones cargadas todavía</Text>;
  }
  return (
    <FlatList data={result} renderItem={renderItem} keyExtractor={(_item, idx) => idx.toString()} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginVertical: 10,
  },
  scoreContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  message: {
    padding: 20,
    margin: 10,
    color: 'black',
    borderWidth: 1,
    backgroundColor: '#fff',
    textAlign: 'left',
    borderColor: '#f4d7a3',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: '#364C63',
    textTransform: 'capitalize',
  },
  textReviewer: {
    fontSize: 24,
    color: '#364C63',
    textTransform: 'capitalize',
    marginBottom: 15,
  },
  textReview: {
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
  noComplaints: {
    fontSize: 16,
    marginTop: 20,
    marginLeft: 30,
  },
  hr: {
    paddingVertical: 10,
    marginTop: 20,
    borderBottomColor: '#bfbfbf',
    borderBottomWidth: 1,
  },
});

export default FindResultsList;
