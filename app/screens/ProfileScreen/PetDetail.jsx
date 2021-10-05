import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { ProfileDataRow } from 'components';
import { PETS_DATA_LABEL } from 'helpers/profileAndOnboarding';

const PetDetail = ({ route }) => {
  const { pet, handleEditPets, idx } = route.params;

  const [_changeData, setChangeData] = useState('');

  const handleChangeData = (input, dataLabel) => {
    setChangeData(input);
    handleEditPets(input, idx, dataLabel);
  };

  const renderDataRow = (row) => {
    const label = PETS_DATA_LABEL[row[0]];
    const value = row[1];

    if (label) {
      return (
        <View style={styles.dataRow}>
          <Text style={styles.title}>{label} </Text>
          <ProfileDataRow
            value={value}
            customStyles={petStyles}
            valueLabel={row[0]}
            handleChangeData={handleChangeData}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: pet.photo_uri }} style={styles.pic} />

      <View style={styles.data}>
        {Object.entries(pet).map((row, rowIdx) => {
          return <View key={rowIdx}>{renderDataRow(row)}</View>;
        })}
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
