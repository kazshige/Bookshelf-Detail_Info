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

    let shelves =[];
    for (let i =0; i< 500; i++){
      let sname = faker.random.word;
      let s = await insertShelf(sname);
      shelves.push(s);
    }

    for (let j = 0; j < 100; j++) {

      const data = {};
      data.title = faker.lorem.words();

      data.author = faker.name.findName();

      data.description = faker.lorem.sentences() + '\n' + faker.lorem.sentences();

      const result = await db.insertBookInfo(data);
      const bookId = result.insertId;

      await db.insertBookImage(bookId, image);

      let ratings = []; // Generate random reviews

      for (let k = 0; k < 100; k++) {
        let rating = {
          bookId,
          userId: users[k].id, // get user id
          rating: Math.ceil(Math.random() * 5)
        };

        let rating =await db.insertRatings(rating);
        ratings.push(rating)
      }

      let noOfReviews = Math.ceil(Math.random() * ratings.length)
      ratings = ratings.slice(0, noOfReviews-1)
      ratings.forEach((rating, i)=>{
        data = {}
        data.ratingId = rating.id
        insertReviews(rating.id)
      })

      for (let l = 0; l < 20; l++) {
        let toReads = {
          bookId,
          userId: users[l].id
        };
        insertToRead(bookId, userId);
      }

      let status = ["Want to Read", "Currently Reading", "Read"];
      for (let m = 0; m < 50; m++) {

        insertReadStatus(bookId, user[m].id, status[Math.round(Math.random() * 2 )]);
      }

      users.forEach((user)=> {
        insertBookshelf(bookId, user.id, shelves[Math.round(Math.random() * 500 )])
      })
    }
  }
}

new DummyDataGenerator()
  .createData()
  .then(() => db.close())