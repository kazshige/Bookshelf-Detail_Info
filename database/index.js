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

const insertBookInfo = function(data) {
  return query('INSERT INTO bookInfo (title, author, description) VALUES(?, ?, ?)', [data.title, data.author, data.description]);
};

const insertBookImage = function(bookId, image) {
  return query('INSERT INTO image (bookInfo_id, image) VALUES(?, ?)', [bookId, image]);
};

const insertUsers = function(user) {
  return query('INSERT INTO users (email) VALUES(?)', [user.email]);
};

const insertRatings = function(bookId, userId, rating) {
  return query('INSERT INTO ratings (bookInfo_id, user_id, rating) VALUES(?, ?, ?)', [bookId, userId, rating]);
};

const insertShelf = function(name) {
  return query('INSERT INTO shelf (name) VALUES(?)', [name]);
};

const insertBookshelf = function(bookId, userId, shelfId) {
  return query('INSERT INTO bookShelf (bookInfo_id, user_id, shelf_id) VALUES(?, ?, ?)', [bookId, userId, shelfId]);
};

module.exports = {
  getAllBookInfo,
  insertBookInfo,
  insertBookImage,
  insertUsers,
  insertRatings,
  insertShelf,
  insertBookshelf,
  close: () => connection.end()
};