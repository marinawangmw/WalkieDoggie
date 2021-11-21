import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getPetWalkDetail } from 'services/api/rides/petWalks';
import { LocationWalkerSideComponent, PetWalkInstructionsList } from 'components';

const CurrentWalkerPetWalkScreen = ({ route, navigation }) => {
  const { petWalkId, setHasPetWalkStarted } = route.params;
  const [petWalkData, setPetWalkData] = useState(null);
  const [addressStart, setAddressStart] = useState(null);
  const [walkerAllowsTracking, setWalkerAllowsTracking] = useState(true);

  const getPetWalkData = async (id) => {
    const response = await getPetWalkDetail(id);
    if (response.result) {
      setPetWalkData(response.data);
      setAddressStart(response.data.address_start);
      setWalkerAllowsTracking(response.data.walker.allows_tracking);
    }
  };

  useEffect(() => {
    if (petWalkId) {
      getPetWalkData(petWalkId);
    }
  }, [petWalkId]);

  const renderPetwalkInfo = () => {
    if (petWalkData) {
      return (
        <View style={styles.infoContainer}>
          <PetWalkInstructionsList
            petWalkId={petWalkData.id}
            data={petWalkData.instructions}
            getData={getPetWalkData}
            setHasPetWalkStarted={setHasPetWalkStarted}
            navigation={navigation}
          />
        </View>
      );
    }
  };

  const renderMap = () => {
    if (addressStart && walkerAllowsTracking) {
      return <LocationWalkerSideComponent addressStart={addressStart} petWalkId={petWalkData.id} />;
    } else if (!walkerAllowsTracking) {
      return <Text>Tenés la ubicación en tiempo real desactivada!</Text>;
    }
  };

  const renderContent = () => {
    return (
      <>
        {renderMap()}
        {renderPetwalkInfo()}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={[]} renderItem={() => {}} ListHeaderComponent={renderContent} />
    </View>
  );
};

export default CurrentWalkerPetWalkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  titles: {
    fontSize: 16,
    color: '#000',
  },
  infoContainer: {
    padding: 20,
  },
});
