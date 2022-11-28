import { parseISO, formatDistanceToNow } from "date-fns";

export function beautifyTime({ createdDate }) {
  if (createdDate) {
 
    // quick fix substract 8 hours to it
    const dtDateOnly = new Date(createdDate);
    dtDateOnly.setHours(dtDateOnly.getHours() - 8);   
    console.log(dtDateOnly);
    const date = parseISO(dtDateOnly.toISOString());
    const timePassed = formatDistanceToNow(date);
    return `${timePassed} ago`;
  }
  throw new Error("this is an error ");
}
