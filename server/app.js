const express = require("express");
const routes = require("./../routes");
const path = require("path");

const app = express();

app.set('PORT', process.env.PORT || 3001);

app.get('/', function(req, res) {
  res.redirect('/books/1');
});

app.use(express.static('client/dist'));

app.get('/books/:id', function(req, res) {
  const id = req.params.id;
  const reactPath = path.join(__dirname, '../public/index.html');
  res.sendFile(reactPath);
});

app.use('/api', routes);

module.exports = app;

