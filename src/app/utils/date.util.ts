import {
  isDate,
  isFuture,
  differenceInYears,
  parseISO,
  isValid,
  parse,
} from 'date-fns';
export const isValidDate = (date: Date): boolean => {
  return (
    isDate(date) &&
    isValid(date) &&
    !isFuture(date) &&
    differenceInYears(Date.now(), date) < 150
  );
};
