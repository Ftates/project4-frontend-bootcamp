export default function dateFormat(dateStr) {
  const date = new Date(dateStr); // convert the date string to a Date object
  const yyyy = date.getFullYear(); // get the year (e.g. 2023)
  const mm = date.getMonth() + 1; // get the month (0-indexed, so add 1)
  const dd = date.getDate(); // get the day of the month

  const formattedDate = `${yyyy}-${mm.toString().padStart(2, "0")}-${dd
    .toString()
    .padStart(2, "0")}`;

  return formattedDate;
}
