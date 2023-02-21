import { parseISO, formatDistanceToNow } from 'date-fns';

export default function beautifyTime({ createdDate }) {
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
