import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { ProfileDataRow } from '../../components';

const PetDetail = ({ route }) => {
  const { pet } = route.params;
  const [changeName, setChangeName] = useState('');
  const [changeBreed, setChangeBreed] = useState('');
  const [changeWeight, setChangeWeight] = useState('');
  const [changeBirthYear, setChangeBirthYear] = useState('');
  const [changeGender, setChangeGender] = useState('');
  const [changeDescription, setChangeDescription] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: pet.photo_uri }} style={styles.pic} />

      <View style={styles.data}>
        <View style={styles.dataRow}>
          <Text style={styles.title}>Nombre: </Text>
          <ProfileDataRow
            data={pet.name}
            customStyles={petStyles}
            changeData={changeName}
            setChangeData={setChangeName}
          />
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.title}>Raza: </Text>
          <ProfileDataRow
            data={pet.breed}
            customStyles={petStyles}
            changeData={changeBreed}
            setChangeData={setChangeBreed}
          />
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.title}>Peso: </Text>
          <ProfileDataRow
            data={pet.weight}
            customStyles={petStyles}
            changeData={changeWeight}
            setChangeData={setChangeWeight}
          />
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.title}>Año de nacimiento aproximado: </Text>
          <ProfileDataRow
            data={pet.birth_year}
            customStyles={petStyles}
            changeData={changeBirthYear}
            setChangeData={setChangeBirthYear}
          />
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.title}>Género: </Text>
          <ProfileDataRow
            data={pet.gender}
            customStyles={genderStyles}
            changeData={changeGender}
            setChangeData={setChangeGender}
          />
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.title}>Description: </Text>
          <ProfileDataRow
            data={pet.description}
            customStyles={petStyles}
            changeData={changeDescription}
            setChangeData={setChangeDescription}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PetDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  data: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  pic: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginLeft: '40%',
    marginBottom: 30,
  },
  title: {
    color: '#364C63',
    fontSize: 16,
    fontWeight: '700',
    paddingLeft: 20,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '75%',
  },
});

const petStyles = StyleSheet.create({
  label: {
    color: '#364C63',
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});

const genderStyles = StyleSheet.create({
  label: {
    color: '#364C63',
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexWrap: 'wrap',
    textTransform: 'capitalize',
  },
});
