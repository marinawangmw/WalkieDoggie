import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { PetWalkInstructionsList } from 'components';
import styles from './styles';
import MapViewWithOwners from 'components/MapViewWithOwners';

export const PET_WALK_INFO = {
  id: 84,
  address_start: {
    id: 129,
    latitude: '-34.62705399999999',
    longitude: '-58.471435',
    description: 'Avenida Nazca 444, Buenos Aires, Argentina',
  },
  walker: {
    id: 6,
    first_name: 'Tomas',
    last_name: 'Janin',
    email: 'toto@gmail.com',
    phone: '1155691387',
  },
  status: 'IN_PROGRESS',
  start_date: '2021-11-13T16:53:00.000Z',
  instructions: [
    {
      instruction: 'PICK_UP',
      address_latitude: '-34.6001136',
      address_longitude: '-58.4314381',
      address_description: 'Loyola 43, Buenos Aires, Argentina',
      position: 1,
      done: false,
      pet: {
        id: 1,
        name: 'Kira',
        breed: 'Pirulo',
        birth_year: 2020,
        gender: 'HEMBRA',
        weight: 15,
        photo_uri:
          'https://bucket-walkie-doggie.s3.us-east-2.amazonaws.com/c2905491-c1a9-4b7f-973c-871cd9eb7bbd_IMG_20210908_091337.jpg',
        description: 'Traviesa',
      },
    },
    {
      instruction: 'LEAVE',
      address_latitude: '-34.6001136',
      address_longitude: '-58.4314381',
      address_description: 'Loyola 43, Buenos Aires, Argentina',
      position: 2,
      done: false,
      pet: {
        id: 1,
        name: 'Kira',
        breed: 'Pirulo',
        birth_year: 2020,
        gender: 'HEMBRA',
        weight: 15,
        photo_uri:
          'https://bucket-walkie-doggie.s3.us-east-2.amazonaws.com/c2905491-c1a9-4b7f-973c-871cd9eb7bbd_IMG_20210908_091337.jpg',
        description: 'Traviesa',
      },
    },
  ],
};
// const ChatScreen = () => {
//   const owners = [
//     {
//       latlng: { latitude: -34.5985955, longitude: -58.4221275 },
//       title: 'Ricardo Rubén',
//       description: 'Av. Medrano 951',
//     },
//     {
//       latlng: { latitude: -34.5837332, longitude: -58.4161273 },
//       title: 'Guillermo Francella',
//       description: 'Av. Raul Scalabrini Ortiz 2750',
//     },
//   ];
//   const initialLocation = {
//     latitude: -34.5847447,
//     longitude: -58.3979724,
//     description: 'Av. Del Libertador 2300',
//   };
//   return (
//     <View style={styles.container}>
//       <MapViewWithOwners owners={owners} initialLocation={initialLocation} />

//       <Text>This is Chat!</Text>
//     </View>
//   );
// };
const renderInstructionList = () => {
  return <PetWalkInstructionsList data={PET_WALK_INFO.instructions} />;
};

const ChatScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, marginVertical: 50, marginHorizontal: 20 }}>
      <FlatList data={[]} renderItem={() => {}} ListFooterComponent={renderInstructionList} />
    </SafeAreaView>
  );
};

export default ChatScreen;
