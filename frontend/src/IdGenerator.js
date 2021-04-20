/**
 * generate a 6-digit id number for a specific question
 * @param {array} idList
 * @returns {number}
 */
export default function IdGenerator (idList) {
  let id = parseInt(Math.random() * (999999 - 100000 + 1) + 100000);
  while (idList.indexOf(id) >= 0) {
    id = parseInt(Math.random() * (999999 - 100000 + 1) + 100000);
  }
  return id;
}
