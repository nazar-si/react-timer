import { SECOND } from './refresh';

export const addTime = (date: Date, s: number) =>
  new Date(date.getTime() + s * SECOND);
export const diff = (date1: Date, date2: Date) =>
  Math.floor((date1.getTime() - date2.getTime()) / SECOND);
