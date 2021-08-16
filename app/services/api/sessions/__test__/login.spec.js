import { getStorageItem } from '../../../../utils/storage';
import { makeAppUserCredentials } from '../../helpers/sessions';
import { login } from '../login';

describe('POST /sessions/login', () => {
  it('Successful Login', async () => {
    const user = makeAppUserCredentials();
    const response = await login(user);
    expect(response).toHaveProperty('result', true);
    const accessToken = await getStorageItem('access_token');
    const refreshToken = await getStorageItem('refresh_token');
    const tokenRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
    expect(accessToken).toMatch(new RegExp(tokenRegex));
    expect(refreshToken).toMatch(new RegExp(tokenRegex));
  });

  it('Invalid credentials', async () => {
    const user = makeAppUserCredentials();
    user.password = 'invalid_password';
    const response = await login(user);
    expect(Object.keys(response)).toStrictEqual(expect.arrayContaining(['result', 'data']));

    const { result, data } = response;
    expect(result).toEqual(false);
    const { statusCode, errorData } = data;
    expect(statusCode).toEqual(400);
    expect(errorData.internal_code).toEqual('invalid_credentials');
  });

  it('User not found', async () => {
    const user = makeAppUserCredentials();
    user.email = 'invalid_email@gmail.com';
    const response = await login(user);
    expect(Object.keys(response)).toStrictEqual(expect.arrayContaining(['result', 'data']));

    const { result, data } = response;
    expect(result).toEqual(false);
    const { statusCode, errorData } = data;
    expect(statusCode).toEqual(404);
    expect(errorData.internal_code).toEqual('not_found');
  });
});
