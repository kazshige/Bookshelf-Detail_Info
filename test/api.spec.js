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
  })

  test('Should return 404 status when called with bookId does not exist', (done) => {
    request.get('/books/1000')
    .then((response) => {
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toEqual('no data');
      done();
    })
  })

  test('Should return 500 status when called with invalid bookId', (done) => {
    request.get('/books/!')
    .then((response) => {
      expect(response.statusCode).toBe(500);
      done();
    })
  })
})