const db = require('./database');
const faker = require('faker');

class DummyDataGenerator {
  constructor() {

  }
  async createData() {
    for (let i = 0; i < 100; i++) {

      const data = {};
      data.title = faker.lorem.words();

      data.author = faker.name.findName();

      data.description = faker.lorem.sentences() + '\n' + faker.lorem.sentences();

      await db.insertBookInfo(data);
    }

  }
}

new DummyDataGenerator()
  .createData()
  .then(() => db.close())