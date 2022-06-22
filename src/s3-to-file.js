const ssc = require("./shared-s3-client"),
      Ajv = require("ajv"),
      schema = require("./s3-event-schema").schema;

const ajv = new Ajv(),
      validate = ajv.compile(schema);

exports.DownloadFileFromS3 = async function(job) {
  // parse request
  let requestBody = JSON.parse(job.event.body);

  // validate that the request is semantically correct
  const valid = validate(requestBody);
  if (!valid) {
    throw validate.errors;
  }

  // FIXME: what if we do get more then one record in the event?
  for (record of requestBody.Records) {
    if (record.s3.bucket.name !== ssc.bucket) {
      throw "invalid bucket";
    }

    ssc.s3.headObject({
      Bucket: ssc.bucket,
      Key: record.s3.object.key,
    }, function(err, data) {
      if (err) {
        throw err; // file doesn't exist
      }
      
      // file does exist
      var downloader = ssc.client.downloadFile({
        // FIXME: do we have to use a random name? Can there be clashes?
        localFile: "/tmp/incoming.txt",
        s3Params: {
          Bucket: ssc.bucket,
          Key: record.s3.object.key,
        },
      });
      downloader.on('error', function(err) {
        console.error("unable to download:", err);
      });
      // downloader.on('progress', function() {
      //   console.log("progress", downloacatder.progressAmount, downloader.progressTotal);
      // });
      downloader.on('end', function() {
        console.log("done downloading");
      });
    });
  }
}
