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


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port', port);
});
