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

  // Seed 100 book information
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
  
  // Seed 100 users
  async seedUsers() {
    this.users = [];
    for (let i = 0; i < 100; i++) {
      let data = {
        email: faker.internet.email(),
        bookInfo_id: 1
      };
      let user = await db.insertUsers(data)
      this.users.push(user.insertId);
    }
  };

  async seedShelf(){
    let shelf = [];
    for(let j=1; j<=100; j++){
      for (let i =0; i < 5; i++){
        let s = await db.insertShelf(faker.random.word(10), j);
        shelf.push(s);
      }
    }
  };

  async seedRatings(bookId) {
    for (let k = 0; k < 20; k++) {
      let userId = Math.ceil(Math.random() * 100); // get user id
      let rating = Math.ceil(Math.random() * 5);

      await db.insertRatings(bookId, userId, rating);

      const review = {
        bookId,
        review: faker.lorem.sentences()
      }
      await db.insertReviews(review);
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