import {
  getRefreshTokenStorage,
  multiRemoveStorageItems,
  setStorageItem,
} from '../../../utils/storage';
import { HTTP_METHOD, publicRequest } from '../axiosConfig';

export const refreshToken = async () => {
  const currentRefreshToken = await getRefreshTokenStorage();
  const config = {
    method: HTTP_METHOD.POST,
    url: 'sessions/refresh',
    data: {
      refresh_token: currentRefreshToken,
    },
  };

  try {
    const data = await publicRequest(config);
    await multiRemoveStorageItems(['access_token', 'refresh_token']);
    const { access_token, refresh_token } = data;
    await setStorageItem('access_token', access_token);
    await setStorageItem('refresh_token', refresh_token);
    return { result: true, data: { access_token } };
  } catch (error) {
    const { metadata } = error;
    return { result: false, data: metadata };
  }
};
