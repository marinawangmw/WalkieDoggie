import React, { useState } from 'react';
import { View, Text, FlatList, CheckBox } from 'react-native';
import { INSTRUCTION_TYPE } from 'utils/constants';
import { styles } from './styles';

const pickupTypeText = 'Retirar a ';

const PetWalkInstructionsList = ({ data }) => {
  const handleCheck = (item) => {
    if (item.instruction === INSTRUCTION_TYPE.PICK_UP) {
      //send check request
    } else {
      //item.instructions === INSTRUCTION_TYPE.LEAVE
      // cada vez cliqueado mostrar un modal para ingresar codigo y finalizar paseo
    }
  };

  const renderInstructionItem = (item) => {
    const checked = item.item.done;
    // if(item.item.instruction  === INSTRUCTION_TYPE.PICK_UP) {

    // }
    return (
      <View style={styles.item}>
        <CheckBox value={checked} onValueChange={() => handleCheck(item)} style={styles.checkbox} />
        <Text>hi</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList data={data} renderItem={renderInstructionItem} />
    </View>
  );
};

export default PetWalkInstructionsList;
