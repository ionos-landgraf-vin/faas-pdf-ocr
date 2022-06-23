const fs = require('fs');

exports.UploadPDFToS3 = async function(job) {
  return await new Promise((resolve, reject) => {
    const localFile = fs.readFileSync(job.vars.finalPDFWithTextLocation);
    job.vars.s3client.s3.putObject({
      Body: localFile, 
      Bucket: job.vars.s3Bucket,
      Key: job.vars.s3Key,
      Metadata: job.vars.metadata,
    }, function(err, data) {
      if (err) {
        console.log("unable to upload:", err);
        return reject(err);
      }

      console.log("done uploading");
      resolve (data);
    });
  });
}
