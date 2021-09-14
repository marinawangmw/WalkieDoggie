import React from 'react';
import PetInfo from '../PetInfo';

const Pet = ({ pets, setPets, setErrorMessage }) => {
  const handleChange = (id, name, value) => {
    const newPets = pets.slice();
    newPets[id][name] = value;
  };

  const addPet = () => {
    setPets([
      ...pets,
      {
        name: '',
        breed: '',
        birth_year: null,
        gender: 'HEMBRA',
        weight: null,
        photo_uri: '',
        description: '',
      },
    ]);
  };

  const removePet = (id) => {
    setPets(pets.filter((_pet, idx) => idx !== id));
  };

  return (
    <>
      {pets.map((_pet, idx) => (
        <PetInfo
          key={idx}
          id={idx}
          addPet={addPet}
          removePet={removePet}
          setErrorMessage={setErrorMessage}
          handleChange={handleChange}
        />
      ))}
    </>
  );
};

export default Pet;
