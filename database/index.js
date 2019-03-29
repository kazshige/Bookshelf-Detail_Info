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
}

const getAllBookInfo = function() {
  return query('SELECT * FROM bookInfo');
};

const insertBookInfo = function(data) {
  return query('INSERT INTO bookInfo (title, author, description) VALUES(?, ?, ?)', [data.title, data.author, data.description]);
};

const insertBookImage = function(bookId, image) {
  return query('INSERT INTO image (bookInfo_id, image) VALUES(?, ?)', [bookId, image]);
}

const insertUser = function(user) {
  return query('INSERT INTO user (email) VALUES(?)', [user.email]);
};

const insertBookImage = function(bookId, image) {
  return query('INSERT INTO ratings (bookInfo_id, image) VALUES(?, ?)', [bookId, image]);
}

const insertRatings = function(bookId, userId, rating) {
  return query('INSERT INTO ratings (bookInfo_id, user_id, rating) VALUES(?, ?, ?)', [bookId, userId, rating]);
}

const insertReviews = function(ratingId) {
  return query('INSERT INTO ratings (ratings_id) VALUES(?)', [ratingId]);
}

const insertToRead = function(bookId, userId) {
  return query('INSERT INTO ratings (bookInfo_id, user_id) VALUES(?, ?)', [bookId, userId]);
}

const insertReadStatus = function(bookId, userId, status) {
  return query('INSERT INTO ratings (bookInfo_id, user_id, status) VALUES(?, ?)', [bookId, userId, status]);
}

const insertShelf = function(name) {
  return query('INSERT INTO ratings (name) VALUES(?)', [name]);
}

const insertBookshelf = function(bookId, userId, shelfId) {
  return query('INSERT INTO ratings (bookInfo_id, user_id, shelf_id) VALUES(?, ?, ?)', [bookId, userId, shelfId]);
}

module.exports = {
  getAllBookInfo,
  insertBookInfo,
  insertBookImage,
  insertUser,
  insertRatings,
  insertReviews,
  insertToRead,
  insertReadStatus,
  insertShelf,
  insertBookshelf,
  close: () => connection.end()
};