export function stringify_array(array) {
  const grid_string = array.reduce((accumulator, current_value) => {
    if (current_value === '') {
      return (accumulator += '.');
    } else {
      return (accumulator += current_value);
    }
  }, '');
  return grid_string;
}

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

export function numberOfAssignedBoxes(grid_values) {
  let count = 0;
  for (let [key, value] of Object.entries(grid_values)) {
    if (value.length == 1) {
      count += 1;
    }
  }
  return count;
}

export function checkForEmptyBox(grid_values) {
  for (let [key, value] of Object.entries(grid_values)) {
    if (value.length == 0) {
      return true;
    }
  }
  return false;
}

export function getMinimumBox(boxes, grid_values) {
  let box_index_to_length = [];
  for (let box of boxes) {
    if (grid_values[box].length > 1) {
      box_index_to_length.push([box, grid_values[box].length]);
    }
  }
  let minimum_box = box_index_to_length[0];
  for ([box, box_length] of box_index_to_length) {
    if (box_length < minimum_box[1]) {
      minimum_box = [box, box_length];
    }
  }
  return minimum_box[0];
}

export function getValuesFromObject(object) {
  let array_values = [];
  for ([k, v] of Object.entries(object)) {
    array_values.push(v);
  }
  return array_values;
}
