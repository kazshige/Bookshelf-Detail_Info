const AWS = require('aws-sdk');
const config = require('./database/config')
const s3 = new AWS.S3({
  region: 'ap-northeast-1',
  accessKeyId: config.accessKeyID,
  secretAccessKey: config.secretAccessKey,
});



const listAllObjectsFromS3Bucket = async (bucket, prefix) => {
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
          Expires: 60*60
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


const getImages = async() => {
  const items = await listAllObjectsFromS3Bucket('hrr37-fec-service-hermes-kaz')
  console.log("=====items", items)

}

getImages()