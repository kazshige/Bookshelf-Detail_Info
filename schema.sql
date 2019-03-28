DROP DATABASE IF EXISTS books;

CREATE DATABASE books;

USE books;

CREATE TABLE bookInfo (
  id int NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE image (
  bookInfo_id int,
  image BLOB
);

CREATE TABLE ratings (
  bookInfo_id int,
  user_id int,
  rating TINYINT
);

CREATE TABLE reviews (
  bookInfo_id int,
  user_id int
);

CREATE TABLE toRead (
  bookInfo_id int,
  user_id int
);

CREATE TABLE readStatus (
  bookInfo_id int,
  user_id int,
  status TINYINT
);

CREATE TABLE shelf (
  id int NOT NULL,
  name VARCHAR(20)
);

CREATE TABLE bookShelf (
  bookInfo_id int,
  user_id int,
  shelf_id int
);