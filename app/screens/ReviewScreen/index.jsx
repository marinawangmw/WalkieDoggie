import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TextInput } from 'react-native';
import { styles } from './ReviewScreen.styles';

import Toast from 'react-native-toast-message';
import StarRating from 'react-native-star-rating';
import { CustomButton } from '../../components';
import { createReview } from '../../services/api/review/review';

const ReviewScreen = ({ navigation, route }) => {
  const handleNavigateHome = () => {
    navigation.navigate('home');
  };

  const handleReview = async () => {
    if (validateDescription(changeOpinion)) {
      let review = {};

      review.score = changeStarValue;
      review.description = changeOpinion;
      review.petWalkId = changePetWalkId;

      const response = await createReview(review);
      showResultCreateReview(response);
    }
  };

  const showResultCreateReview = (response) => {
    if (!response.result) {
      Toast.show({
        type: 'error',
        text1: 'Ouch!',
        text2: 'Error al realizar la calificación',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Yey!',
        text2: 'La calificación fue realizada correctamente',
      });

      handleNavigateHome();
    }
  };

  const [changeStarValue, setChangeStarValue] = useState(1);
  const [changeOpinion, setChangeOpinion] = useState('');
  const [changeFirstName, setChangeFirstName] = useState('');
  const [changeLastName, setChangeLastName] = useState('');
  const [changePetWalkId, setChangePetWalkId] = useState(0);
  const [changeFiles, setChangeFiles] = useState([]);
  const [descriptionError, setDescriptionError] = useState('');

  useEffect(() => {
    if (route.params) {
      const { files } = route.params;

      if (files && files.length > 0) {
        setChangeFiles(files);
      }
    }
  }, [changeFiles, setChangeFiles, route]);

  const ratingCompleted = (rating) => {
    setChangeStarValue(rating);
  };

  useEffect(() => {
    const { changePetWalkId, changeFirstName, changeLastName } = route.params;
    console.log(changePetWalkId);
    setChangePetWalkId(changePetWalkId);
    setChangeFirstName(changeFirstName);
    setChangeLastName(changeLastName);
  }, [route.params]);

  const validateDescription = (text) => {
    setChangeOpinion(text);

    if (changeOpinion && changeOpinion.length > 0) {
      setDescriptionError('');

      return true;
    } else {
      setDescriptionError('Debe ingresar una opinión');

      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Image source={26} style={styles.picture} />

        <Text style={styles.reviewName}>¡Calificá a {changeFirstName + ' ' + changeLastName}!</Text>

        <StarRating
          containerStyle={styles.starContainer}
          disabled={false}
          maxStars={5}
          starSize={50}
          emptyStarColor="#000000"
          fullStarColor="#E5DD00"
          rating={changeStarValue}
          selectedStar={ratingCompleted}
        />

        <Text style={styles.opinion}>Contanos tu experiencia con {changeFirstName}</Text>

        <TextInput
          style={styles.message}
          multiline={true}
          onChangeText={validateDescription}
          placeholder="Compartí tu experiencia"
          value={changeOpinion}
        />

        {Boolean(descriptionError) && (
          <Text style={styles.authentication__errorMsg}>{descriptionError}</Text>
        )}

        <View style={styles.btn}>
          <CustomButton buttonLabel="Calificar" handleOnclick={handleReview} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewScreen;
