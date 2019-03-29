const db = require('./');
const faker = require('faker');

class DummyDataGenerator {
  constructor() {

  }

  async createBookInfo() {
    for (let j = 0; j < 100; j++) {

      const data = {};
      data.title = faker.lorem.words();

      data.author = faker.name.findName();

      data.description = faker.lorem.sentences() + '\n' + faker.lorem.sentences();

      const result = await db.insertBookInfo(data);
      const bookId = result.insertId;

      let image = faker.image.imageUrl();

      await db.insertBookImage(bookId, image);
      await this.createRatings(bookId);
    }
  };

  async createUsers() {
    let users = [];
    for (let i = 0; i < 100; i++) {
      let data = {
        email: faker.internet.email()
      };
      // data.email = faker.internet.email();
      let user = await db.insertUsers(data)
      users.push(user)
    }
  };

  async createShelf(){
    let shelves = [];
    for (let i =0; i < 200; i++){
      let s = await db.insertShelf(faker.random.word(10));
      shelves.push(s);
    }
  };

  async createRatings(bookId) {
    for (let k = 0; k < 20; k++) {
       let userId = Math.ceil(Math.random() * 100); // get user id
       let rating = Math.ceil(Math.random() * 5);

       await db.insertRatings(bookId, userId, rating);
    }
  };

  async createData() {
    await this.createUsers();
    await this.createBookInfo();
    await this.createShelf();
  }
};

new DummyDataGenerator()
.createData()
.then(() => {
  db.close()
});

  /*
  async createToRead(){
    for(let bookId = 0 ; bookId < 100 ; bookId++) {
      let j = Math.ceil(Math.random() * 20)
      for (let l = 0; l < j; l++) {
        let userId = Math.ceil(Math.random() * 100);
        insertToRead(bookId, userId);
      }
    }
  }

  let status = ["Want to Read", "Currently Reading", "Read"];
      for (let m = 0; m < 50; m++) {

        insertReadStatus(bookId, user[m].id, status[Math.round(Math.random() * 2 )]);
      }

      users.forEach((user)=> {
        insertBookshelf(bookId, user.id, shelves[Math.round(Math.random() * 500 )])
      })
    }
    */