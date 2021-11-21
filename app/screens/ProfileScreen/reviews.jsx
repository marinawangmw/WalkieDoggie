import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { FindResultsList } from 'components/WalkerReviews';
import { getReviews } from '../../services/api/users/reviews';
import { getComplaints } from '../../services/api/complaints/complaints';

const WalkerReviewsScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    const getReviewsData = async () => {
      const { walkerId } = route.params;

      let reviews;

      try {
        reviews = await getReviews(walkerId);

        if (reviews && reviews.data.reviews.length) {
          setReviewsData(reviews.data.reviews);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getReviewsData();
  }, [isFocused, route.params]);

  if (reviewsData) {
    return (
      <View style={styles.container}>
        <View style={styles.findReviewResults}>
          <FindResultsList result={reviewsData} navigation={navigation} />
        </View>
      </View>
    );
  }
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
  findReviewResults: {
    flex: 1,
    width: '100%',
  },
  message: {
    color: '#757575',
    paddingBottom: 5,
  },
});

export default WalkerReviewsScreen;
