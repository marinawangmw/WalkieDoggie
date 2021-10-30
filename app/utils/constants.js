export const DAYS_OF_WEEK = {
  MONDAY: 'LUNES',
  TUESDAY: 'MARTES',
  WEDNESDAY: 'MIERCOLES',
  THURSDAY: 'JUEVES',
  FRIDAY: 'VIERNES',
  SATURDAY: 'SABADO',
  SUNDAY: 'DOMINGO',
};

export const USER_TYPES = {
  WALKER: 'WALKER',
  OWNER: 'OWNER',
};

export const PET_GENDER = {
  FEMALE: 'HEMBRA',
  MALE: 'MACHO',
};

export const RESERVATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED_BY_OWNER: 'ACCEPTED_BY_OWNER',
  ACCEPTED_BY_WALKER: 'ACCEPTED_BY_WALKER',
  REJECTED_BY_OWNER: 'REJECTED_BY_OWNER',
  REJECTED_BY_WALKER: 'REJECTED_BY_WALKER',
  REJECTED_BY_SYSTEM: 'REJECTED_BY_SYSTEM',
};

export const ReservationStatusSpanish = [
  { id: 'PENDING', name: 'Pendiente' },
  { id: 'ACCEPTED_BY_OWNER', name: 'Aceptado por el dueño' },
  { id: 'ACCEPTED_BY_WALKER', name: 'Aceptado por el paseador' },
  { id: 'REJECTED_BY_OWNER', name: 'Rechazado por el dueño' },
  { id: 'REJECTED_BY_WALKER', name: 'Rechazado por el paseador' },
  { id: 'REJECTED_BY_SYSTEM', name: 'Rechazado por el sistema' },
  { id: '', name: 'Todos' },
];

export const dayOfTheWeekSpanish = {
  1: 'LUNES',
  2: 'MARTES',
  3: 'MIERCOLES',
  4: 'JUEVES',
  5: 'VIERNES',
  6: 'SABADO',
  0: 'DOMINGO',
};

export const CENTER_TYPE = {
  COLONY: 'COLONY',
  SHELTER: 'SHELTER',
  DAY_CARE: 'DAY_CARE',
};
