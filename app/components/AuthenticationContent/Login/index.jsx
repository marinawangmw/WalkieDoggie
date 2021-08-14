import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

const Login = ({ errorMessage, renderEmailAndPassword, handleLogIn, handleChangeAuthProcess }) => {
  return (
    <>
      {renderEmailAndPassword()}
      <View>
        <TouchableOpacity style={styles.authentication__btn} type="submit" onPress={handleLogIn}>
          <Text style={styles.authentication__btnLabel}>Iniciar Sesión</Text>
        </TouchableOpacity>
        {Boolean(errorMessage) && (
          <Text style={styles.authentication__errorMsg}>{errorMessage}</Text>
        )}
      </View>

      <View style={styles.authentication__messageContainer}>
        <Text style={styles.authentication__message}>Todavía no tiene cuenta?</Text>
        <TouchableOpacity onPress={handleChangeAuthProcess}>
          <Text style={styles.authentication__clickable}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Login;
