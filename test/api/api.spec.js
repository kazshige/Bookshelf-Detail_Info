const supertest = require('supertest');
const app = require('../../server/index.js');
const request = supertest.agent(app);

const db = require('../../database');

describe('Test GET /books/:id', () => {

  let mock;
  afterEach(() => {
    if(mock)
      mock.mockRestore();
  });

  test('Should return a 200 for valid bookId', (done) => {
    mock = jest.spyOn(db, 'getBookInfo');

    const rows = [{ id: 1 }];
    mock.mockImplementation(() => {
      return Promise.resolve(rows)
    });

    request.get('/books/1/info')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual(1);
      done();
    })
  });

  test('Should return a 404 when bookId does not exist', (done) => {
    mock =  jest.spyOn(db, 'getBookInfo');

    mock.mockImplementation(() => {
      return Promise.resolve([])
    });

    request.get('/books/1000/info')
    .then((response) => {
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toEqual('no data');
      done();
    })
  });

  test('Should return a 422 when bookId is not int', (done) => {
    request.get('/books/!/info')
    .then((response) => {
      expect(response.statusCode).toBe(422);
      done();
    })
  });

  test('Should return a 500 when database fail', (done) => {
    mock = jest.spyOn(db, 'getBookInfo');

    mock.mockImplementation(() => {
      return Promise.reject(new Error('Database connection failure'));
    });

    request.get('/books/1/info')
    .then((response) => {
      expect(response.statusCode).toBe(500);
      done();
    })
  });
});

describe('Test GET /books/:id/users', () => {

  let mock;
  afterEach(() => {
    if(mock)
      mock.mockRestore();
  });

  test('Should return a 200 for valid endpoint /books/:id/users', (done) => {
    mock = jest.spyOn(db, 'getUserInfo');

    const email = 'mock@mock.com';
    const bookInfo_id = 1;
    const result = [{ id: 1, bookInfo_id, email }];
    mock.mockImplementation(() => {
      return Promise.resolve(result);
    });

    request.get('/books/1/users')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(result);
      done();
      })
  });

  test('Should return an empty list for non existing bookId', (done) => {
    mock = jest.spyOn(db, 'getUserInfo');

    mock.mockImplementation(() => {
      return Promise.resolve([]);
    });

    request.get('/books/1000/users')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
      done();
    })
  });

  test('Should return a 404 for invalid bookId', (done) => {
    request.get('/books/d/users')
    .then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    })
  });
  test('Should return a 404 for invalid bookId', (done) => {
    request.get('/books/10.5/users')
    .then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    })
  });

  test('Should return a 500 when database fail', (done) => {
    mock = jest.spyOn(db, 'getUserInfo');

    mock.mockImplementation(() => {
      return Promise.reject(new Error('Database connection failure'));
    });

    request.get('/books/1/users')
    .then((response) => {
      expect(response.statusCode).toBe(500);
      done();
    })
  });
});

describe('Test GET /books/:id/image', () => {
  let mock;
  afterEach(() => {
    if(mock)
      mock.mockRestore();
  });

  test('Should return a 200 for valid endpoint /books/:id/image', (done) => {

    request.get('/books/1/image')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.bookInfo_id).toEqual(1);
      done();
    })
  });

  test('Should return a 404 for invalid bookId', (done) => {
    request.get('/books/d/image')
    .then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    })
  });

  test('Should return a 500 when database fail', (done) => {
    mock = jest.spyOn(db, 'getBookImage');

    mock.mockImplementation(() => {
      return Promise.reject(new Error('Database connection failure'));
    });

    request.get('/books/1/image')
    .then((response) => {
      expect(response.statusCode).toBe(500);
      done();
    })
  });
});


describe('Test GET /books/:id/ratings', () => {
  let mock;
  afterEach(() => {
    if(mock)
      mock.mockRestore();
  });

  test('Should return a 200 for valid endpoint /books/:id/ratings', (done) => {

    mock = jest.spyOn(db, 'getRatings');

    const result = [{
      bookInfo_id: 1,
      rating: 2,
      id: 1,
      user_id: 5
    }];

    mock.mockImplementation(() => {
      return Promise.resolve(result);
    });

    request.get('/books/1/ratings')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(result);
      done();
    })
  });

  test('Should return a 404 for invalid bookId', (done) => {
    request.get('/books/d/ratings')
    .then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    })
  });

  test('Should return a 500 when database fail', (done) => {
    mock = jest.spyOn(db, 'getRatings');

    mock.mockImplementation(() => {
      return Promise.reject(new Error('Database connection failure'));
    });

    request.get('/books/1/ratings')
    .then((response) => {
      expect(response.statusCode).toBe(500);
      done();
    })
  });
});


