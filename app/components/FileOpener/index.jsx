import React, { useEffect, useState } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import styles from './styles';
import CustomButton from '../CustomButton';

const FileOpener = ({
  url = 'https://bucket-walkie-doggie.s3.us-east-2.amazonaws.com/sample.pdf',
}) => {
  const openFile = () => {
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <CustomButton handleOnclick={openFile} buttonLabel="Open PDF File" />
    </View>
  );
};

export default FileOpener;
