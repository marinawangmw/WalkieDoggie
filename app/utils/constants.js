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
  PENDING_REVIEW: 'PENDING_REVIEW',
  REVIEWED: 'REVIEWED',
};

// IMPORTANTE: EL ELEMENTO 'Todos' TIENE QUE ESTAR AL FINAL
export const ReservationStatusSpanish = [
  { id: RESERVATION_STATUS.PENDING, name: 'Pendiente' },
  { id: RESERVATION_STATUS.ACCEPTED_BY_OWNER, name: 'Aceptado por el dueño' },
  { id: RESERVATION_STATUS.ACCEPTED_BY_WALKER, name: 'Aceptado por el paseador' },
  { id: RESERVATION_STATUS.REJECTED_BY_OWNER, name: 'Rechazado por el dueño' },
  { id: RESERVATION_STATUS.REJECTED_BY_WALKER, name: 'Rechazado por el paseador' },
  { id: RESERVATION_STATUS.REJECTED_BY_SYSTEM, name: 'Rechazado por el sistema' },
  { id: RESERVATION_STATUS.PENDING_REVIEW, name: 'Pendiente de revisión' },
  { id: RESERVATION_STATUS.REVIEWED, name: 'Finalizada' },
  { id: 'ALL', name: 'Todos' },
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

export const PET_WALK_STATUS = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
};

export const NOTIFICATION_TYPES = {
  NEW_RESERVATION: 'NEW_RESERVATION',
  NEW_PET_WALK: 'NEW_PET_WALK',
  OWNER_PET_WALK_STARTED: 'OWNER_PET_WALK_STARTED',
  WALKER_PET_WALK_STARTED: 'WALKER_PET_WALK_STARTED',
  PET_WALK_CANCELLED: 'PET_WALK_CANCELLED',
};
