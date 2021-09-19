import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { CustomButton } from '..';

const ProfileDataRow = ({ data, customStyles, changeData, setChangeData }) => {
  const [visible, setVisible] = useState(false);
  const styles = { ...defaultStyles, ...customStyles };
  useEffect(() => {
    setChangeData(data);
  }, [data, setChangeData]);

  const handlePress = () => {
    setVisible(!visible);
  };

  if (visible) {
    return (
      <View>
        <Modal
          animationType="fade"
          visible={visible}
          onRequestClose={() => {
            setVisible(!visible);
          }}
          transparent
        >
          <View style={styles.modal}>
            <TextInput
              autoFocus
              multiline
              style={styles.editInput}
              value={changeData}
              defaultValue={data}
              placeholder={data}
              onChangeText={setChangeData}
            />
            <CustomButton handleOnclick={() => setVisible(!visible)} buttonLabel="Confirmar" />
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.label}>{changeData}</Text>
    </TouchableOpacity>
  );
};

export default ProfileDataRow;

const defaultStyles = StyleSheet.create({
  label: {
    color: '#364C63',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modal: {
    padding: 15,
    width: '90%',
    marginTop: '50%',
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#f4b445',
    borderWidth: 1,
    borderRadius: 5,
  },
  editInput: {
    margin: 20,
    paddingHorizontal: 5,
    fontSize: 16,
    flexWrap: 'wrap',
    flexGrow: 1,
  },
});
