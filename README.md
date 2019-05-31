# Bookshelf - Detail info

Bookshelf is a single-page social catalog for books with dynamic product display and reviews. The component covers a particular book information and its rating/review details in a graph.

## Table of Contents

1. [Application Features](#application features)
1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Application Features

#### Rating details pop up
It shows a graph of rating stats which dynamically calculated each user’s rating vote from one to five stars and distributed the voting percentage in the graph


#### Read status pull-down menu
- User can change and update the reading status
- User can save reading status with the book id and the user id in the database once selected a different status 
- User can see the recent status whenever came back to the page


#### Rating book
User can rate the book by selecting the number of stars from one to five and save the rating vote to the book’s rating database



## Usage
Multiple npm scripts provided for convenience. View full list at package.json

Basic startup of project after installing dependcies:

1. Seed database with npm script
   1. To seed database use: `npm run seed`

1. Start server with node or nodemon
   1. To start server with node use: `npm run start`
   1. To start server with nodemon, install nodemon with npm -i nodemon then use: `npm run start:dev`

1. Build and bundle client side code with webpack:
`npm run start-frontend`

1. View module at http://localhost/3002/books/:id
   1. Id is any number between 1-100 representing 100 books

1. Test project with jest:
`npm test`


## Requirements
Main Development Modules
- Node 10.14.x
- Express
- Mysql
- React with styled-components

Main Testing Modules
- Jest
- Supertest
- Enzyme

## Development

### Installing Dependencies

From within the root directory:

```sh
  npm install
```
