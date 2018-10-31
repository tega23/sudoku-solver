export function cross(rows, cols) {
  let result = [];
  for (let row of rows) {
    for (let col of cols) {
      result.push(row + col);
    }
  }
  return result;
}

export function getRowUnits(rows, cols) {
  let row_units = [];
  for (let r of rows) {
    row_units.push(cross(r, cols));
  }
  return row_units;
}

export function getColUnits(rows, cols) {
  let col_units = [];
  for (let c of cols) {
    col_units.push(cross(rows, c));
  }
  return col_units;
}

export function getSquareUnits() {
  let square_units = [];
  for (let rs of ['ABC', 'DEF', 'GHI']) {
    for (let cs of ['123', '456', '789']) {
      square_units.push(cross(rs, cs));
    }
  }
  return square_units;
}

export function grid_values(boxes, grid_string) {
  let values = {};
  for (let index in boxes) {
    if (grid_string[index] == '.') {
      values[boxes[index]] = '123456789';
    } else {
      values[boxes[index]] = grid_string[index];
    }
  }
  return values;
}

export function findPeers(array_of_units, search_term) {
  let peers = [];
  for (let unit of array_of_units) {
    if (unit.indexOf(search_term) != -1) {
      peers = unit.filter(v => v != search_term);
      return peers;
    }
  }
  return;
}

export function findAllPeers(row_units, col_units, square_units, search_term) {
  let row_peers = findPeers(row_units, search_term);
  let col_peers = findPeers(col_units, search_term);
  let square_peers = findPeers(square_units, search_term);
  return [...row_peers, ...col_peers, ...square_peers];
}
