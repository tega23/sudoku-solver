import express from 'express';
import path from 'path';
var bodyParser = require('body-parser');

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

app.post('/', (req, res) => {
  console.log(req.body);
  res.send('YYAAA');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port', port);
});
