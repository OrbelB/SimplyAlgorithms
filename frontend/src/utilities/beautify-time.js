import { parseISO, formatDistanceToNow } from 'date-fns';

export default function beautifyTime({ createdDate }) {
  if (createdDate) {
    const date = parseISO(createdDate);
    const timePassed = formatDistanceToNow(date);
    return `${timePassed} ago`;
  }
  throw new Error('this is an error ');
}
