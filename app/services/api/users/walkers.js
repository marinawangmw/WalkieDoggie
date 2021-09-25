import { HTTP_METHOD, privateRequest } from '../axiosConfig';

export const getWalkers = (id) => {
  const config = {
    method: HTTP_METHOD.GET,
    url: 'users/walkers',
  };
  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};
