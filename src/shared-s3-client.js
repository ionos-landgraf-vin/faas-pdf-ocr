const s3 = require('s3-client');

exports.CreateS3Client = async function (job) {
  job = job || {};
  job.vars = job.vars || {}; 
  job.env = job.env || process.env; 

  const client = s3.createClient({
    maxAsyncS3: 20,     // this is the default
    s3RetryCount: 3,    // this is the default
    s3RetryDelay: 1000, // this is the default
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Options: {
      accessKeyId: job.env.IONOS_S3_KEY_ID,
      secretAccessKey: job.env.IONOS_ACCESS_KEY,
      region: job.env.IONOS_S3_REGION,
      endpoint: job.env.IONOS_S3_ENDPOINT,
      sslEnabled: true,
      maxRedirects: 10,
      s3ForcePathStyle: true,
      logger: console,
    },
  });
  job.vars.s3Bucket = job.vars.s3Bucket || job.env.IONOS_S3_BUCKET;


  job.vars.s3Client = {
    client: client,
    s3: client.s3,
    bucket: job.vars.s3Bucket,
  };

  return job.vars.s3Client;
}
