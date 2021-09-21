import { getCurrentUserId } from '../../../utils/storage';
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

const editUser = async (type, data) => {
  const id = await getCurrentUserId();
  const config = {
    method: HTTP_METHOD.PUT,
    url: `users/${id}/${type}`,
    data,
  };
  return privateRequest(config)
    .then((dataResponse) => ({ result: true, data: dataResponse }))
    .catch((error) => {
      console.log(error.metadata);
      return { result: false, data: error.metadata };
    });
};

export const editWalker = (data) => editUser('walker', data);
export const editOwner = (data) => editUser('owner', data);
