import { HTTP_METHOD, privateRequest } from '../axiosConfig';

export const getComplaints = () => {
  const config = {
    method: HTTP_METHOD.GET,
    url: '/complaints',
    params: {},
  };
  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};

export const getComplaint = (id) => {
  const config = {
    method: HTTP_METHOD.GET,
    params: {},
    url: `/complaints/${id}`,
  };
  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};
export const createComplaint = (params) => {
  const { description, file_uris } = params;
  const config = {
    method: HTTP_METHOD.POST,
    url: '/complaints',
    data: {
      description,
      file_uris,
    },
  };
  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};
