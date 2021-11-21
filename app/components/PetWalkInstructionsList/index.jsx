import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  CheckBox,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Modal from 'react-native-modal';
import { INSTRUCTION_TYPE } from 'utils/constants';
import { styles } from './styles';
import Toast from 'react-native-toast-message';
// eslint-disable-next-line import/no-unresolved
import { profileIcon, adaptiveIcon } from 'images';
import { handlePetWalkInstruction } from 'services/api/rides/petWalks';

const PetWalkInstructionsList = ({
  petWalkId,
  data,
  getData,
  setHasPetWalkStarted,
  navigation,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [pickupData, setPickupData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [activeSections, setActiveSections] = useState([0]);
  const [codeInput, setCodeInput] = useState(null);
  const [currentInstruction, setCurrentInstruction] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data && data.length) {
      const pickup = [];
      const leave = [];

      data.map((item) => {
        if (item.instruction === INSTRUCTION_TYPE.PICK_UP) {
          pickup.push({
            message: `Buscar a ${item.pet.name} en ${item.address_description}`,
            originalData: item,
          });
        } else {
          leave.push({
            message: `Dejar a ${item.pet.name} en ${item.address_description}`,
            originalData: item,
          });
        }
      });

      setPickupData(pickup);
      setLeaveData(leave);
    }
  }, [data]);

  useEffect(() => {
    const undoneData = leaveData.filter((item) => !item.originalData.done);

    if (leaveData.length && !undoneData.length) {
      setHasPetWalkStarted(false);
      navigation.goBack();
    }
  }, [leaveData, navigation, setHasPetWalkStarted]);

  useEffect(() => {
    const undoneData = pickupData.filter((item) => !item.originalData.done);
    if (!undoneData.length) {
      setActiveSections([1]);
    }
  }, [pickupData]);

  const SECTIONS = useMemo(
    () => [
      { title: 'Buscar a las mascotas', content: pickupData },
      { title: 'Dejar a las mascotas', content: leaveData },
    ],
    [pickupData, leaveData],
  );

  const toggleModalVisible = () => {
    setShowModal(!showModal);
  };

  const handleFinishInstruction = async () => {
    if (currentInstruction && codeInput) {
      try {
        setIsLoading(true);
        const res = await handlePetWalkInstruction(petWalkId, currentInstruction.id, codeInput);

        if (res.result) {
          await getData(petWalkId);
          setIsLoading(false);
          toggleModalVisible();
        } else if (res.data.errorData.internal_code === 'not_found') {
          setIsLoading(false);
          setErrorMessage('El codigo ingresado no es correcto');

          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'El codigo ingresado no es correcto',
          });
        } else if (res.data.errorData.internal_code === 'forbidden') {
          console.log(res);
          setIsLoading(false);
          setErrorMessage('No puede dejar una mascota antes de haberlo levantado');

          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'No puede dejar una mascota antes de haberlo levantado',
          });
        } else {
          setIsLoading(false);
          console.log(res);
        }
      } catch (e) {
        console.log('catch error update instruction', e);
      }
    }
  };

  const handleShowModal = () => {
    return (
      <View style={styles.modalContainer}>
        <Modal
          hasBackdrop
          backdropOpacity={0.6}
          isVisible={showModal}
          onBackdropPress={toggleModalVisible}
          animationInTiming={1}
          animationIn={'fadeIn'}
          animationOutTiming={1}
          animationOut={'fadeIn'}
        >
          <View style={styles.modal}>
            <Image source={adaptiveIcon} style={styles.logo} />
            <Text style={styles.modalTitle}>Por favor ingrese el código</Text>
            <Text style={styles.modalSubtitle}>Debe solicitarselo al dueño de la mascota</Text>
            <TextInput
              autoFocus
              style={styles.input}
              onChangeText={setCodeInput}
              value={codeInput}
            />
            {Boolean(errorMessage) && <Text style={styles.error}>{errorMessage}</Text>}
            {isLoading && <ActivityIndicator size="large" color="#f8b444" />}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.acceptButton, styles.button]}
                onPress={handleFinishInstruction}
              >
                <Text>Aceptar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button]} onPress={toggleModalVisible}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const handleCheck = (item) => {
    if (item.item.originalData.done) {
      return;
    }

    setCurrentInstruction(item.item.originalData);
    setErrorMessage('');
    setCodeInput('');
    setShowModal(true);
  };

  const renderInstructionItem = (item) => {
    return (
      <View style={styles.item}>
        <CheckBox
          value={item.item.originalData.done}
          onValueChange={() => handleCheck(item)}
          style={styles.checkbox}
        />
        <Text style={styles.itemText}>{item.item.message}</Text>
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <FlatList style={styles.content} data={section.content} renderItem={renderInstructionItem} />
    );
  };

  const renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const updateSections = (sections) => {
    setActiveSections(sections);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={profileIcon} style={styles.icon} />
        <Text style={styles.title}>Instrucciones para el paseo</Text>
      </View>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
        underlayColor="transparent"
      />
      {showModal && handleShowModal()}
    </View>
  );
};

export default PetWalkInstructionsList;
