import { HTTP_METHOD, privateRequest } from '../axiosConfig';

export const createReview = (params) => {
  const { score, description, petWalkId } = params;

  const config = {
    method: HTTP_METHOD.POST,
    url: `pet-walks/${petWalkId}/reviews`,
    data: {
      score,
      description,
    },
  };

  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};
