const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCES_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

var s3 = new AWS.S3();

const upload = (filePath, callback) => {
  const file = fs.createReadStream(filePath);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: file,
    Key: 'folder/' + Date.now() + '_' + path.basename(filePath),
  };

  return s3.upload(params, callback);
};

const getFile = (keyFile, callback) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: keyFile,
  };

  s3.getObject(params, callback);
};

module.exports = { upload, getFile };