describe('Test GET /books/:id/reviews', () => {
  let mock;
  afterEach(() => {
    if(mock)
      mock.mockRestore();
  });

  test('Should return a 200 for valid endpoint /books/:id/reviews', (done) => {

    mock = jest.spyOn(db, 'getReviews');

    const result = [{
      bookInfo_id: 1,
      review: 'Mock review',
      id: 1,
    }];

    mock.mockImplementation(() => {
      return Promise.resolve(result);
    });

    request.get('/books/1/reviews')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(result);
      done();
    })
  });

  test('Should return a 404 for invalid bookId', (done) => {
    request.get('/books/d/reviews')
    .then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    })
  });

  test('Should return a 500 when database fail', (done) => {
    mock = jest.spyOn(db, 'getReviews');

    mock.mockImplementation(() => {
      return Promise.reject(new Error('Database connection failure'));
    });

    request.get('/books/1/reviews')
    .then((response) => {
      expect(response.statusCode).toBe(500);
      done();
    })
  });
});

// describe('Test PUT /books/:id/users/:userId/readStatus', () => {
//   let mock;
//   afterEach(() => {
//     if(mock)
//       mock.mockRestore();
//   });

//   test('Should return a 200 for successful update', (done) => {

//     mock = jest.spyOn(db, 'insertReadStatus');

//     mock.mockImplementation(() => {
//       return Promise.resolve();
//     });

//     request.put('/books/1/users/1/readStatus', { status: 1})
//     .then((response) => {
//       expect(response.statusCode).toBe(200);
//       expect(response.body.success).toEqual(true);
//       done();
//     })
//   });

//   test('Should return a 404 for invalid bookId', (done) => {
//     request.put('/books/a/users/5/readStatus')
//     .then((response) => {
//       expect(response.statusCode).toBe(404);
//       done();
//     })
//   });

//   test('Should return a 404 for invalid userId', (done) => {
//     request.put('/books/1/users/5.55/readStatus')
//     .then((response) => {
//       expect(response.statusCode).toBe(404);
//       done();
//     })
//   });

//   test('Should return a 500 when database fail', (done) => {
//     mock = jest.spyOn(db, 'insertReadStatus');

//     mock.mockImplementation(() => {
//       return Promise.reject(new Error('Database connection failure'));
//     });

//     request.put('/books/1/users/5/readStatus')
//     .then((response) => {
//       expect(response.statusCode).toBe(500);
//       done();
//     })
//   });
// });

describe('Test POST /users/:userId/shelf', () => {
  let mock;
  afterEach(() => {
    if(mock)
      mock.mockRestore();
  });

  test('Should return a 200 for successful insert', (done) => {

    mock = jest.spyOn(db, 'insertShelf');

    mock.mockImplementation(() => {
      return Promise.resolve();
    });

    request.post('/users/5/shelf')
    .send({ shelfName: 'mockshelf' })
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toEqual(true);
      done();
    })
  });

  test('Should return a 404 for invalid userId', (done) => {
    request.post('/users/5.55/shelf')
    .then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    })
  });

  test('Should return a 422 for empty shelf', (done) => {
    request.post('/users/5/shelf')
    .send({ shelfName: '' })
    .then((response) => {
      expect(response.statusCode).toBe(422);
      done();
    })
  });

  test('Should return a 422 for invalid shelf', (done) => {
    request.post('/users/5/shelf')
    .send({ shelfName: ['array'] })
    .then((response) => {
      expect(response.statusCode).toBe(422);
      done();
    })
  });


  test('Should return a 500 when database fail', (done) => {
    mock = jest.spyOn(db, 'insertShelf');

    mock.mockImplementation(() => {
      return Promise.reject(new Error('Database connection failure'));
    });

    request.post('/users/5/shelf')
    .send({ shelfName: 'mock'})
    .then((response) => {
      expect(response.statusCode).toBe(500);
      done();
    })
  });
});

describe('Test POST /books/:id/users/:userId/shelf/:shelfId', () => {
  let mock;
  afterEach(() => {
    if(mock)
      mock.mockRestore();
  });

  test('Should return a 200 for successful update', (done) => {

    mock = jest.spyOn(db, 'insertBookshelf');

    mock.mockImplementation(() => {
      return Promise.resolve();
    });

    request.post('/books/1/users/5/shelf/5')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toEqual(true);
      done();
    })
  });

  test('Should return a 404 for invalid bookId', (done) => {
    request.post('/books/a/users/5/shelf/5')
    .then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    })
  });

  test('Should return a 404 for invalid userId', (done) => {
    request.post('/books/1/users/5.55/shelf/6')
    .then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    })
  });

  test('Should return a 404 for invalid shelfId', (done) => {
    request.post('/books/1/users/5/shelf/asd')
    .then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    })
  });


  test('Should return a 500 when database fail', (done) => {
    mock = jest.spyOn(db, 'insertBookshelf');

    mock.mockImplementation(() => {
      return Promise.reject(new Error('Database connection failure'));
    });

    request.post('/books/1/users/5/shelf/5')
    .then((response) => {
      expect(response.statusCode).toBe(500);
      done();
    })
  });
});