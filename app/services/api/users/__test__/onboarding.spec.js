import { makeAppUserCredentials } from '../../helpers/sessions';
import { makeFakeOnBoardingOwnerParams, makeFakeOnBoardingWalkerParams } from '../../helpers/users';
import { login } from '../../sessions/login';
import { onBoardingOwner, onBoardingWalker } from '../onboarding';

describe('POST /users/onboarding/walker', () => {
  const id = 2;

  beforeAll(async () => {
    const user = makeAppUserCredentials();
    await login(user);
  });
  it('Successful onboarding', async () => {
    const fakeParams = makeFakeOnBoardingWalkerParams();
    const response = await onBoardingWalker(fakeParams, id);
    checkSuccessResponse(response);
  });
});

describe.skip('POST /users/onboarding/owner', () => {
  const id = 17;

  beforeAll(async () => {
    const user = makeAppUserCredentials({ email: 'diego.maradona@gmail.com' });
    await login(user);
  });
  it('Successful onboarding', async () => {
    const fakeParams = makeFakeOnBoardingOwnerParams();
    const response = await onBoardingOwner(fakeParams, id);
    checkSuccessResponse(response);
  });
});

const checkSuccessResponse = (response) => {
  expect(Object.keys(response)).toStrictEqual(expect.arrayContaining(['result', 'data']));
  const { result, data } = response;
  expect(result).toEqual(true);
  expect(data).toHaveProperty('message', 'User onboarded successfully');
};
