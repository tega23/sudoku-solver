//each individual square is called a box
//the complete rows.columns,3*3 squares are called units
//given a particular box , its peers will be all other boxes that belong to a common unit
//(those that belong to the same row, column, 3*3 square)
'use strict';
import {
  cross,
  getColUnits,
  getRowUnits,
  getSquareUnits,
  grid_values,
  findAllPeers,
  numberOfAssignedBoxes,
  checkForEmptyBox
} from './helpers.mjs';
const rows = 'ABCDEFGHI';
const cols = '123456789';
const grid_string = '..3.2.6..9..3.5..1..18.64....81.29..7.......8..67.82....26.95..8..2.3..9..5.1.3..';

const boxes = cross(rows, cols);
const row_units = getRowUnits(rows, cols);
const col_units = getColUnits(rows, cols);
const square_units = getSquareUnits();
const all_units = [...row_units, ...col_units, ...square_units];
const grid_v = grid_values(boxes, grid_string);

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

console.log(reduce_puzzle(grid_v));
