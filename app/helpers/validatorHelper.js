export const isEmptyField = (field) => field === '' || field === null || field === undefined;

export const existOverlapsRanges = (ranges) => {
  return ranges.some((day, index) => {
    const aux = ranges.filter(
      (e, auxindex) => e.day_of_week === day.day_of_week && index !== auxindex,
    );
    return aux.some(
      (dayAux) =>
        (day.start_at >= dayAux.start_at && day.start_at <= dayAux.end_at) ||
        (day.end_at >= dayAux.start_at && day.end_at <= dayAux.end_at),
    );
  });
};
