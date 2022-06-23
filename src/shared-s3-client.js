var s3 = require('s3-client');

exports.bucket = process.env.IONOS_S3_BUCKET;
exports.accessKeyId = process.env.IONOS_S3_KEY_ID;
exports.secretAccessKey = process.env.IONOS_ACCESS_KEY;
exports.region = process.env.IONOS_S3_REGION;
exports.endpoint = process.env.IONOS_S3_ENDPOINT;

exports.client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: exports.accessKeyId,
    secretAccessKey: exports.secretAccessKey,
    region: exports.region,
    endpoint: exports.endpoint,
    sslEnabled: true,
    maxRedirects: 10,
    s3ForcePathStyle: true,
    logger: console,
  },
});

exports.s3 = exports.client.s3;
