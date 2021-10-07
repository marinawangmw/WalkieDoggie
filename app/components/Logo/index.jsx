import React from 'react';
import { Image } from 'react-native';
import styles from './styles';
import { iconHome } from '../../assets/images';

const Logo = () => <Image source={iconHome} style={styles.logo} />;

export default Logo;
