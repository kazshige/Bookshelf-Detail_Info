const supertest = require('supertest');
const app = require('../server/index.js');
const request = supertest.agent(app);

describe('Test endpoint GET /books/:id', () => {

  test('Should return 200 status when called with valid bookId', (done) => {
    request.get('/books/1')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual(1);
      done();
    })
  });

  test('Should return 404 status when called with bookId does not exist', (done) => {
    request.get('/books/1000')
    .then((response) => {
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toEqual('no data');
      done();
    })
  });

  test('Should return 422 status when called with bookId is not int', (done) => {
    request.get('/books/!')
    .then((response) => {
      expect(response.statusCode).toBe(422);
      done();
    })
  });
});

describe('Test endpoint GET /books/:id/users', () => {
  test('Should return 200 status when called with valid endpoint /books/:id/users', (done) => {
  request.get('/books/1/users')
  .then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toEqual(100);
    done();
    })
  });

  test('Should return empty list when called with bookId is not valid id', (done) => {
    request.get('/books/1000/users')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toEqual(0);
      done();
    })
  });

  test('Should return 422 status when called with  is invalid', (done) => {
    request.get('/books/d/users')
    .then((response) => {
      expect(response.statusCode).toBe(422);
      done();
    })
  });
});

describe('Test endpoint GET /books/:id/image', () => {
  test('Should return 200 status when called valid endpoint /books/:id/image', (done) => {
    request.get('/books/1/image')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toEqual(1);
      done();
    })
  });

})