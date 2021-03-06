import { setStorageItem } from '../../../utils/storage';
import { HTTP_METHOD, publicRequest } from '../axiosConfig';
import jwt_decode from 'jwt-decode';

export const login = async (params) => {
  const { email, password } = params;
  const config = {
    method: HTTP_METHOD.POST,
    url: 'sessions/login',
    data: {
      email,
      password,
    },
  };

  try {
    const { access_token, refresh_token } = await publicRequest(config);
    var { user_type, sub } = jwt_decode(access_token);

    await setStorageItem('access_token', access_token);
    await setStorageItem('user_info', JSON.stringify({ user_type, sub }));
    await setStorageItem('refresh_token', refresh_token);
    return { result: true, data: access_token };
  } catch (error) {
    console.log(error);
    const { metadata } = error;
    return { result: false, data: metadata };
  }
};
