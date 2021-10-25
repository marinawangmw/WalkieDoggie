import { getCurrentUserId } from '../../../utils/storage';
import { HTTP_METHOD, privateRequest } from '../axiosConfig';

export const createPetWalk = async (start_date, address_start, reservation_ids) => {
  // {
  //     "start_date": "2021-10-24T19:00:00-03:00",
  //     "reservation_ids": [
  //         2
  //     ],
  //     "address_start": {
  //         "latitude": "-34.55555555",
  //         "longitude": "-58.55555555",
  //         "description": "Yatay 240, C1414, 1A"
  //     }
  // }
  const walker_id = await getCurrentUserId();

  const data = {
    start_date,
    address_start,
    reservation_ids,
  };
  const config = {
    method: HTTP_METHOD.POST,
    url: `users/${walker_id}/pet-walks`,
    data,
  };
  return privateRequest(config)
    .then((dataResponse) => ({ result: true, data: dataResponse }))
    .catch((error) => ({ result: false, data: error.metadata }));
};

export const rejectReservations = async (reservation_ids) => {
  // {
  //     "reservation_ids": [
  //         2
  //     ],
  // }
  const walker_id = await getCurrentUserId();

  const data = {
    reservation_ids,
  };
  const config = {
    method: HTTP_METHOD.PUT,
    url: `users/${walker_id}/walker/reservations/reject`,
    data,
  };
  return privateRequest(config)
    .then((dataResponse) => ({ result: true, data: dataResponse }))
    .catch((error) => ({ result: false, data: error.metadata }));
};