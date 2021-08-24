import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import PetInfo from '../PetInfo';

const Pet = forwardRef((props, ref) => {
  const { pets, setPets } = props;
  const petInfoRef = useRef();

  useImperativeHandle(ref, () => ({
    getPets() {
      petInfoRef.current.getPets();
    },
  }));

  const editPet = (id, pet) => {
    setPets(pets.filter((p, idx) => idx !== id).concat(pet));
  };

  console.log('Pets 🥑🥑', pets);

  const addPet = () => {
    setPets([
      ...pets,
      {
        name: '',
        breed: '',
        birth_year: null,
        gender: '',
        weight: null,
        photo_uri: '',
        description: '',
      },
    ]);
  };

  const removePet = (id) => {
    setPets(pets.filter((pet, idx) => idx !== id));
  };

  return (
    <>
      {pets.map((pet, idx) => (
        <PetInfo
          key={idx}
          id={idx}
          editPet={editPet}
          addPet={addPet}
          removePet={removePet}
          ref={petInfoRef}
        />
      ))}
    </>
  );
});

Pet.displayName = 'Pet';

export default Pet;
