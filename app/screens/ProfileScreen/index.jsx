import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import { editOwner, editWalker, getProfile } from '../../services/api/users/profile';
import { AuthContext } from '../../utils/authContext';
import { getCurrentUserId } from '../../utils/storage';
import LoadingScreen from '../LoadingScreen';
import { ProfileDataRow } from '../../components';
import { styles, name, personal } from './styles';
import {
  addressIcon,
  phoneIcon,
  profileIcon,
  calendarIcon,
  certificationIcon,
  priceIcon,
  resumeIcon,
} from '../../assets/images';
import { USER_TYPES } from '../../utils/constants';
import { removeProps } from '../../helpers/objectHelper';
import { editPet } from '../../services/api/users/pets';

const ProfileScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const [changeFirstName, setChangeFirstName] = useState('');
  const [changeLastName, setChangeLastName] = useState('');
  const [changePhone, setChangePhone] = useState('');
  const [changeAddress, setChangeAddress] = useState('');
  const [changeRanges, setChangeRanges] = useState([]);
  const [changeCertifications, setChangeCertifications] = useState([]);
  const [pets, setPets] = useState(null);
  const [changePricePerHour, setChangePricePerHour] = useState([]);
  const [changeCoverLetter, setChangeCoverLetter] = useState([]);

  const { signOut } = React.useContext(AuthContext);

  useEffect(() => {
    if (route.params) {
      const { ranges, certifications } = route.params;
      if (ranges && ranges.length > 0) {
        setChangeRanges(ranges);
      }

      if (certifications && certifications.length > 0) {
        setChangeCertifications(certifications);
      }
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
        setChangeFirstName(userProfileResult.data.first_name);
        setChangeLastName(userProfileResult.data.last_name);
        setChangePhone(userProfileResult.data.phone);
        setChangeAddress(userProfileResult.data.address.description);
        setChangeCertifications(userProfileResult.data.certifications);
        setChangeRanges(userProfileResult.data.ranges);
        setChangePricePerHour(userProfileResult.data.price_per_hour);
        setChangeCoverLetter(userProfileResult.data.cover_letter);
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

  const saveInformationPet = async (idx) => {
    const aux = pets.slice();
    const data = aux[idx];
    const { id, ...resParams } = data;
    const response = await editPet(id, resParams);
    if (!response.result) {
      Alert.alert('Error al actualizar datos de la mascota.');
    } else {
      Alert.alert('Los datos de la mascota han sido actualizados.');
    }
  };

  const handleNavigatePetDetails = (pet, idx) => {
    navigation.navigate('petDetail', { pet, handleEditPets, idx, saveInformationPet });
  };

  const handleNavigateRanges = () => {
    navigation.navigate('walkerRanges', {
      ranges: changeRanges,
    });
  };

  const handleNavigateCertifications = () => {
    navigation.navigate('walkerCertifications', {
      certifications: changeCertifications,
    });
  };

  const showResultUpdateProfile = (response) => {
    if (!response.result) {
      Alert.alert('Error al actualizar datos del perfil');
    } else {
      Alert.alert('Los datos del perfil han sido actualizados');
    }
  };

  const handleSaveChangeData = async () => {
    const userProfileEdited = { ...userProfile };
    userProfileEdited.last_name = changeLastName;
    userProfileEdited.first_name = changeFirstName;
    userProfileEdited.address.description = changeAddress;
    userProfileEdited.phone = changePhone;

    if (userProfileEdited.type === USER_TYPES.OWNER) {
      removeProps(userProfileEdited, ['id', 'last_login', 'email']);
      const response = await editOwner(userProfileEdited);
      showResultUpdateProfile(response);
    } else {
      userProfileEdited.price_per_hour = changePricePerHour;
      userProfileEdited.cover_letter = changeCoverLetter;

      userProfileEdited.ranges = changeRanges;
      userProfileEdited.certifications = changeCertifications;

      removeProps(userProfileEdited, ['id', 'last_login', 'email']);

      const response = await editWalker(userProfileEdited);
      showResultUpdateProfile(response);
    }
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
      <>
        <View style={styles.iconAndData}>
          <Image source={priceIcon} style={styles.icon} tintColor="#364C63" />
          <ProfileDataRow
            customStyles={personal}
            value={changePricePerHour.toString()}
            setChangeData={setChangePricePerHour}
          />
          <Text>(Precio x hora)</Text>
        </View>

        <View style={styles.iconAndData}>
          <Image source={resumeIcon} style={styles.icon} tintColor="#364C63" />
          <ProfileDataRow
            customStyles={personal}
            value={changeCoverLetter}
            setChangeData={setChangeCoverLetter}
          />
        </View>
        <TouchableOpacity style={styles.petDataRow} onPress={handleNavigateRanges}>
          <Image source={calendarIcon} style={styles.icon} />
          <Text style={styles.petName}>Franjas horarias de trabajo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.petDataRow} onPress={handleNavigateCertifications}>
          <Image source={certificationIcon} style={styles.icon} />
          <Text style={styles.petName}>Certificaciones</Text>
        </TouchableOpacity>
      </>
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
                  customStyles={name}
                  value={changeFirstName}
                  setChangeData={setChangeFirstName}
                />
                <ProfileDataRow
                  customStyles={name}
                  value={changeLastName}
                  setChangeData={setChangeLastName}
                />
              </View>

              <Text style={styles.email}>{userProfile.email}</Text>
            </View>
          </View>
          <View style={styles.iconAndData}>
            <Image source={phoneIcon} style={styles.icon} tintColor="#364C63" />
            <ProfileDataRow
              customStyles={personal}
              value={changePhone}
              setChangeData={setChangePhone}
            />
          </View>
          <View style={styles.iconAndData}>
            <Image source={addressIcon} style={styles.icon} tintColor="#364C63" />
            <ProfileDataRow
              customStyles={personal}
              value={changeAddress}
              setChangeData={setChangeAddress}
            />
          </View>

          <View style={styles.hr} />

          {userProfile.type === 'OWNER' ? renderPets() : renderWalkerSpecialData()}

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
