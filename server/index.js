const express = require('express');
const db = require('../database/index');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = 3002;

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get( '/books/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const rows = await db.getBookInfo(id);
  if(rows && rows.length){
    res.json(rows[0]);
  } else {
    res.json({ error: 'no data'})
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});