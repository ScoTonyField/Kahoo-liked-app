// given two string in iso time format, calculate two time different in second
export function calculateIsoTimeDiff (start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return (endDate - startDate) / 1000;
}

// given a string in iso time format, return a string in a user friendly format
// return value: 'Day Month DD YYYY HH:MM:SS'
export function toFriendlyFormat (time) {
  return new Date(time).toString().split(' ').splice(0, 5).join(' ');
}
