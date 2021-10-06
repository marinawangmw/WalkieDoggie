/*import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';

const EditModal = ({ data }) => {
  const [visible, setVisible] = useState(false);
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
          <TextInput value={changeData} defaultValue={data} onChangeText={setChangeData} />
          <CustomButton handleOnclick={() => setVisible(!visible)} buttonLabel="Confirmar" />
        </View>
      </Modal>
    </View>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
*/
