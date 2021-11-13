import { HTTP_METHOD, privateRequest } from '../axiosConfig';

export const getPayment = async (id) => {
  const config = {
    method: HTTP_METHOD.GET,
    url: `centers/${id}`,
  };
  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};

export const createReview = (params) => {
  const { score, description } = params;

  const config = {
    method: HTTP_METHOD.POST,
    url: '/pet-walks/92/reviews',
    data: {
      score,
      description,
    },
  };

  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};
