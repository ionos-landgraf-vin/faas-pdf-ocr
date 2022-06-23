var s3 = require('s3-client');

exports.client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: process.env.IONOS_S3_KEY_ID,
    secretAccessKey: process.env.IONOS_ACCESS_KEY,
    region: process.env.IONOS_S3_REGION,
    endpoint: process.env.IONOS_S3_ENDPOINT,
    sslEnabled: true,
    maxRedirects: 10,
    s3ForcePathStyle: true,
    logger: console,
  },
});

exports.s3 = exports.client.s3;

exports.bucket = process.env.IONOS_S3_BUCKET;
