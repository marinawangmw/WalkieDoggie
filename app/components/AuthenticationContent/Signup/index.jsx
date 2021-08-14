import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';

const Signup = ({
  errorMessage,
  firstName,
  setFirstName,
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
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.authentication__input}
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
      />
      {renderEmailAndPassword()}

      <View style={styles.authentication__userTypeContainer}>
        <TouchableOpacity
          onPress={() => setUserTypeSelected('OWNER')}
          style={[
            styles.authentication__userType,
            {
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
              marginRight: 10,
            },

            userTypeSelected === 'OWNER' && styles.authentication__userTypeSelected,
          ]}
        >
          <Text
            style={[
              styles.authentication__userTypeText,
              userTypeSelected === 'OWNER' && styles.authentication__userTypeTextSelected,
            ]}
          >
            Dueño Mascota
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setUserTypeSelected('WALKER')}
          style={[
            styles.authentication__userType,
            { borderTopRightRadius: 25, borderBottomRightRadius: 25 },
            userTypeSelected === 'WALKER' && styles.authentication__userTypeSelected,
          ]}
        >
          <Text
            style={[
              styles.authentication__userTypeText,
              userTypeSelected === 'WALKER' && styles.authentication__userTypeTextSelected,
            ]}
          >
            Paseador
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.authentication__btn} type="submit" onPress={handleSignUp}>
        <Text style={styles.authentication__btnLabel}>Registrarse</Text>
      </TouchableOpacity>

      {Boolean(errorMessage) && <Text style={styles.authentication__errorMsg}>{errorMessage}</Text>}

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
