import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { styles } from './CreateComplaintScreen.styles';

// eslint-disable-next-line import/no-unresolved
import { imageIcon } from 'images';
import { createComplaint } from 'services/api/complaints/complaints';
import Toast from 'react-native-toast-message';
import { CustomButton } from '../../components';

const CreateComplaintScreen = ({ navigation, route }) => {
  const [changeDescription, setChangeDescription] = useState('');
  const [changeFiles, setChangeFiles] = useState([]);
  const [descriptionError, setDescriptionError] = useState('');
  const [filesError, setFilesError] = useState('');

  const handleNavigateFindComplaints = () => {
    navigation.navigate('findComplaints');
  };

  const handleNavigateComplaintFiles = () => {
    navigation.navigate('complaintFiles', {
      description: changeDescription,
      files: changeFiles,
    });
  };

  useEffect(() => {
    if (route.params) {
      const { description, files } = route.params;

      if (description && description.length > 0) {
        setChangeDescription(description);
        setDescriptionError('');
      }

      if (files && files.length > 0) {
        setChangeFiles(files);
        setFilesError('');
      }
    }
  }, [changeFiles, setChangeFiles, route]);

  const renderComplaintFiles = () => {
    return (
      <>
        <TouchableOpacity style={styles.petDataRow} onPress={handleNavigateComplaintFiles}>
          <View style={styles.petDataRowTitle}>
            <Image source={imageIcon} style={styles.icon} />
            <Text style={styles.petName}>Archivos</Text>
          </View>
        </TouchableOpacity>

        {Boolean(filesError) && <Text style={styles.authentication__errorMsg}>{filesError}</Text>}
      </>
    );
  };

  const showResultCreateComplaint = (response) => {
    if (!response.result) {
      Toast.show({
        type: 'error',
        text1: 'Ouch!',
        text2: 'Error al crear la denuncia',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Yey!',
        text2: 'Los denuncia fue creada correctamente',
      });

      handleNavigateFindComplaints();
    }
  };

  const validateDescription = (text) => {
    setChangeDescription(text);

    if (changeDescription && changeDescription.length > 0) {
      setDescriptionError('');

      return true;
    } else {
      setDescriptionError('Debe ingresar una descripción');

      return false;
    }
  };

  const validateFiles = () => {
    if (changeFiles.length > 0) {
      setFilesError('');

      return true;
    } else {
      setFilesError('Debe cargar por lo menos un archivo');

      return false;
    }
  };

  const handleSaveChangeData = async () => {
    if (validateDescription() && validateFiles()) {
      let complaint = {};
      complaint.description = changeDescription;
      complaint.file_uris = changeFiles.map((item) => {
        return item.file_uri;
      });

      const response = await createComplaint(complaint);
      showResultCreateComplaint(response);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.message}
          multiline={true}
          onChangeText={validateDescription}
          placeholder="Por favor describa lo sucedido con el mayor detalle posible, indicando dónde, cúando y qué ocurrió."
        />
        {Boolean(descriptionError) && (
          <Text style={styles.authentication__errorMsg}>{descriptionError}</Text>
        )}

        <View style={styles.hr} />

        {renderComplaintFiles()}

        <View style={styles.saveButton}>
          <CustomButton handleOnclick={handleSaveChangeData} buttonLabel="Crear denuncia" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateComplaintScreen;
