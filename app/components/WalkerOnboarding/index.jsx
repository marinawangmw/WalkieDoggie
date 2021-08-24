import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { numericValidation } from '../../utils/helperFuncions';
import Logo from '../Logo';
import styles from './styles';

const WalkerOnboarding = () => {
  const [phone, setPhone] = useState(null);

  return (
    <View>
      <Logo />
      {/* descripcion cover letter */}
      {/* walker working schedule */}
      {/* Address */}
      {/* file upload profile photo */}
    </View>
  );
};

export default WalkerOnboarding;
