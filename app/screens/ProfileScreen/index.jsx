import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import LoadingScreen from 'screens/LoadingScreen';
import { CustomButton, ProfileDataRow, TimeTable } from 'components';
import { editOwner, editWalker, getProfile } from 'services/api/users/profile';
import { editPet } from 'services/api/users/pets';

import { AuthContext } from 'utils/authContext';
import { USER_TYPES } from 'utils/constants';
import { removeProps } from 'helpers/objectHelper';
import { styles, name, personal } from './ProfileScreen.styles';
import { getAchievementsById } from 'utils/achievements';

// eslint-disable-next-line import/no-unresolved
import {
  addressIcon,
  calendarIcon,
  certificationIcon,
  locationIcon,
  priceIcon,
  profileIcon,
  resumeIcon,
  whatsappIcon,
} from 'images';
import Certifications from './Certifications';
import { openWhatsappChat } from 'services/externalApps/whatsapp';

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
  const [changeAllowsTracking, setChangeAllowsTracking] = useState(true);
  const [achievements, setAchievements] = useState([]);

  const toggleSwitch = () => setChangeAllowsTracking((previousState) => !previousState);
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
  }, [changeRanges, setChangeRanges, changeCertifications, setChangeCertifications, route]);

  const initiateUserDatas = (userData, rangesToSet, certificationsToSet) => {
    setCurrentUserProfile(userData);
    setPets(userData.pets);
    setChangeFirstName(userData.first_name);
    setChangeLastName(userData.last_name);
    setChangePhone(userData.phone);
    setChangeAddress(userData.address.description);
    setChangeRanges(rangesToSet);
    setChangeCertifications(certificationsToSet);
    setChangePricePerHour(userData.price_per_hour);
    setChangeCoverLetter(userData.cover_letter);
    setChangeAllowsTracking(userData.allows_tracking);
    setAchievements(userData.achievements);
  };

  const fetchUserProfile = useCallback(async (id, rangesToSet, certificationsToSet) => {
    try {
      const userProfile = await getProfile(id);

      if (userProfile.result) {
        const ranges = rangesToSet || userProfile.result.ranges;
        const certifications = certificationsToSet || userProfile.result.certifications;
        initiateUserDatas(userProfile.data, ranges, certifications);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log('get walker profile error: ', e);
    }
  }, []);

  const getRange = useCallback(
    (rangesToSet) => {
      if (changeRanges && changeRanges.length > 0) {
        return changeRanges;
      }

      return rangesToSet;
    },
    [changeRanges],
  );

  const getCertification = useCallback(
    (certificationsToSet) => {
      if (changeCertifications && changeCertifications.length > 0) {
        return changeCertifications;
      }

      return certificationsToSet;
    },
    [changeCertifications],
  );

  useEffect(() => {
    const { userProfile, userId: walkerId } = route.params;
    let rangesToSet;
    let certificationsToSet;

    //Si se accede al perfil propio desde la Navbar de abajo
    if (userProfile) {
      rangesToSet = getRange(userProfile.ranges);
      certificationsToSet = getCertification(userProfile.certifications);
      setFromHome(true);
      fetchUserProfile(userProfile.id, rangesToSet, certificationsToSet);
    }

    // Si un dueño accede al perfil de un paseador
    if (walkerId) {
      setFromHome(false);
      setLoading(true);
      fetchUserProfile(walkerId, rangesToSet, certificationsToSet);
    }
  }, [route.params, fetchUserProfile, getRange, getCertification]);

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

  const handleNavigateCreateReservation = () => {
    navigation.navigate('createReservation', {
      ranges: currentUserProfile.ranges,
      walkerId: currentUserProfile.id,
    });
  };

  const chatWalker = () => {
    const defaultText = `Hola ${changeFirstName}! Te quería hacer una consulta.`;
    openWhatsappChat(changePhone, defaultText);
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
      userProfileEdited.allows_tracking = changeAllowsTracking;

      removeProps(userProfileEdited, ['id', 'last_login', 'email']);

      const response = await editWalker(userProfileEdited);
      showResultUpdateProfile(response);
    }
  };
  const showBoolAllowsTracking = () => {
    if (changeAllowsTracking) {
      return 'SI';
    }
    return 'NO';
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

  const renderAchievements = () => {
    let items = [];

    achievements.forEach((achievement, index) => {
      items.push(
        <View style={styles.achievementItem}>
          <Image
            source={getAchievementsById(achievement.id)}
            key={'image-' + index}
            style={styles.achievementsIcons}
          />
          <Text style={styles.achievementsLabel}>{achievement.description}</Text>
        </View>,
      );
    });

    return <View style={styles.iconAchievement}>{items}</View>;
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
            disabled={!fromHome}
          />
          <Text>(Precio x hora)</Text>
        </View>

        <View style={styles.iconAndData}>
          <Image source={resumeIcon} style={styles.icon} tintColor="#364C63" />
          <ProfileDataRow
            customStyles={personal}
            value={changeCoverLetter}
            setChangeData={setChangeCoverLetter}
            disabled={!fromHome}
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
          {!fromHome && <TimeTable ranges={currentUserProfile.ranges} isWalkerEdit={false} />}
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

          {currentUserProfile.type === USER_TYPES.WALKER && (
            <>
              <View style={styles.iconAndData}>
                {achievements && achievements.length > 0 && renderAchievements()}
              </View>

              <View style={styles.iconAndData}>
                <Image source={locationIcon} style={styles.icon} tintColor="#364C63" />
                <Text style={styles.allowsTrackingText}>
                  {fromHome
                    ? 'Compartir ubicación en los paseos'
                    : 'Comparte ubicación en los paseos: ' + showBoolAllowsTracking()}
                </Text>

                {fromHome && (
                  <Switch
                    disabled={!fromHome}
                    onValueChange={toggleSwitch}
                    value={changeAllowsTracking}
                  />
                )}
              </View>
            </>
          )}

          <View style={styles.iconAndData}>
            <TouchableOpacity onPress={chatWalker} disabled={fromHome}>
              <Image source={whatsappIcon} style={styles.icon} tintColor="#364C63" />
            </TouchableOpacity>

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

          {currentUserProfile.type === USER_TYPES.OWNER ? renderPets() : renderWalkerSpecialData()}

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
                handleOnclick={handleNavigateCreateReservation}
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
