const db = require('./');
const faker = require('faker');

class DummyDataGenerator {
  constructor() {
  }

  getRandomStatus() {
    const status = [
      1, // want-to-read
      2, // currently reading
      3 // read
    ];
    return status[Math.floor(Math.random() * status.length)];
  };

  async seedBookInfo() {

    for (let j = 0; j < 100; j++) {

      const data = {};
      data.title = faker.lorem.words();

      data.author = faker.name.findName();

      data.description = faker.lorem.sentences() + '\n' + faker.lorem.sentences();

      const result = await db.insertBookInfo(data);
      const bookId = result.insertId;

      let image = faker.image.imageUrl();

      await db.insertBookImage(bookId, image);
      await this.seedRatings(bookId);

      for(const user of this.users) {
        const status = this.getRandomStatus();
        await db.insertReadStatus(bookId, user, status);
      }
    }
  };

  async seedUsers() {
    this.users = [];
    for (let i = 0; i < 100; i++) {
      let data = {
        email: faker.internet.email()
      };
      let user = await db.insertUsers(data)
      this.users.push(user.insertId);
    }
  };

  async seedShelf(){
    let shelf = [];
    for (let i =0; i < 200; i++){
      let s = await db.insertShelf(faker.random.word(10));
      shelf.push(s);
    }
  };

  async seedRatings(bookId) {
    for (let k = 0; k < 20; k++) {
      let userId = Math.ceil(Math.random() * 100); // get user id
      let rating = Math.ceil(Math.random() * 5);

      const result = await db.insertRatings(bookId, userId, rating);

      await db.insertReviews(result.insertId);
    }
  };

  async seedData() {
    await this.seedUsers();
    await this.seedBookInfo();
    await this.seedShelf();
  }
};

new DummyDataGenerator()
.seedData()
.then(() => {
  db.close()
});