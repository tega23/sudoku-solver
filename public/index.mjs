'use strict';

import {
  cross,
  getColUnits,
  getRowUnits,
  getSquareUnits,
  grid_values,
  findAllPeers,
  numberOfAssignedBoxes,
  checkForEmptyBox,
  getMinimumBox
} from './helpers.mjs';

const rows = 'ABCDEFGHI';
const cols = '123456789';

const boxes = cross(rows, cols);
const row_units = getRowUnits(rows, cols);
const col_units = getColUnits(rows, cols);
const square_units = getSquareUnits();
const all_units = [...row_units, ...col_units, ...square_units];

export function stringToGridValues(grid_string) {
  return grid_values(boxes, grid_string);
}

function eliminate(grid_values) {
  for (let [key, value] of Object.entries(grid_values)) {
    if (value.length == 1) {
      let all_peers = findAllPeers(row_units, col_units, square_units, key);
      for (let peer of all_peers) {
        let reg = new RegExp(grid_values[key], 'g');
        grid_values[peer] = grid_values[peer].replace(reg, '');
      }
    }
  }
  return grid_values;
}

function only_choice(grid_values, unitlist) {
  for (let unit of unitlist) {
    let dplaces = [];
    for (let digit of '123456789') {
      for (let box of unit) {
        if (grid_values[box].indexOf(digit) != -1) {
          dplaces.push(box);
        }
      }
      if (dplaces.length == 1) {
        grid_values[dplaces[0]] = digit;
      }
    }
  }
  return grid_values;
}

function reduce_puzzle(grid_values) {
  let stalled = false;
  while (!stalled) {
    let solved_values_before = numberOfAssignedBoxes(grid_values);

    let values = eliminate(grid_values);

    values = only_choice(grid_values, all_units);

    let solved_values_after = numberOfAssignedBoxes(grid_values);

    stalled = solved_values_before == solved_values_after;
    if (checkForEmptyBox(grid_values)) {
      return false;
    }
  }
  return grid_values;
}

export default function search(values) {
  values = reduce_puzzle(values);
  console.log(values);
  if (values === false) {
    return false;
  }
  if (numberOfAssignedBoxes(values) === 81) {
    return values;
  }
  const minimumBox = getMinimumBox(boxes, values);
  for (let value of values[minimumBox]) {
    let new_sudoku = Object.assign({}, values);
    new_sudoku[minimumBox] = value;
    let attempt = search(new_sudoku);
    if (attempt) {
      return attempt;
    }
  }
}
