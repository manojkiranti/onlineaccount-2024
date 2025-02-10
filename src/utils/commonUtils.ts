import { default as dayjs } from 'dayjs';

export const formatDate = (date: string | Date) =>
  dayjs(date).format('MMMM D, YYYY h:mm A');
export const formatSecondaryDate = (date: string | Date) =>
  dayjs(date).format('DD/MM/YYYY');

export const replaceHyphenWithUnderscore = (str: string): string => {
  return str.replace(/-/g, '_');
}