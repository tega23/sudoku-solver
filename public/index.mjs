//each individual square is called a box
//the complete rows.columns,3*3 squares are called units
//given a particular box , its peers will be all other boxes that belong to a common unit
//(those that belong to the same row, column, 3*3 square)
'use strict';
import { cross } from './helpers.mjs';
const rows = 'ABCDEFGHI';
const cols = '123456789';

const boxes = cross(rows, cols);
console.log(boxes);
