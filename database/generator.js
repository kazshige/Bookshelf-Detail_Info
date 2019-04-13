/* eslint-disable arrow-parens */
/* eslint-disable class-methods-use-this */
const AWS = require('aws-sdk');
const config = require('./config')
const s3Config = require('./s3')

const db = require('./');
const faker = require('faker');

const s3 = new AWS.S3({
  region: 'ap-northeast-1',
  accessKeyId: s3Config.accessKeyID,
  secretAccessKey: s3Config.secretAccessKey
});

const createDB = () => {
  return db.queryAsync('CREATE DATABASE IF NOT EXISTS books')
    .then(() => {
      console.log('books created')
      return db.queryAsync('use books');
    })
    .then(()=> {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS bookInfo (
          id INT NOT NULL AUTO_INCREMENT,
          title VARCHAR(100) NOT NULL,
          author VARCHAR(100) NOT NULL,
          description TEXT NOT NULL,
          PRIMARY KEY (id)
      );`);
    })
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS image (
          id INT NOT NULL AUTO_INCREMENT,
          bookInfo_id INT,
          image VARCHAR(500) NOT NULL,
          PRIMARY KEY (id)
      );`);
    })
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INT NOT NULL AUTO_INCREMENT,
          email VARCHAR(50) NOT NULL,
          PRIMARY KEY (id),
          bookInfo_id INT
      );`);
    })
    .then(() => {
      return db.queryAsync(`
      CREATE TABLE IF NOT EXISTS ratings (
        id INT NOT NULL AUTO_INCREMENT,
        bookInfo_id INT,
        user_id INT,
        rating TINYINT,
        PRIMARY KEY (id)
      );`)
    })
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS reviews (
          id INT NOT NULL AUTO_INCREMENT,
          bookInfo_id INT,
          review TEXT NOT NULL,
          PRIMARY KEY (id)
      );`)
    })
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS readStatus (
          id INT NOT NULL AUTO_INCREMENT,
          bookInfo_id INT,
          user_id int,
          status TINYINT,
          PRIMARY KEY (id)
      );`)
    })
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS shelf (
          id INT NOT NULL AUTO_INCREMENT,
          name VARCHAR(200),
          user_id INT,
          PRIMARY KEY (id)
      );`)
    })
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS bookShelf (
          id INT NOT NULL AUTO_INCREMENT,
          bookInfo_id INT,
          shelf_id INT,
          PRIMARY KEY (id)
      );`)
    })
    .error((err) => {
      console.log('error creating tables', err)
    });
};

class DummyDataGenerator {
  constructor() {
  }

  async listAllObjectsFromS3Bucket(bucket, prefix) {
    let isTruncated = true;
    let marker;
    const items = []
    while(isTruncated) {
      let params = { Bucket: bucket };
      // any pattern of name of files
      if (prefix) params.Prefix = prefix;
      if (marker) params.Marker = marker;
      try {
        const response = await s3.listObjects(params).promise();
        response.Contents.forEach(item => {
          const url = s3.getSignedUrl('getObject', {
            Bucket: bucket,
            Key: item.Key,
            Expires: 60*60 *24 *60
          })
          items.push(url);
        });
        isTruncated = response.IsTruncated;
        if (isTruncated) {
          marker = response.Contents.slice(-1)[0].Key;
        }

    } catch(error) {
      throw error;
    }
  }
  return items
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
      const bookId = j + 1;

      const images = await this.listAllObjectsFromS3Bucket(s3Config.s3BucketName)

      const randomIndex = Math.round(Math.random())

      await db.insertBookImage(bookId, images[randomIndex]);
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
    try{
      await createDB();
      console.log('db created');
      await this.seedUsers();
      console.log('users')
      await this.seedBookInfo();
      console.log('info')
      await this.seedShelf();
    }catch(e){
      console.log("=====error", e.message)
    }

  }
};

new DummyDataGenerator()
.seedData()
.then(() => {
  console.log('done');
  db.close()
});
