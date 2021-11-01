export const numericValidation = (text, setter) => {
  if (!isNaN(text)) {
    setter(text);
  }
};

export const formatReservationsDataForMapView = (data) => {
  return data.map((res) => ({
    latlng: {
      latitude: parseFloat(res.address_start.latitude),
      longitude: parseFloat(res.address_start.longitude),
    },
    title: `${res.owner.first_name} ${res.owner.last_name}`,
    description: res.address_start.description,
  }));
};
