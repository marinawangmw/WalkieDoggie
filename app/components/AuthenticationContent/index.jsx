import React, { useState } from 'react';
import Login from './Login';
import Signup from './Singup';
import SvgUri from 'react-native-svg-uri';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';

const AuthenticationContent = () => {
  const [firsName, setFirsName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(true);
  const [userTypeSelected, setUserTypeSelected] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const clearInput = () => {
    setFirsName('');
    setLastName('');
    setConfirmPassword('');
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };

  const handleLogIn = () => {};
  const handleSignUp = () => {};

  const handleChangeAuthProcess = () => {
    setHasAccount(!hasAccount);
  };

  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    setEmail(text);

    if (email.length > 0 && reg.test(text) === false) {
      setEmailError('El mail ingresado no es correcto');
    } else {
      setEmailError('');
    }
  };

  const togglePasswordVisibility = () => {
    setHidePassword((prevHidePassword) => !prevHidePassword);
  };

  const handleConfirmPassword = (text) => {
    setConfirmPassword(text);

    if (confirmPassword.length > 0 && password != text) {
      setConfirmPasswordError('Las claves ingresadas no coinciden');
    } else {
      clearErrors();
    }
  };

  const renderEmailAndPassword = () => (
    <>
      <TextInput
        placeholder="Email"
        required
        style={styles.authentication__input}
        value={email}
        textContentType="emailAddress"
        onChangeText={validateEmail}
      />
      {Boolean(emailError) && (
        <Text style={styles.authentication__errorMsg}>{emailError}</Text>
      )}

      <View>
        <TextInput
          textContentType="password"
          secureTextEntry={hidePassword}
          style={styles.authentication__input}
          placeholder="Clave"
          required
          value={password}
          onChangeText={setPassword}
        />

        {hasAccount && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            {hidePassword ? (
              <SvgUri
                width="25"
                height="25"
                source={require('../../assets/invisible.svg')}
                style={styles.authentication__pwVisibility}
              />
            ) : (
              <SvgUri
                width="25"
                height="25"
                source={require('../../assets/visible.svg')}
                style={styles.authentication__pwVisibility}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      {Boolean(passwordError) && (
        <Text style={styles.authentication__errorMsg}>{passwordError}</Text>
      )}

      {!hasAccount && (
        <>
          <TextInput
            textContentType="password"
            secureTextEntry
            style={styles.authentication__input}
            placeholder="Confirmar clave"
            required
            value={confirmPassword}
            onChangeText={handleConfirmPassword}
          />

          {Boolean(confirmPasswordError) && (
            <Text style={styles.authentication__errorMsg}>
              {confirmPasswordError}
            </Text>
          )}
        </>
      )}
    </>
  );

  return (
    <>
      {hasAccount ? (
        <Login
          renderEmailAndPassword={renderEmailAndPassword}
          handleLogIn={handleLogIn}
          handleChangeAuthProcess={handleChangeAuthProcess}
        />
      ) : (
        <Signup
          renderEmailAndPassword={renderEmailAndPassword}
          firsName={firsName}
          setFirsName={setFirsName}
          lastName={lastName}
          setLastName={setLastName}
          setUserTypeSelected={setUserTypeSelected}
          userTypeSelected={userTypeSelected}
          handleSignUp={handleSignUp}
          handleChangeAuthProcess={handleChangeAuthProcess}
        />
      )}
    </>
  );
};

export default AuthenticationContent;
