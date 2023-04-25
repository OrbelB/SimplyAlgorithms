import { differenceInDays, formatDistanceToNow, parseISO } from 'date-fns';

// function offsetTimezone(date) {
//   const offset = date.getTimezoneOffset();
//   return new Date(date.getTime() - offset * 60 * 1000);
// }

export function beautifyTime({ createdDate }) {
  if (createdDate) {
    // create a new date object from the ISO string
    const date = new Date(createdDate);

    // use toLocaleString to convert to the user's local time
    const formattedDate = date.toLocaleString();

    // use format distance to now and add minutes add
    const timePassed = formatDistanceToNow(date, {
      addSuffix: true,
      includeSeconds: true,
    });

    return `${timePassed} (${formattedDate})`;
  }
  return '';
}

export function timeToExpire(date) {
  const now = new Date();
  const expireDate = new Date(date).toISOString();
  const expirationDate = parseISO(expireDate);
  return differenceInDays(expirationDate, now);
}
