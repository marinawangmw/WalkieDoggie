const calculateDistance = (coordinate1, coordinate2) => {
  const { lat1, lon1 } = coordinate1;
  const { lat2, lon2 } = coordinate2;

  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;

    // Kilometers
    dist = dist * 1.609344;
    // console.log('dist', dist);
    return dist;
  }
};

export const calculatePath = (initialLocation, reservations) => {
  const auxReservations = [...reservations];
  const destinationsOrdered = [];
  let origin = initialLocation;

  while (auxReservations.length > 1) {
    const index = getNearestLocation(origin, auxReservations);
    const nearestDestination = auxReservations.splice(index, 1)[0];
    destinationsOrdered.push(nearestDestination);
    origin = nearestDestination.addressStart;
  }

  if (auxReservations.length === 1) {
    destinationsOrdered.push(auxReservations[0]);
  }

  console.log(destinationsOrdered);
  return destinationsOrdered;
};

const getNearestLocation = (origin, auxReservations) => {
  const addresses = auxReservations.map((r) => r.addressStart);
  let min = 9999999999999;
  let i;
  for (const [idx, dest] of addresses.entries()) {
    // console.log('origin', origin);
    // console.log('dest', dest);
    const coordinate1 = {
      lat1: parseFloat(origin.latitude),
      lon1: parseFloat(origin.longitude),
    };

    const coordinate2 = {
      lat2: parseFloat(dest.latitude),
      lon2: parseFloat(dest.longitude),
    };
    const distance = calculateDistance(coordinate1, coordinate2);

    if (distance < min) {
      min = distance;
      i = idx;
    }
  }
  return i;
};
