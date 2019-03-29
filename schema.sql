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

CREATE TABLE image (
  id int NOT NULL AUTO_INCREMENT,
  bookInfo_id int,
  image BLOB,
  PRIMARY KEY (id)
);

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE ratings (
  id INT NOT NULL AUTO_INCREMENT,
  bookInfo_id int,
  user_id int,
  rating TINYINT,
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  ratings_id int,
  PRIMARY KEY (id)
);

CREATE TABLE toRead (
  id INT NOT NULL AUTO_INCREMENT,
  bookInfo_id int,
  user_id int,
  PRIMARY KEY (id)
);

CREATE TABLE readStatus (
  id INT NOT NULL AUTO_INCREMENT,
  bookInfo_id int,
  user_id int,
  status TINYINT,
  PRIMARY KEY (id)
);

CREATE TABLE shelf (
  id int NOT NULL AUTO_INCREMENT,
  name VARCHAR(20),
  PRIMARY KEY (id)
);

CREATE TABLE bookShelf (
  id int NOT NULL AUTO_INCREMENT,
  bookInfo_id int,
  user_id int,
  shelf_id int,
  PRIMARY KEY (id)
);