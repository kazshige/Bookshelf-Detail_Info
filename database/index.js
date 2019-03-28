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

module.exports = {
  getAllBookInfo,
  insertBookInfo,
  close: () => connection.end()
};