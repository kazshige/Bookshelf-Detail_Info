const express = require('express');
const db = require('../database');

const app = express();
const PORT = 3000;


app.get( 'api/books', (req, res) => {
  db.getAllBookInfo((err, books) => {
    if(!err) {
      res.status(200).send({ books });
    }
    console.log(books, 'books');
  });
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});