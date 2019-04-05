require('dotenv').config();
module.exports = {
  accessKeyID: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  s3BucketName: process.env.S3_BUCKET_NAME
};