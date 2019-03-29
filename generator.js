const db = require('./database');
const faker = require('faker');

class DummyDataGenerator {
  constructor() {

  }
  async createData() {
    let users = [];
    for (let i = 0; i < 100; i++) {
      let data = {};
      data.email = faker.internet.email();
      let user = await insertUser(data)
      users.push(user)
    }
    for (let j = 0; j < 100; j++) {

      const data = {};
      data.title = faker.lorem.words();

      data.author = faker.name.findName();

      data.description = faker.lorem.sentences() + '\n' + faker.lorem.sentences();

      const result = await db.insertBookInfo(data);
      const bookId = result.insertId;

      await db.insertBookImage(bookId, image);

      const ratings = []; // Generate random reviews

      for (let k = 0; k < 100; k++) {
        const rating = {
          bookId,
          userId: users[k].id, // get user id
          rating: Math.ceil(Math.random() * 5)
        };

        let rating =await db.insertRating(rating);
      }



    }

  }
}

new DummyDataGenerator()
  .createData()
  .then(() => db.close())