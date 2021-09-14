import Fakerator from 'fakerator';
import { DAYS_OF_WEEK, PET_GENDER } from '../../../utils/constants';
const faker = Fakerator('es-ES');

const { FEMALE, MALE } = PET_GENDER;

export const makeFakeOnBoardingWalkerParams = () => {
  return {
    address: {
      latitude: faker.address.geoLocation().latitude.toString(),
      longitude: faker.address.geoLocation().longitude.toString(),
      description: faker.address.street(),
    },
    profile_photo_uri: faker.internet.url(),
    phone: faker.phone.number(),
    price_per_hour: faker.random.number(5000),
    cover_letter: faker.random.string(128),
    ranges: [
      {
        day_of_week: DAYS_OF_WEEK.MONDAY,
        start_at: '11:00',
        end_at: '14:30',
      },
      {
        day_of_week: DAYS_OF_WEEK.WEDNESDAY,
        start_at: '15:00',
        end_at: '19:15',
      },
    ],
  };
};

export const makeFakeOnBoardingOwnerParams = () => {
  return {
    address: {
      latitude: faker.address.geoLocation().latitude.toString(),
      longitude: faker.address.geoLocation().longitude.toString(),
      description: faker.address.street(),
    },
    profile_photo_uri: faker.internet.url(),
    phone: faker.phone.number(),
    pets: [
      {
        name: faker.names.name(),
        breed: faker.random.string(32),
        birth_year: '2017',
        gender: faker.random.arrayElement([MALE, FEMALE]),
        weight: faker.random.number(100),
        photo_uri: faker.internet.url(),
        description: faker.random.string(255),
      },
      {
        name: faker.names.name(),
        breed: faker.random.string(32),
        birth_year: '2015',
        gender: faker.random.arrayElement([MALE, FEMALE]),
        weight: faker.random.number(100),
        photo_uri: faker.internet.url(),
        description: faker.random.string(255),
      },
    ],
  };
};
