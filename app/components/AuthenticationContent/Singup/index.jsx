import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';

const Signup = ({
  firsName,
  setFirsName,
  lastName,
  setLastName,
  renderEmailAndPassword,
  setUserTypeSelected,
  userTypeSelected,
  handleSignUp,
  handleChangeAuthProcess,
}) => {
  return (
    <>
      <TextInput
        style={styles.authentication__input}
        placeholder="Nombre"
        value={firsName}
        onChange={(e) => setFirsName(e.target.value)}
      />
      <TextInput
        style={styles.authentication__input}
        placeholder="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      {renderEmailAndPassword()}

      <View style={styles.authentication__userTypeContainer}>
        <TouchableOpacity
          onPress={() => setUserTypeSelected('owner')}
          style={[
            styles.authentication__userType,
            {
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
              marginRight: 10,
            },

            userTypeSelected === 'owner' &&
              styles.authentication__userTypeSelected,
          ]}
        >
          <Text
            style={[
              styles.authentication__userTypeText,
              userTypeSelected === 'owner' &&
                styles.authentication__userTypeTextSelected,
            ]}
          >
            Dueño Mascota
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setUserTypeSelected('walker')}
          style={[
            styles.authentication__userType,
            { borderTopRightRadius: 25, borderBottomRightRadius: 25 },
            userTypeSelected === 'walker' &&
              styles.authentication__userTypeSelected,
          ]}
        >
          <Text
            style={[
              styles.authentication__userTypeText,
              userTypeSelected === 'walker' &&
                styles.authentication__userTypeTextSelected,
            ]}
          >
            Paseador
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.authentication__btn}
        type="submit"
        onClick={handleSignUp}
      >
        <Text style={styles.authentication__btnLabel}>Registrarse</Text>
      </TouchableOpacity>

      <View style={styles.authentication__messageContainer}>
        <Text style={styles.authentication__message}>Ya tiene cuenta?</Text>
        <TouchableOpacity onPress={handleChangeAuthProcess}>
          <Text style={styles.authentication__clickable}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Signup;