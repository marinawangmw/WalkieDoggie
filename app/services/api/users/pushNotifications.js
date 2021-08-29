import { getCurrentUserId } from '../../../utils/storage';
import { HTTP_METHOD, privateRequest } from '../axiosConfig';

export const addPushTokenToUser = async (pushToken) => {
  const userId = await getCurrentUserId();

  const config = {
    method: HTTP_METHOD.POST,
    url: `users/${userId}/firebase-tokens`,
    data: {
      firebase_token: pushToken,
    },
  };
  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};

export const deletePushTokenToUser = async (pushToken) => {
  const userId = await getCurrentUserId();

  const config = {
    method: HTTP_METHOD.DELETE,
    url: `users/${userId}/firebase-tokens/${pushToken}`,
  };
  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};
