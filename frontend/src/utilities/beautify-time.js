import { parseISO, formatDistanceToNow, differenceInDays } from 'date-fns';

export function beautifyTime({ createdDate }) {
  if (createdDate) {
    const date = parseISO(createdDate);
    // use format distance to now and add minutes
    const timePassed = formatDistanceToNow(date, {
      addSuffix: true,
      includeSeconds: true,
    });
    return `${timePassed}`;
  }
  throw new Error('this is an error ');
}

export function timeToExpire(date) {
  const now = new Date();
  const expireDate = new Date(date).toISOString();
  const expirationDate = parseISO(expireDate);
  const daysToExpire = differenceInDays(expirationDate, now);
  return daysToExpire;
}
