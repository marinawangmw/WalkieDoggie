import React, { useEffect, useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import SvgUri from 'react-native-svg-uri';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { login } from '../../services/api/sessions/login';
import { signUp } from '../../services/api/sessions/signUp';
import styles from './styles';

const AuthenticationContent = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasAccount, setHasAccount] = useState(true);
  const [userTypeSelected, setUserTypeSelected] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [pending, setPending] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);

  const clearInput = () => {
    setFirstName('');
    setLastName('');
    setConfirmPassword('');
    setEmail('');
    setPassword('');
    setUserTypeSelected('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setErrorMessage('');
  };

  useEffect(() => {
    clearInput();
    clearErrors();
  }, [hasAccount]);

  const handleLogIn = async () => {
    if (Boolean(email) && Boolean(password)) {
      setPending(true);

      const res = await login({ email, password });

      if (!res.result) {
        setPending(false);
        setSubmitFailed(true);
        setPasswordError('Error en el email o en la clave ingresada');
      } else {
        setPending(false);
        return navigation.replace('Home');
      }
    } else {
      setErrorMessage('Por favor verifique los datos ingresados');
    }
  };

  const handleSignUp = async () => {
    if (
      Boolean(firstName) &&
      Boolean(lastName) &&
      Boolean(email) &&
      Boolean(password) &&
      Boolean(confirmPassword) &&
      Boolean(!confirmPasswordError) &&
      Boolean(!emailError) &&
      Boolean(userTypeSelected)
    ) {
      setPending(true);
      const res = await signUp({
        type: userTypeSelected,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      if (res.result) {
        setPending(false);
        return navigation.replace('Onboarding');
      } else {
        setPending(false);
        setSubmitFailed(true);
      }
    } else {
      setErrorMessage('Algo esta mal');
    }
  };

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
        autoCapitalize="none"
      />
      {Boolean(emailError) && <Text style={styles.authentication__errorMsg}>{emailError}</Text>}

      <View>
        <TextInput
          secureTextEntry={hidePassword}
          style={styles.authentication__input}
          placeholder="Clave"
          required
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
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
            secureTextEntry
            style={styles.authentication__input}
            placeholder="Confirmar clave"
            required
            value={confirmPassword}
            onChangeText={handleConfirmPassword}
            autoCapitalize="none"
          />

          {Boolean(confirmPasswordError) && (
            <Text style={styles.authentication__errorMsg}>{confirmPasswordError}</Text>
          )}
        </>
      )}
    </>
  );

  const renderAuthentication = () => {
    if (pending) {
      return <ActivityIndicator size="large" color="#f8b444" />;
    }

    if (submitFailed) {
      return (
        <Text
          style={{
            height: 100,
            textAlign: 'center',
            color: 'red',
            margin: 20,
          }}
        >
          Oops ocurrio un error
        </Text>
      );
    }

    return (
      <>
        {hasAccount ? (
          <Login
            errorMessage={errorMessage}
            renderEmailAndPassword={renderEmailAndPassword}
            handleLogIn={() => handleLogIn()}
            handleChangeAuthProcess={handleChangeAuthProcess}
          />
        ) : (
          <Signup
            errorMessage={errorMessage}
            renderEmailAndPassword={renderEmailAndPassword}
            firsName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            setUserTypeSelected={setUserTypeSelected}
            userTypeSelected={userTypeSelected}
            handleSignUp={() => handleSignUp()}
            handleChangeAuthProcess={handleChangeAuthProcess}
          />
        )}
      </>
    );
  };

  return <>{renderAuthentication()}</>;
};

export default AuthenticationContent;
