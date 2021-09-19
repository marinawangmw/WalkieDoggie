import { getCurrentUserId } from '../../../utils/storage';
import { HTTP_METHOD, privateRequest } from '../axiosConfig';

export const createReservation = (walker_id, data) => {
  //data must be like:
  //  {
  //     walk_date: '20210921',
  //     range_id: 31,
  //     duration: 60,
  //     pet_id: 12,
  //     address_start: {
  //       description: 'Gavilan 2151 CABA',
  //       latitude: '-34.690930',
  //       longitude: '-58.539200',
  //     },
  //     address_end: {
  //       description: 'Gavilan 2151 CABA',
  //       latitude: '-34.690930',
  //       longitude: '-58.539200',
  //     },
  //     comments: 'tengo expectativas',
  //  };

  const config = {
    method: HTTP_METHOD.POST,
    url: `users/${walker_id}/reservations`,
    data,
  };
  return privateRequest(config)
    .then((dataResponse) => ({ result: true, data: dataResponse }))
    .catch((error) => ({ result: false, data: error.metadata }));
};

/**
 *
 * @param {*} params
 * Could contain optional keys 'status' and 'date'.
 * 'status' must be one of RESERVATION_STATUS constant values. 'date' must have format YYYYMMDD.
 * @returns
 */
export const getReservations = async (params) => {
  const { status, date } = params;
  const walker_id = await getCurrentUserId();
  const config = {
    method: HTTP_METHOD.GET,
    url: `users/${walker_id}/reservations`,
    params: { status, date },
  };
  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};
