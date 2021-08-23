import React, { useState } from 'react';
import PetInfo from '../PetInfo';

const Pet = ({ pets, setPets }) => {
  const editPet = (id, pet) => {
    console.log('Edit pet 🌶🌶', pets, id, pet);
    if (id > pets.length - 1) {
      pets.setPets([pet]);
    } else {
      const previous = id - 1 <= 0 ? 1 : id - 1;
      const next = id + 2 < pets.length - 1 ? id + 2 : pets.length - 1;
      const last = pets.length - 1;

      if (next === last) {
        setPets([...pets.slice(0, previous), pet]);
      } else {
        setPets([...pets.slice(0, previous), pet, ...pets.slice(next, last)]);
      }
    }
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
        <PetInfo key={idx} id={idx} editPet={editPet} addPet={addPet} removePet={removePet} />
      ))}
    </>
  );
};

export default Pet;
