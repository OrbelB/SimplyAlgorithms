import { differenceInDays, formatDistanceToNow, parseISO } from 'date-fns';

function offsetTimezone(date) {
  const offset = date.getTimezoneOffset();
  return date.getUTCDate() === date.getDate()
    ? new Date(date.getTime() - offset * 60 * 1000)
    : date;
}

export function beautifyTime({ createdDate }) {
  if (createdDate) {
    // create a new date object from the ISO string
    const date = new Date(createdDate);
    const offSetDate = offsetTimezone(date);

    // use toLocaleString to convert to the user's local time
    const formattedDate = offSetDate.toLocaleString();

    // use format distance to now and add minutes add
    const timePassed = formatDistanceToNow(offSetDate, {
      addSuffix: true,
      includeSeconds: true,
    });

    return `${timePassed} (${formattedDate})`;
  }
  return '';
}

export function timeToExpire(date) {
  const now = new Date();
  const currentDate = offsetTimezone(new Date(date));
  const expireDate = new Date(currentDate).toISOString();
  const expirationDate = parseISO(expireDate);
  return differenceInDays(expirationDate, now);
}
