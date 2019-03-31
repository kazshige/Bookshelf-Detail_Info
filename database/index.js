const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const query = function(query, placeholders) {
  return new Promise((resolve, reject) => {
    connection.query(query, placeholders, (err, rows) => {
      if(err)
        return reject(err);

        resolve(rows);
    })
  })
};

const getAllBookInfo = function() {
  return query('SELECT * FROM bookInfo');
};

const getBookInfo = function(bookId) {
  return query('SELECT * FROM bookInfo WHERE id='+bookId);
};


// image, ratings, reviews, readStatus, shelf, bookShelf
const insertBookInfo = function(data) {
  return query('INSERT INTO bookInfo (title, author, description) VALUES(?, ?, ?)', [data.title, data.author, data.description]);
};

const insertBookImage = function(bookId, image) {
  return query('INSERT INTO image (bookInfo_id, image) VALUES(?, ?)', [bookId, image]);
};

const getUserInfo = function(bookInfo_id) {
  return query('SELECT * FROM users WHERE bookInfo_id='+bookInfo_id);
};

const insertUsers = function(user) {
  return query('INSERT INTO users (email, bookInfo_id) VALUES(?, ?)', [user.email, user.bookInfo_id]);
};

const getRatings = function(bookInfo_id) {
  return query('SELECT * FROM ratings WHERE bookInfo_id='+bookInfo_id);
};

const insertRatings = function(bookId, userId, rating) {
  return query('INSERT INTO ratings (bookInfo_id, user_id, rating) VALUES(?, ?, ?)', [bookId, userId, rating]);
};

const getReviews = function(bookInfo_id) {
  return query('SELECT * FROM reviews WHERE bookInfo_id='+bookInfo_id);
};

const insertReviews = function({bookId, review}) {
  return query('INSERT INTO reviews (bookInfo_id, review) VALUES(?, ?)', [bookId, review]);
};

const insertReadStatus = function(bookId, userId, status) {
  return query('INSERT INTO readStatus (bookInfo_id, user_id, status) VALUES(?, ?, ?)', [bookId, userId, status]);
};

const insertShelf = function(name) {
  return query('INSERT INTO shelf (name) VALUES(?)', [name]);
};

const insertBookshelf = function(bookId, userId, shelfId) {
  return query('INSERT INTO bookShelf (bookInfo_id, user_id, shelf_id) VALUES(?, ?, ?)', [bookId, userId, shelfId]);
};

module.exports = {
  getAllBookInfo,
  getBookInfo,
  insertBookInfo,
  insertBookImage,
  getUserInfo,
  insertUsers,
  getRatings,
  insertRatings,
  getReviews,
  insertReviews,
  insertShelf,
  insertBookshelf,
  insertReadStatus,
  close: () => connection.end()
};