export const formatDate = (d) => {
  const date = new Date(d);
  const dd = date.getDate().toString();
  const mm = (date.getMonth() + 1).toString();
  const yyyy = date.getFullYear().toString();
  return (dd[1] ? dd : '0' + dd[0]) + '/' + (mm[1] ? mm : '0' + mm[0]) + '/' + yyyy;
};

export const DAYS_OF_WEEK_ARR = [
  'DOMINGO',
  'LUNES',
  'MARTES',
  'MIERCOLES',
  'JUEVES',
  'VIERNES',
  'SABADO',
];
