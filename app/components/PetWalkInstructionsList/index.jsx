import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, CheckBox } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Modal from 'react-native-modal';
import { INSTRUCTION_TYPE } from 'utils/constants';
import { styles } from './styles';

const pickupTypeText = 'Retirar a: ';
const leaveTypeText = 'Dejar a: ';

const PetWalkInstructionsList = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [pickupData, setPickupData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (data.length) {
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
          {/* <View style={styles.modal}>{pendingWalks.map((walk, idx) => card(walk, idx))}</View> */}
        </Modal>
      </View>
    );
  };

  const handleCheck = (item) => {
    if (item.instruction === INSTRUCTION_TYPE.PICK_UP) {
      //send check request
    } else {
      //item.instructions === INSTRUCTION_TYPE.LEAVE
      // cada vez cliqueado mostrar un modal para ingresar codigo y finalizar paseo
    }
  };

  const renderInstructionItem = (item) => {
    return (
      <View style={styles.item}>
        <CheckBox
          value={item.item.originalData.checked}
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
    <Accordion
      sections={SECTIONS}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={updateSections}
      underlayColor="transparent"
    />
  );
};

export default PetWalkInstructionsList;
