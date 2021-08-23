import { HTTP_METHOD, privateRequest } from '../axiosConfig';

export const onBoardingWalker = (paramsOnBoardingWalker, id) => {
  const {
    address,
    profile_photo_uri,
    phone,
    cover_letter = '',
    ranges,
    price_per_hour,
  } = paramsOnBoardingWalker;
  const config = {
    method: HTTP_METHOD.PUT,
    url: `users/onboarding/walker/${id}`,
    data: {
      price_per_hour,
      phone,
      cover_letter,
      ranges,
      address,
      profile_photo_uri,
    },
  };

  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};

export const onBoardingOwner = (paramsOnBoardingWalker, id) => {
  const { address, profile_photo_uri, phone, pets } = paramsOnBoardingWalker;
  const config = {
    method: HTTP_METHOD.PUT,
    url: `users/onboarding/owner/${id}`,
    data: {
      phone,
      pets,
      address,
      profile_photo_uri,
    },
  };

  return privateRequest(config)
    .then((data) => ({ result: true, data }))
    .catch((error) => ({ result: false, data: error.metadata }));
};
