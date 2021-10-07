import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import LoadingScreen from 'screens/LoadingScreen';
import { CustomButton, ProfileDataRow, TimeTable } from 'components';
import { getProfile, editOwner, editWalker } from 'services/api/users/profile';
import { editPet } from 'services/api/users/pets';

import { AuthContext } from 'utils/authContext';
import { USER_TYPES } from 'utils/constants';
import { removeProps } from 'helpers/objectHelper';
import { styles, name, personal } from './ProfileScreen.styles';

import {
  addressIcon,
  phoneIcon,
  profileIcon,
  calendarIcon,
  certificationIcon,
  priceIcon,
  resumeIcon,
  // eslint-disable-next-line import/no-unresolved
} from 'images';
import Certifications from './Certifications';

const ProfileScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [fromHome, setFromHome] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);

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

  const initiateUserDatas = (userProfile) => {
    setCurrentUserProfile(userProfile);
    setPets(userProfile.pets);
    setChangeFirstName(userProfile.first_name);
    setChangeLastName(userProfile.last_name);
    setChangePhone(userProfile.phone);
    setChangeAddress(userProfile.address.description);
    setChangeCertifications(userProfile.certifications);
    setChangeRanges(userProfile.ranges);
    setChangePricePerHour(userProfile.price_per_hour);
    setChangeCoverLetter(userProfile.cover_letter);
  };

  const fetchUserProfile = useCallback(async (id) => {
    try {
      const userProfile = await getProfile(id);

      if (userProfile.result) {
        initiateUserDatas(userProfile.data);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log('get walker profile error: ', e);
    }
  }, []);

  useEffect(() => {
    const { userProfile, userId } = route.params;

    // NO ESTÁ FUNCANDO ACTUALIZAR RANGES/CERTIFICACIONES POR ESTO DE ABAJO:
    if (userProfile) {
      setFromHome(true);
      initiateUserDatas(userProfile);
    }

    if (userId) {
      setFromHome(false);
      setLoading(true);
      fetchUserProfile(userId);
    }
  }, [route.params, fetchUserProfile]);

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
      Toast.show({
        type: 'error',
        text1: 'Ouch!',
        text2: 'Error al actualizar datos de la mascota.',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Yey!',
        text2: 'Los datos de la mascota han sido actualizados.',
      });
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

  const handleNavigateCreateWalk = () => {
    navigation.navigate('createWalk', {
      ranges: currentUserProfile.ranges,
    });
  };

  const showResultUpdateProfile = (response) => {
    if (!response.result) {
      Toast.show({
        type: 'error',
        text1: 'Ouch!',
        text2: 'Error al actualizar datos del perfil',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Yey!',
        text2: 'Los datos del perfil han sido actualizados',
      });
    }
  };

  const handleSaveChangeData = async () => {
    const userProfileEdited = { ...currentUserProfile };
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

        {currentUserProfile.pets.map((pet, idx) => (
          <TouchableOpacity
            style={styles.petDataRow}
            key={idx}
            onPress={() => handleNavigatePetDetails(pet, idx)}
          >
            <View style={styles.petDataRowTitle}>
              <Image source={profileIcon} style={styles.icon} />
              <Text style={styles.petName}>{pet.name}</Text>
            </View>
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
        <TouchableOpacity
          style={styles.petDataRow}
          onPress={handleNavigateRanges}
          disabled={!fromHome}
        >
          <View style={styles.petDataRowTitle}>
            <Image source={calendarIcon} style={styles.icon} />
            <Text style={styles.petName}>Franjas horarias de trabajo</Text>
          </View>
          {!fromHome && <TimeTable ranges={currentUserProfile.ranges} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.petDataRow}
          onPress={handleNavigateCertifications}
          disabled={!fromHome}
        >
          <View style={styles.petDataRowTitle}>
            <Image source={certificationIcon} style={styles.icon} />
            <Text style={styles.petName}>Certificaciones</Text>
          </View>
          {!fromHome && (
            <Certifications
              route={{ params: { certifications: currentUserProfile.certifications } }}
              disableUpload
            />
          )}
        </TouchableOpacity>
      </>
    );
  };

  if (loading && !isImageLoaded) {
    return <LoadingScreen />;
  }

  if (currentUserProfile) {
    return (
      <SafeAreaView style={[styles.container, !fromHome && { marginVertical: 0 }]}>
        <ScrollView>
          <View style={styles.personal}>
            <Image
              source={{
                uri: currentUserProfile.profile_photo_uri,
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
                  disabled={!fromHome}
                />
                <ProfileDataRow
                  customStyles={name}
                  value={changeLastName}
                  setChangeData={setChangeLastName}
                  disabled={!fromHome}
                />
              </View>

              <Text style={styles.email}>{currentUserProfile.email}</Text>
            </View>
          </View>
          <View style={styles.iconAndData}>
            <Image source={phoneIcon} style={styles.icon} tintColor="#364C63" />
            <ProfileDataRow
              customStyles={personal}
              value={changePhone}
              setChangeData={setChangePhone}
              disabled={!fromHome}
            />
          </View>
          <View style={styles.iconAndData}>
            <Image source={addressIcon} style={styles.icon} tintColor="#364C63" />
            <ProfileDataRow
              customStyles={personal}
              value={changeAddress}
              setChangeData={setChangeAddress}
              disabled={!fromHome}
            />
          </View>

          <View style={styles.hr} />

          {currentUserProfile.type === 'OWNER' ? renderPets() : renderWalkerSpecialData()}

          <View style={styles.hr} />

          {fromHome ? (
            <>
              <TouchableOpacity style={styles.btnContainer} onPress={handleSaveChangeData}>
                <Text style={[styles.btnLabel, { color: '#0662c2' }]}>Guardar cambios</Text>
              </TouchableOpacity>

              <View style={styles.hr} />

              <TouchableOpacity style={styles.btnContainer} onPress={() => signOut()}>
                <Text style={styles.btnLabel}>Cerrar sesión</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.btn}>
              <CustomButton
                buttonLabel="Quiero un paseo"
                handleOnclick={handleNavigateCreateWalk}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
  return null;
};

export default ProfileScreen;
