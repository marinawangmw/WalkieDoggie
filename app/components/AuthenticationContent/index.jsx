import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';

import Login from './Login';
import Signup from './Signup';
import Logo from '../Logo';

import { AuthContext } from '../../utils/authContext';
import LoadingScreen from '../../screens/LoadingScreen';
import { signUp } from '../../services/api/sessions/signUp';

import styles from './styles';

const AuthenticationContent = ({ error, navigation }) => {
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
  const [loading, setLoading] = useState(false);

  const { signIn } = React.useContext(AuthContext);

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
      signIn({ email, password });
    } else {
      setErrorMessage('Por favor verifique los datos ingresados');
    }
  };

  // FAKE
  // const handleSignUp = async () => {
  //   const signupData = {
  //     type: 'WALKER',
  //     first_name: 'Marina',
  //     last_name: 'Wang',
  //     email: 'marinawang@gmail.com',
  //     password: '123',
  //   };

  //   setLoading(true);

  //   const res = {
  //     data: {
  //       id: 35,
  //       type: 'WALKER',
  //       first_name: 'Marina',
  //       last_name: 'Wang',
  //       email: 'marinawang@gmail.com',
  //       password: '123',
  //     },
  //     result: true,
  //   };
  //   setLoading(false);

  //   if (res.result) {
  //     signupData.id = res.data.id;
  //     return navigation.navigate('Onboarding', { signupData });
  //   } else {
  //     setErrorMessage('El mail ya se encuentra registrado');
  //   }
  // };

  // REAL
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
      const signupData = {
        type: userTypeSelected,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      };

      setLoading(true);
      const res = await signUp(signupData);

      setLoading(false);

      if (res.result) {
        signupData.id = res.data.id;
        return navigation.navigate('Onboarding', { signupData });
      } else {
        setErrorMessage('El mail ya se encuentra registrado');
      }
    } else {
      setErrorMessage('Por favor complete todos los campos y verifique los datos ingresados.');
    }
  };

  const handleChangeAuthProcess = () => {
    setHasAccount(!hasAccount);
  };

  const validateEmail = (text) => {
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;

    setEmail(text);

    if (email.length > 0 && reg.test(text) === false) {
      setEmailError('El mail ingresado no es correcto');
    } else {
      setEmailError('');
    }
  };

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleConfirmPassword = (text) => {
    setConfirmPassword(text);

    if (confirmPassword.length > 0 && password !== text) {
      setConfirmPasswordError('Las claves ingresadas no coinciden');
    } else if (!isItValidPassword(password)) {
      setConfirmPasswordError(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, un dígito y un carácter especial',
      );
    } else {
      clearErrors();
    }
  };

  function isItValidPassword(str) {
    return /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(str);
  }

  const renderEmailAndPassword = () => (
    <>
      <TextInput
        placeholder="Email"
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
                source={require('../../assets/images/invisible.svg')}
                style={styles.authentication__pwVisibility}
              />
            ) : (
              <SvgUri
                width="25"
                height="25"
                source={require('../../assets/images/visible.svg')}
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
    if (loading) {
      return <LoadingScreen logo />;
    }

    return (
      <>
        <Logo />
        {hasAccount ? (
          <Login
            errorMessage={errorMessage || error}
            renderEmailAndPassword={renderEmailAndPassword}
            handleLogIn={() => handleLogIn()}
            handleChangeAuthProcess={handleChangeAuthProcess}
          />
        ) : (
          <Signup
            errorMessage={errorMessage || error}
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
