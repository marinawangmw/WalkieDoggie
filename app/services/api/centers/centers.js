import { CENTER_TYPE } from '../../../utils/constants';
import { HTTP_METHOD, privateRequest } from '../axiosConfig';

const getCenters = async (type) => {
  const config = {
    method: HTTP_METHOD.GET,
    url: 'centers',
    params: { type },
  };
  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};

export const getDayCares = () => getCenters(CENTER_TYPE.DAY_CARE);
export const getShelters = () => getCenters(CENTER_TYPE.SHELTER);
export const getColonies = () => getCenters(CENTER_TYPE.COLONY);
