import { HTTP_METHOD, privateRequest } from '../axiosConfig';

export const getProfile = (id) => {
  const config = {
    method: HTTP_METHOD.GET,
    url: `users/${id}`,
  };
  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};
