export function cross(rows, cols) {
  let result = [];
  for (let row of rows) {
    for (let col of cols) {
      result.push(row + col);
    }
  }
  return result;
}
