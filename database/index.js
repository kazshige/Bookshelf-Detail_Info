const mysql = require('mysql');
const Promise = require('bluebird');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);
// const db = Promise.promisifyAll(connection, { multiArgs: true });

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

const getBookImage = function(bookId) {
  return query('SELECT * FROM image WHERE bookInfo_id='+bookId);
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

const updateReadStatus = function(bookId, userId, status) {
  return query(`UPDATE readStatus SET status = ${status} WHERE user_id = ${userId} AND bookInfo_id = ${bookId}`);
};

const insertReadStatus = function(bookId, userId, status) {
  return query(`INSERT INTO readStatus (status, user_id, bookInfo_id) VALUES(?,?,?)`, [status, userId, bookId]);
};


const getReadStatus = function(bookId, userId) {
  return query(`SELECT * FROM readStatus WHERE user_id = ${userId} AND bookInfo_id = ${bookId}`);
};

const insertShelf = function(name, user_id) {
  return query('INSERT INTO shelf (name, user_id) VALUES(?,?)', [name, user_id]);
};

const insertBookshelf = function(bookId, shelfId) {
  return query('INSERT INTO bookShelf (bookInfo_id, shelf_id) VALUES(?, ?)', [bookId, shelfId]);
};

module.exports = {
  getAllBookInfo,
  getBookInfo,
  insertBookInfo,
  getBookImage,
  insertBookImage,
  getUserInfo,
  insertUsers,
  getRatings,
  insertRatings,
  getReviews,
  insertReviews,
  insertShelf,
  insertBookshelf,
  updateReadStatus,
  getReadStatus,
  insertReadStatus,
  queryAsync: query,
  close: () => connection.end()
};
