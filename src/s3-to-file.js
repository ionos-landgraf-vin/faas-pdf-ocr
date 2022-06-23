const path = require("path");
const Ajv = require("ajv");
const os = require("os");
const fs = require("fs");
const schema = require("./s3-event-schema").schema;

const ajv = new Ajv();
const validate = ajv.compile(schema);

exports.DownloadFileFromS3 = async function (job) {
  // parse request
  let requestBody = JSON.parse(job.event);

  // validate that the request is semantically correct
  const valid = validate(requestBody);
  if (!valid) {
    throw validate.errors;
  }

  // FIXME: what if we do get more then one record in the event?
  for (record of requestBody.Records) {
    // setup job variables
    job.vars.s3Bucket = record.s3.bucket.name;
    job.vars.s3Key = record.s3.object.key;
    job.vars.localFilename = path.join(
      os.tmpdir(),
      record.s3.object.eTag + ".pdf",
    );

    // check if the file exists
    await keyExists(job);

    // download the file to localFilename
    await downloadFile(job);
  }
};

async function keyExists(job) {
  return new Promise((resolve, reject) => {
    job.vars.s3Client.s3.headObject(
      {
        Bucket: job.vars.s3Bucket,
        Key: job.vars.s3Key,
      },
      function (err, data) {
        if (err) {
          return reject(err);
        }

        resolve();
      },
    );
  });
}

async function downloadFile(job) {
  console.log(
    "Download ing",
    "s3://" + job.vars.s3Bucket + "/" + job.vars.s3Key,
    "to",
    job.vars.localFilename,
  );
  return new Promise((resolve, reject) => {
    job.vars.s3Client.s3.getObject(
      {
        Bucket: job.vars.s3Bucket,
        Key: job.vars.s3Key,
      },
      function (err, data) {
        if (err) {
          console.log("unable to download:", err);
          reject(err);
          return;
        }

        console.log("done downloading");
        fs.writeFile(job.vars.localFilename, data.Body, (err) => {
          if (err) {
            reject(err);
            return;
          }

          // file written successfully
          resolve();
        });
      },
    );
  });
}
