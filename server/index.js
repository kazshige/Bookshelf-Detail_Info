const express = require('express');
const path = require('path')
const db = require('../database/index');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/public')));

app.all("/books/:id", async(req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
})

app.get('/books/:id/info', async (req, res) => {
  const id = req.params.id;
  if(!/^\d+$/.test(id))
    return res.status(422).json();

  try {
    const rows = await db.getBookInfo(id);
    if(rows && rows.length){
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'no data'})
    }
  } catch(e){
    res.status(500).json({ error: e.message })
  }
});

app.get('/books/:id/users', async (req, res) => {
  let id = req.params.id;
  try {
    if(!/^\d+$/.test(id)) {
      res.status(404).json()
    } else {
      const rows = await db.getUserInfo(id);
      res.json(rows);
    }
  } catch(e) {
    res.status(500).json({ error: e.message });
  }

});

app.get('/books/:id/image', async (req, res) => {
  let id = parseInt(req.params.id);
  if(!/^\d+$/.test(id)) {
    return res.status(404).json();
  }

  try {
    const rows = await db.getBookImage(id);
    res.json(rows[0]);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/books/:id/ratings', async (req, res) => {
  const id = req.params.id;

  if(!/^\d+$/.test(id)) {
    return res.status(404).json();
  }

  try{
    const rows = await db.getRatings(id);
    res.json(rows);
  } catch(e){
    res.status(500).json({ error: e.message})
  }
});

app.get('/books/:id/reviews', async (req, res) => {
  const id = req.params.id;

  if(!/^\d+$/.test(id)) {
    return res.status(404).json();
  }

  try{
    const rows = await db.getReviews(id);

    res.json(rows);
  } catch(e){
    res.status(500).json({ error: e.message})
  }
});

app.put('/books/:id/users/:userId/readStatus', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const userId = parseInt(req.params.userId, 10);
  const { status } = req.body;
  if(!/^\d+$/.test(id) || !/^\d+$/.test(userId)) {
    return res.status(404).json();
  }

  try{
    const rows = await db.getReadStatus(id, userId)
    if(rows[0]){
      await db.updateReadStatus(id, userId, status);
    }else {
      await db.insertReadStatus(id, userId, status)
    }

    const data = await db.getReadStatus(id, userId)
    return res.json({
      data: data[0]
    })
  } catch(e){
    res.status(500).json({ error: e.message })
  }
});

app.get('/books/:id/users/:userId/readStatus',  async(req, res)=> {
  const id = req.params.id;
  const userId = req.params.userId;

  if(!/^\d+$/.test(id) || !/^\d+$/.test(userId)) {
    return res.status(404).json();
  }
  try {
    const rows = await db.getReadStatus(id, userId)
    return res.json({
      data: rows[0] || ""
    })
  }catch(e){
    res.status(500).json({ error: e.message })
  }
})

// Adding a shelf
app.post('/users/:userId/shelf', async (req, res) => {
  const { shelfName } = req.body;
  const userId = req.params.userId;

  if(!/^\d+$/.test(userId)) {
    return res.status(404).json();
  }

  if(!shelfName || typeof shelfName !== 'string')
    return res.status(422).json();

  try{
    await db.insertShelf(shelfName, userId);
    res.json({ success: true })

  } catch(e){
    res.status(500).json({ error: e.message })
  }
});

// Adding a shelf to bookShelf
app.post('/books/:id/users/:userId/shelf/:shelfId', async (req, res) => {
  const { id, shelfId, userId } = req.params;

  if(!/^\d+$/.test(id) || !/^\d+$/.test(shelfId) || !/^\d+$/.test(userId)) {
    return res.status(404).json();
  }

  try{
    await db.insertBookshelf(id, shelfId);
    res.json({ success: true })

  } catch(e){
    res.status(500).json({ error: e.message })
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});

module.exports = app