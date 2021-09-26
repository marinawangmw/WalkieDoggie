import { HTTP_METHOD, privateRequest } from '../axiosConfig';

export const getWalkers = ({ score, complete_name, pet_walks_amount }) => {
  const config = {
    method: HTTP_METHOD.GET,
    url: 'users/walkers',
    params: {
      score,
      complete_name,
      pet_walks_amount,
    },
  };
  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};
