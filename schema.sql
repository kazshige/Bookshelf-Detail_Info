DROP DATABASE IF EXISTS books;

CREATE DATABASE books;

USE books;

CREATE TABLE bookInfo (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE image (
  id INT NOT NULL AUTO_INCREMENT,
  bookInfo_id INT,
  image VARCHAR(500) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  bookInfo_id INT
);


CREATE TABLE ratings (
  id INT NOT NULL AUTO_INCREMENT,
  bookInfo_id INT,
  user_id INT,
  rating TINYINT,
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  bookInfo_id INT,
  review TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE readStatus (
  id INT NOT NULL AUTO_INCREMENT,
  bookInfo_id INT,
  user_id int,
  status TINYINT,
  PRIMARY KEY (id)
);

CREATE TABLE shelf (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200),
  user_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE bookShelf (
  id INT NOT NULL AUTO_INCREMENT,
  bookInfo_id INT,
  shelf_id INT,
  PRIMARY KEY (id)
);