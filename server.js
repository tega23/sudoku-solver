import express from 'express';
import path from 'path';
import search, { stringToGridValues } from './public/algorithm.mjs';
import { getValuesFromObject, stringify_array } from './public/helpers.mjs';

const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/api/solve', (req, res) => {
  const grid_string = req.body.grid_string;
  const puzzle = search(stringToGridValues(grid_string));
  const puzzle_array = getValuesFromObject(puzzle);
  const puzzle_string = stringify_array(puzzle_array);
  res.send({ data: puzzle_string.toString() });
});

/*
app.post('/', (req, res) => {
  // let grid_string = stringify_array(req.body.box);
  let grid_string = '..3.2.6..9..3.5..1..18.64....81.29..7.......8..67.82....26.95..8..2.3..9..5.1.3..';
  const puzzle = search(stringToGridValues(grid_string));
  const puzzle_array = getValuesFromObject(puzzle);
  // res.send(puzzle_array);
  res.render('./result.ejs', { puzzle_array: puzzle_array });
});
*/

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port', port);
});
