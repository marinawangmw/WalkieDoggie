import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import { getProfile } from '../../services/api/users/profile';
import { AuthContext } from '../../utils/authContext';
import { getCurrentUserId } from '../../utils/storage';
import LoadingScreen from '../LoadingScreen';
import { CustomButton, ProfileDataRow } from '../../components';
import { styles, name, personal } from './styles';
import { addressIcon, phoneIcon, profileIcon, calendarIcon } from '../../assets/images';

const ProfileScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const [changeFirstName, setChangeFirstName] = useState('');
  const [changeLastName, setChangeLastName] = useState('');
  const [changePhone, setChangePhone] = useState('');
  const [changeAddress, setChangeAddress] = useState('');
  const [changeRanges, setChangeRanges] = useState([]);

  const [pets, setPets] = useState(null);

  const { signOut } = React.useContext(AuthContext);

  useEffect(() => {
    if (route.params) {
      const newRanges = route.params.ranges;
      setChangeRanges(newRanges);
    }
  }, [route]);

  useEffect(() => {
    const getUserProfileInfo = async () => {
      try {
        setLoading(true);
        const userId = await getCurrentUserId();

        const userProfileResult = await getProfile(userId);
        setUserProfile(userProfileResult.data);
        setPets(userProfileResult.data.pets);

        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log('Error in profile ', e);
      }
    };

    getUserProfileInfo();
  }, []);

  const handleImageLoadEnd = () => {
    if (!isImageLoaded) {
      setIsImageLoaded(true);
    }
  };

  const handleEditPets = (input, idx, dataLabel) => {
    const aux = pets.slice();
    aux[idx][dataLabel] = input;
    setPets(aux);
  };

  const handleNavigatePetDetails = (pet, idx) => {
    navigation.navigate('petDetail', { pet, handleEditPets, idx });
  };

  const handleNavigateRanges = () => {
    setChangeRanges(userProfile.ranges);
    navigation.navigate('walkerRanges', {
      ranges: userProfile.ranges,
    });
  };

  const handleSaveChangeData = () => {
    if (userProfile.type === 'OWNER') {
      // quizas validar datos y sacar id de los pets
      // agarrar pets + userprofile y mandar a services/editProfile
    } else {
      // quizas validar datos y sacar id de los ranges
      // agarrar ranges + userprofile y mandar a services/editPorfile
    }
    // mostrar alert una vez guardada
  };

  const renderPets = () => {
    return (
      <View>
        <Text style={styles.petTitle}>Información sobre mascotas</Text>

        {userProfile.pets.map((pet, idx) => (
          <TouchableOpacity
            style={styles.petDataRow}
            key={idx}
            onPress={() => handleNavigatePetDetails(pet, idx)}
          >
            <Image source={profileIcon} style={styles.icon} />
            <Text style={styles.petName}>{pet.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const renderWalkerSpecialData = () => {
    return (
      <TouchableOpacity style={styles.petDataRow} onPress={handleNavigateRanges}>
        <Image source={calendarIcon} style={styles.icon} />
        <Text style={styles.petName}>Franjas horarias de trabajo</Text>
      </TouchableOpacity>
    );
  };

  if (loading && !isImageLoaded) {
    return <LoadingScreen />;
  }

  if (userProfile) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.personal}>
            <Image
              source={{
                uri: userProfile.profile_photo_uri,
              }}
              style={styles.picture}
              onLoadEnd={handleImageLoadEnd}
            />

            <View style={styles.personalRight}>
              <View style={styles.nameContainer}>
                <ProfileDataRow
                  data={changeFirstName || userProfile.first_name}
                  customStyles={name}
                  changeData={changeFirstName}
                  setChangeData={setChangeFirstName}
                />
                <ProfileDataRow
                  data={userProfile.last_name}
                  customStyles={name}
                  changeData={changeLastName}
                  setChangeData={setChangeLastName}
                />
              </View>

              <Text style={styles.email}>{userProfile.email}</Text>
            </View>
          </View>
          <View style={styles.iconAndData}>
            <Image source={phoneIcon} style={styles.icon} tintColor="#364C63" />
            <ProfileDataRow
              data={userProfile.phone}
              customStyles={personal}
              changeData={changePhone}
              setChangeData={setChangePhone}
            />
          </View>
          <View style={styles.iconAndData}>
            <Image source={addressIcon} style={styles.icon} tintColor="#364C63" />
            <ProfileDataRow
              data={userProfile.address.description}
              customStyles={personal}
              changeData={changeAddress}
              setChangeData={setChangeAddress}
            />
          </View>

          <View style={styles.hr} />

          {userProfile.type === 'OWNER' ? renderPets() : renderWalkerSpecialData()}
          {/* walker - certification */}
          {/* walker - achievements */}

          <View style={styles.hr} />

          <TouchableOpacity style={styles.btnContainer} onPress={handleSaveChangeData}>
            <Text style={[styles.btnLabel, { color: '#0662c2' }]}>Guardar cambios</Text>
          </TouchableOpacity>

          <View style={styles.hr} />

          <TouchableOpacity style={styles.btnContainer} onPress={() => signOut()}>
            <Text style={styles.btnLabel}>Cerrar sesión</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return null;
};

export default ProfileScreen;
