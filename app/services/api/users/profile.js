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

const editUser = (id, type) => {
  const config = {
    method: HTTP_METHOD.PUT,
    url: `users/${id}/${type}`,
  };
  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};

export const editWalker = (id) => editUser(id, 'walker');
export const editOwner = (id) => editUser(id, 'owner');
