const express = require('express');
const db = require('../database/index');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = 3002;

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/books/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
  const rows = await db.getBookInfo(id);
  if(rows && rows.length){
    res.json(rows[0]);
  } else {
    res.status(404).json({ error: 'no data'})
  }
  }catch(e){
    res.status(500).json({ error: e.message })
  }
});

app.get('/books/:id/users', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try{
    const rows = await db.getUserInfo(id);
  if(rows && rows.length){
    res.json(rows);
  } else {
    res.status(404).json({ error: 'no data' })
  }
  }catch(e){
    res.status(500).json({ error: e.message })
  }
});

app.get('/books/:id/image', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try{
    const rows = await db.getBookImage(id);
  if(rows && rows.length){
    res.json(rows);
  } else {
    res.status(404).json({ error: 'no data' })
  }
  }catch(e){
    res.status(500).json({ error: e.message })
  }
});

app.get('/books/:id/users', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try{
    const rows = await db.getUserInfo(id);
  if(rows && rows.length){
    res.json(rows);
  } else {
    res.status(404).json({ error: 'no data'})
  }
  }catch(e){
    res.status(500).json({ error: e.message})
  }
});

app.get('/books/:id/ratings', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try{
    const rows = await db.getRatings(id);
  if(rows && rows.length){
    res.json(rows);
  } else {
    res.status(404).json({ error: 'no data'})
  }
  }catch(e){
    res.status(500).json({ error: e.message})
  }
});

app.get('/books/:id/reviews', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try{
    const rows = await db.getReviews(id);
  if(rows && rows.length){
    res.json(rows);
  } else {
    res.status(404).json({ error: 'no data'})
  }
  }catch(e){
    res.status(500).json({ error: e.message})
  }
});

app.put('/books/:id/users/:userId/readStatus', async (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;
  const { status } = req.body;
  console.log(id);
  try{
    await db.insertReadStatus(id, userId, status);
    res.json({ success: true })

  }catch(e){
    res.status(500).json({ error: e.message })
  }
});

// Adding a shelf
app.post('/users/:userId/shelf', async (req, res) => {
  const { shelfName } = req.body;
  const userId = req.params.userId;
  try{
    await db.insertShelf(shelfName, userId);
    res.json({ success: true })

  }catch(e){
    res.status(500).json({ error: e.message })
  }
});

// Adding a shelf to bookShelf
app.post('/books/:id/users/:userId/shelf/:shelfId', async (req, res) => {
  const id = req.params.id;
  const shelfId = req.params.shelfId;
  console.log(id);
  try{
    await db.insertBookshelf(id, shelfId);
    res.json({ success: true })

  }catch(e){
    res.status(500).json({ error: e.message })
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});
module.exports = app