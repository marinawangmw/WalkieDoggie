import Fakerator from 'fakerator';
import { USER_TYPES } from '../../../constants/userType';
const faker = Fakerator('es-ES');
const { OWNER, WALKER } = USER_TYPES;

export const realEmail = 'uri.lukacher@gmail.com';
export const makeAppUserCredentials = () => {
    return {
        email: realEmail,
        password: '1234'
    }
}

export const makeFakeSignUpParams = () => {
    return {
        type: faker.random.arrayElement([WALKER, OWNER]),
        first_name: faker.names.firstName(),
        last_name: faker.names.lastName(),
        email: faker.internet.email(),
        password: '1234'
    }
}