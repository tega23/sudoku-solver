// const grid_inputs = require('./sudoku_grids.mjs');
/*
 * Frontend Javascript
*/

const grid_inputs = [
  '..3.2.6..9..3.5..1..18.64....81.29..7.......8..67.82....26.95..8..2.3..9..5.1.3..',
  '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......',
  '..5..142.39..5..7....47...5.3.69.8.4...285...8.9.43.5.2...14....5..2..46.185..2..',
  '.196.82...3..2..8.8.43......62.9.34.9.......6.45.1.72......16.4.8..5..9...19.487.',
  '..62.418.....8..9.1..9.64.5..1...97.6..5.7..3.28...5..2.78.9..1.1..5.....956.37..',
  '.8..5..1.5..8.7.46.....18.212..6..75..7...6..95..4..237.24.....89.2.6..4.6..3..8.',
  '.....38.95..8.7.61.8..5..3.39..1..75..7...1..25..6..94.1..4..8.82.9.1..67.96.....',
  '1.68.2..5..9.5.2..32.9.....5.8.1.3.9.1.....8.4.3.6.5.7.....6.38..2.4.1..6..1.37.2',
  '....2..3...65.824.3..4.76.1..2...71.5..6.2..8.64...3..2.98.4..3.739.18...4..7....',
  '9..8.7.64..41.93.7....6..1.4......21..93.25..68......3.4..3....2.86.14..31.9.5..2',
  '.958.....4...2...37.39.48..1.7.8.2.9.5.....4.9.6.4.1.5..13.54.83...1...6.....693.'
];

var grid = document.getElementById('grid');
var table = document.createElement('table');
grid.appendChild(table);
for (let i = 0; i < 9; i++) {
  let row = document.createElement('tr');
  for (let j = 0; j < 9; j++) {
    let col = document.createElement('td');
    let input_box = document.createElement('input');
    input_box.setAttribute('type', 'text');
    input_box.setAttribute('name', 'box');
    input_box.setAttribute('class', 'box-input');
    col.appendChild(input_box);
    row.appendChild(col);
  }
  table.appendChild(row);
}

var footer = document.createElement('div');
footer.setAttribute('id', 'footer');
var button = document.createElement('button');
button.innerHTML = 'SOLVE';
button.setAttribute('type', 'submit');
button.setAttribute('class', 'solve-btn');
button.setAttribute('onclick', 'submitHandler()');
footer.appendChild(button);
grid.appendChild(footer);

function randomFillGrid() {
  var rand = parseInt(Math.random() * grid_inputs.length);
  var grid_string = grid_inputs[rand];
  fillGrid(grid_string);
}

function fillGrid(input_string) {
  var box_inputs = document.getElementsByClassName('box-input');

  for (let i = 0; i < box_inputs.length; i++) {
    if (input_string[i].trim() == '.') box_inputs[i].value = '';
    else box_inputs[i].value = input_string[i];
  }
}

function clearGrid() {
  fillGrid('.'.repeat(81));
}

function checkValidityOfGrid(input_string) {
  if (input_string.length > 81 || input_string.match(/[a-z]/i)) {
    console.log('YEAHH');
    return false;
  }
  return true;
}

function submitHandler(e) {
  e = e || window.event;
  e.preventDefault();
  var rand = parseInt(Math.random() * 2);
  var grid_string = grid_inputs[rand];
  var box_inputs = document.getElementsByClassName('box-input');
  return_string = '';
  for (let i = 0; i < box_inputs.length; i++) {
    if (box_inputs[i].value.trim() == '') return_string += '.';
    else return_string += box_inputs[i].value;
  }
  if (!checkValidityOfGrid(return_string)) {
    fillGrid('.'.repeat(81));
    return;
  }
  let url = '/api/solve';
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      grid_string: return_string
    })
  })
    .then(response => response.json())
    .then(response => {
      if (response.data === '') {
        window.alert("Set is invalid!!!");
        fillGrid('.'.repeat(81));
      }
      fillGrid(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}
