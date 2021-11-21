import { HTTP_METHOD, privateRequest } from '../axiosConfig';

export const getReviews = (walkerId) => {
  const config = {
    method: HTTP_METHOD.GET,
    url: `users/${walkerId}/reviews`,
    params: {},
  };
  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};
