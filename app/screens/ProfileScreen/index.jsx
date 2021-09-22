import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { editOwner, editWalker } from '../../services/api/users/profile';
import { AuthContext } from '../../utils/authContext';
import LoadingScreen from '../LoadingScreen';
import { ProfileDataRow } from '../../components';
import { styles, name, personal } from './styles';
import {
  addressIcon,
  phoneIcon,
  profileIcon,
  calendarIcon,
  certificationIcon,
} from '../../assets/images';
import { USER_TYPES } from '../../utils/constants';
import { removeProps } from '../../helpers/objectHelper';

const ProfileScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);

  const [changeFirstName, setChangeFirstName] = useState('');
  const [changeLastName, setChangeLastName] = useState('');
  const [changePhone, setChangePhone] = useState('');
  const [changeAddress, setChangeAddress] = useState('');
  const [changeRanges, setChangeRanges] = useState([]);
  const [changeCertifications, setChangeCertifications] = useState([]);

  const [pets, setPets] = useState(null);

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
    const { userProfile } = route.params;
    if (userProfile) {
      setCurrentUserProfile(userProfile);
      setPets(userProfile.pets);
      setChangeFirstName(userProfile.first_name);
      setChangeLastName(userProfile.last_name);
      setChangePhone(userProfile.phone);
      setChangeAddress(userProfile.address.description);
      setChangeCertifications(userProfile.certifications);
      setChangeRanges(userProfile.ranges);
    }
  }, [route.params]);

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
    const userProfileEdited = { ...currentUserProfile };
    userProfileEdited.last_name = changeLastName;
    userProfileEdited.first_name = changeFirstName;
    userProfileEdited.address.description = changeAddress;
    userProfileEdited.phone = changePhone;

    if (userProfileEdited.type === USER_TYPES.OWNER) {
      // quizas validar datos y sacar id de los pets
      // agarrar pets + userprofile y mandar a services/editProfile

      removeProps(userProfileEdited, ['id', 'last_login', 'email']);
      const response = await editOwner(userProfileEdited);
      showResultUpdateProfile(response);
    } else {
      //TODO: Validar ranges

      userProfileEdited.ranges = changeRanges;
      userProfileEdited.certifications = changeCertifications;

      removeProps(userProfileEdited, ['id', 'last_login', 'email']);

      const response = await editWalker(userProfileEdited);
      showResultUpdateProfile(response);
    }
    // mostrar alert una vez guardada
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

  if (currentUserProfile) {
    return (
      <SafeAreaView style={styles.container}>
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
                />
                <ProfileDataRow
                  customStyles={name}
                  value={changeLastName}
                  setChangeData={setChangeLastName}
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

          {currentUserProfile.type === 'OWNER' ? renderPets() : renderWalkerSpecialData()}

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
