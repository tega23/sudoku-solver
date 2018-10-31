import express from 'express';
import path from 'path';

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port', port);
});
