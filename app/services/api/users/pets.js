import { getCurrentUserId } from '../../../utils/storage';
import { HTTP_METHOD, privateRequest } from '../axiosConfig';

export const editPet = async (petId, data) => {
  const id = await getCurrentUserId();
  const config = {
    method: HTTP_METHOD.PUT,
    url: `users/${id}/pets/${petId}`,
    data,
  };
  return privateRequest(config)
    .then((dataResponse) => ({ result: true, data: dataResponse }))
    .catch((error) => {
      console.log(error.metadata);
      return { result: false, data: error.metadata };
    });
};
