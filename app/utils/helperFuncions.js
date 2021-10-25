export const numericValidation = (text, setter) => {
  if (!isNaN(text)) {
    setter(text);
  }
};

export const formatReservationsDataForMapView = (data) => {
  return data.map((res) => ({
    latlng: {
      latitude: parseFloat(res.addressStart.latitude),
      longitude: parseFloat(res.addressStart.longitude),
    },
    title: `${res.owner.first_name} ${res.owner.last_name}`,
    description: res.addressStart.description,
  }));
};
